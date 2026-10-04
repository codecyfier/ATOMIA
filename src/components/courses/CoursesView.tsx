import React, { useState } from 'react';
import { COURSES_DATA, CourseChapter } from '../../data/courses';
import { BookOpen, Clock, ChevronRight, Sparkles, Lightbulb, Bookmark, ArrowLeft, Share2 } from 'lucide-react';

interface CoursesViewProps {
  onBack?: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onBack }) => {
  const [selectedChapter, setSelectedChapter] = useState<CourseChapter | null>(null);

  const handleShare = (chapter: CourseChapter) => {
    if (navigator.share) {
      navigator.share({
        title: `${chapter.title} - Atomia Cours`,
        text: `Fiche de révision Atomia : ${chapter.title} (${chapter.subtitle})`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert('Fiche prête pour la révision !');
    }
  };

  return (
    <div className="flex flex-col space-y-5 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {(onBack || selectedChapter) && (
            <button
              onClick={() => {
                if (selectedChapter) {
                  setSelectedChapter(null);
                } else if (onBack) {
                  onBack();
                }
              }}
              className="flex items-center justify-center p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition min-h-[44px] min-w-[44px] cursor-pointer shrink-0"
              aria-label="Retour"
              title={selectedChapter ? "Retour à la liste des cours" : "Retour à l'accueil"}
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Cours & Fiches de Révision
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Résumés synthétiques, moyens mnémotechniques et formules clés de chimie générale et organique.
            </p>
          </div>
        </div>

        {selectedChapter && (
          <button
            onClick={() => setSelectedChapter(null)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold cursor-pointer transition min-h-[40px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Tous les chapitres</span>
          </button>
        )}
      </div>

      {!selectedChapter ? (
        /* Chapter Cards List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COURSES_DATA.map((ch) => (
            <div
              key={ch.id}
              onClick={() => setSelectedChapter(ch)}
              className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 active:scale-98 transition flex flex-col justify-between cursor-pointer shadow-lg group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center border border-cyan-500/30">
                    0{ch.number}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {ch.readTimeMinutes} min
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {ch.level}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {ch.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>{ch.sections.length} sections détaillées</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Full Chapter View */
        <div className="space-y-6 animate-fade-in">
          {/* Chapter Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 shadow-xl flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Chapitre 0{selectedChapter.number} • {selectedChapter.level}
              </span>
              <h2 className="text-2xl font-black text-white mt-1">{selectedChapter.title}</h2>
              <p className="text-sm text-slate-300 mt-1">{selectedChapter.subtitle}</p>
            </div>

            <button
              onClick={() => handleShare(selectedChapter)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
              title="Partager cette fiche"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Sections List */}
          <div className="space-y-5">
            {selectedChapter.sections.map((section) => (
              <div
                key={section.id}
                className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4 shadow-md"
              >
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {section.title}
                </h3>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs font-medium text-cyan-200/90 leading-relaxed">
                  <strong>Résumé express :</strong> {section.summary}
                </div>

                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  {section.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Key Formulas */}
                {section.keyFormulas && section.keyFormulas.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block font-mono">
                      Formules fondamentales à retenir :
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.keyFormulas.map((f, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-2xl bg-purple-950/20 border border-purple-900/40 space-y-1"
                        >
                          <span className="text-[11px] text-slate-400 font-mono block">{f.label}</span>
                          <span className="text-base font-black text-cyan-300 font-mono block">{f.formula}</span>
                          <span className="text-[10px] text-purple-300/80 block">{f.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mnemonics */}
                {section.mnemonics && section.mnemonics.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/30 text-xs text-amber-200/90 space-y-1">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5 font-mono">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      Moyen mnémotechnique :
                    </span>
                    {section.mnemonics.map((m, i) => (
                      <p key={i} className="pl-5 italic font-sans">{m}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
