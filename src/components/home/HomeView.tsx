import React from 'react';
import { Logo } from '../common/Logo';
import { PWAInstallButton } from '../common/PWAInstallButton';
import {
  Grid,
  Atom,
  Box,
  Equal,
  Activity,
  FlaskConical,
  Calculator,
  BookOpen,
  Award,
  Wrench,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (moduleKey: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const modules = [
    {
      key: 'periodic-table',
      title: 'Tableau Périodique',
      desc: '118 éléments avec Bohr animé, électronégativité, configurations et fiches.',
      icon: Grid,
      badge: '118 Éléments',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      key: 'atoms-orbitals',
      title: 'Atomes & Orbitales',
      desc: 'Orbitales s, p, d en 3D (Three.js), règles de Klechkowski, isotopes et ions.',
      icon: Atom,
      badge: '3D Quantique',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      key: 'molecules-3d',
      title: 'Molécules en 3D',
      desc: 'Eau, glucose, caféine, ADN : modes boules-bâtons, VSEPR et dipôles.',
      icon: Box,
      badge: '3D Rotatif',
      color: 'from-indigo-500 to-purple-600',
    },
    {
      key: 'equation-balancer',
      title: 'Équilibreur de Réactions',
      desc: 'Équilibrage automatique pas à pas et bilan de masse de Lavoisier.',
      icon: Equal,
      badge: 'Algébrique',
      color: 'from-purple-500 to-pink-600',
    },
    {
      key: 'simulations',
      title: 'Simulations Réactionnelles',
      desc: 'Titrage acide-base, combustion, précipitation et redox macro/micro.',
      icon: Activity,
      badge: 'Animations',
      color: 'from-pink-500 to-rose-600',
    },
    {
      key: 'virtual-lab',
      title: 'Laboratoire Virtuel',
      desc: 'Béchers, éprouvettes et réactifs réels avec sécurité et consignes EPI.',
      icon: FlaskConical,
      badge: 'Interactif',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      key: 'calculators',
      title: 'Calculatrices Chimiques',
      desc: 'Masse molaire, moles, concentrations, dilutions, pH et gaz parfaits.',
      icon: Calculator,
      badge: '7 Outils',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      key: 'courses',
      title: 'Cours & Fiches Synthèses',
      desc: '7 chapitres complets avec formules fondamentales et mnémotechniques.',
      icon: BookOpen,
      badge: 'Pédagogie',
      color: 'from-amber-500 to-orange-600',
    },
    {
      key: 'quiz',
      title: 'Quiz & Progression',
      desc: 'Niveaux secondaire et supérieur, exercices corrigés, XP et trophées.',
      icon: Award,
      badge: 'Gamifié',
      color: 'from-rose-500 to-red-600',
    },
    {
      key: 'tools',
      title: 'Outils & Glossaire',
      desc: 'Glossaire A à Z, convertisseur d\'unités, comparateur et élément du jour.',
      icon: Wrench,
      badge: 'Ressources',
      color: 'from-slate-600 to-slate-800',
    },
  ];

  return (
    <div className="flex flex-col space-y-8 max-w-6xl mx-auto pb-16">
      {/* Hero Presentation */}
      <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl overflow-hidden flex flex-col items-center text-center">
        {/* Glow backdrop circles */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Logo with animation */}
        <div className="relative z-10 flex flex-col items-center">
          <Logo size="lg" animated={true} variant="full" showSubtext={true} />

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            La plateforme d'apprentissage de la chimie de référence. Conçue pour les élèves,
            étudiants et enseignants, entièrement en français et 100% utilisable hors ligne.
          </p>

          {/* Quick CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => onNavigate('periodic-table')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition flex items-center gap-2 cursor-pointer min-h-[48px]"
            >
              <span>Explorer le Tableau Périodique</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('molecules-3d')}
              className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 active:scale-95 transition flex items-center gap-2 cursor-pointer min-h-[48px]"
            >
              <span>Molécules 3D</span>
            </button>

            <PWAInstallButton />
          </div>
        </div>

        {/* Key Features Banner Pills */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80 w-full max-w-3xl text-left">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-300">100% Hors-ligne</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-300">118 Éléments Réels</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <Box className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-300">Three.js Intégré</span>
          </div>
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/60">
            <Flame className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-300">Pédagogie & Quiz</span>
          </div>
        </div>
      </div>

      {/* Grid of All Modules */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Tous les Modules d'Atomia
          </h2>
          <span className="text-xs font-mono text-slate-400">10 modules disponibles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.key}
                onClick={() => onNavigate(mod.key)}
                className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-850 active:scale-98 transition flex flex-col justify-between cursor-pointer group shadow-lg min-h-[160px]"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${mod.color} flex items-center justify-center text-white shadow-md shadow-cyan-500/15 group-hover:scale-105 transition`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {mod.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                  <span>Accéder au module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
