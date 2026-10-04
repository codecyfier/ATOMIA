import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../../data/quizQuestions';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  ArrowLeft,
} from 'lucide-react';

interface UserProgress {
  xp: number;
  streak: number;
  lastDate: string;
  quizzesCompleted: number;
  correctAnswers: number;
  totalAnswers: number;
  unlockedBadges: string[];
}

const BADGES = [
  { id: 'first_quiz', name: 'Apprenti Chimiste', desc: 'Compléter votre tout premier quiz', icon: '🧪' },
  { id: 'perfect_score', name: 'Sans Faute', desc: 'Obtenir 100% de bonnes réponses sur un quiz', icon: '🎯' },
  { id: 'streak_3', name: 'Flamme Assidue', desc: 'Maintenir une série de révision de 3 jours', icon: '🔥' },
  { id: 'master_level', name: 'Maître d\'Atomia', desc: 'Accumuler plus de 500 XP de chimie', icon: '👑' },
];

interface QuizViewProps {
  onBack?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onBack }) => {
  const [levelFilter, setLevelFilter] = useState<'Tous' | 'Secondaire' | 'Supérieur'>('Tous');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // User persistent progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('atomia_user_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      xp: 40,
      streak: 1,
      lastDate: new Date().toISOString().split('T')[0],
      quizzesCompleted: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      unlockedBadges: ['first_quiz'],
    };
  });

  const saveProgress = (newProg: UserProgress) => {
    setProgress(newProg);
    try {
      localStorage.setItem('atomia_user_progress', JSON.stringify(newProg));
    } catch (e) {}
  };

  const filteredQuestions = QUIZ_QUESTIONS.filter(
    (q) => levelFilter === 'Tous' || q.level === levelFilter
  );

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
    }

    // Update global progress stats
    const today = new Date().toISOString().split('T')[0];
    let newStreak = progress.streak;
    if (progress.lastDate !== today) {
      newStreak += 1;
    }

    const addedXp = isCorrect ? 25 : 5;
    const newXp = progress.xp + addedXp;

    const newUnlocked = [...progress.unlockedBadges];
    if (!newUnlocked.includes('first_quiz')) newUnlocked.push('first_quiz');
    if (newXp >= 500 && !newUnlocked.includes('master_level')) newUnlocked.push('master_level');
    if (newStreak >= 3 && !newUnlocked.includes('streak_3')) newUnlocked.push('streak_3');

    saveProgress({
      ...progress,
      xp: newXp,
      streak: newStreak,
      lastDate: today,
      correctAnswers: progress.correctAnswers + (isCorrect ? 1 : 0),
      totalAnswers: progress.totalAnswers + 1,
      unlockedBadges: newUnlocked,
    });
  };

  const handleNext = () => {
    if (currentIndex + 1 < filteredQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      // Perfect score badge check
      if (score + (selectedOption === currentQ.correctIndex ? 1 : 0) === filteredQuestions.length) {
        if (!progress.unlockedBadges.includes('perfect_score')) {
          saveProgress({
            ...progress,
            unlockedBadges: [...progress.unlockedBadges, 'perfect_score'],
          });
        }
      }
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch (e) {}
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col space-y-5 max-w-3xl mx-auto pb-12">
      {/* Top Gamification Bar: Level, XP & Daily Streak */}
      <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center justify-center p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition min-h-[44px] min-w-[44px] cursor-pointer shrink-0"
              aria-label="Retour à l'accueil"
              title="Retour à l'accueil"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
          )}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-cyan-500/20 shrink-0">
            Niv.{Math.floor(progress.xp / 100) + 1}
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              {progress.xp} XP
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              {progress.correctAnswers} / {progress.totalAnswers} réponses exactes
            </span>
          </div>
        </div>

        {/* Daily streak */}
        <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-2xl text-amber-300 text-xs font-bold font-mono">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Série : {progress.streak} j</span>
        </div>
      </div>

      {/* Main Quiz Flow */}
      {!isFinished ? (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 shadow-2xl">
          {/* Level Switcher & Progress bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
              {(['Tous', 'Secondaire', 'Supérieur'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setLevelFilter(lvl);
                    restartQuiz();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer min-h-[36px] ${
                    levelFilter === lvl
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <span className="text-xs font-mono text-slate-400">
              Question {currentIndex + 1} / {filteredQuestions.length}
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 font-mono block mb-1">
              Catégorie : {currentQ.category} • {currentQ.level}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* 4 Options Buttons */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-850';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between cursor-pointer min-h-[52px] ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && (
                    <span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box on Answer */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-900/40 space-y-1.5 animate-fade-in text-xs text-slate-300">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5 font-mono">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                Explication pédagogique :
              </span>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-cyan-500/25 active:scale-95 transition min-h-[44px] cursor-pointer"
              >
                <span>
                  {currentIndex + 1 < filteredQuestions.length ? 'Question suivante' : 'Voir les résultats'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Screen */
        <div className="bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-800 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 mx-auto flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30">
            🏆
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">Quiz Terminé !</h2>
            <p className="text-sm text-slate-400 mt-1">
              Votre score : <strong className="text-cyan-400 text-lg font-mono">{score}</strong> sur {filteredQuestions.length} ({Math.round((score / filteredQuestions.length) * 100)}%)
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={restartQuiz}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-cyan-500/25 active:scale-95 transition min-h-[44px] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Recommencer le quiz</span>
            </button>
          </div>
        </div>
      )}

      {/* Badges / Trophies Showcase */}
      <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-purple-400" />
          Badges & Trophées Débloquables
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES.map((b) => {
            const isUnlocked = progress.unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-between min-h-[110px] ${
                  isUnlocked
                    ? 'bg-slate-950 border-purple-500/40 text-white shadow-md'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                }`}
              >
                <span className="text-2xl mb-1">{b.icon}</span>
                <h4 className="text-xs font-bold truncate max-w-full">{b.name}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-tight">{b.desc}</p>
                <span className="text-[9px] font-mono mt-1 text-cyan-400 font-bold">
                  {isUnlocked ? '✓ Débloqué' : 'Verrouillé'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
