import React, { useState, useEffect } from 'react';
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
  Home,
  X,
  Sparkles,
  Star,
} from 'lucide-react';

interface ModulesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule: string;
  onNavigate: (key: string) => void;
}

interface ModuleItem {
  key: string;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  cat: string;
}

const ALL_MODULES: ModuleItem[] = [
  { key: 'home', title: 'Accueil Atomia', shortDesc: 'Tableau de bord et synthèse', icon: Home, cat: 'Principal' },
  { key: 'periodic-table', title: '1. Tableau Périodique (118)', shortDesc: 'Configurations & propriétés', icon: Grid, cat: 'Fondamentaux' },
  { key: 'atoms-orbitals', title: '2. Atomes & Orbitales 3D', shortDesc: 'Fonctions d\'ondes & spins', icon: Atom, cat: 'Fondamentaux' },
  { key: 'molecules-3d', title: '3. Molécules en 3D (VSEPR)', shortDesc: 'Géométries & moments dipolaires', icon: Box, cat: 'Fondamentaux' },
  { key: 'equation-balancer', title: '4. Équilibreur de Réactions', shortDesc: 'Stœchiométrie & Lavoisier', icon: Equal, cat: 'Pratique & Calculs' },
  { key: 'simulations', title: '5. Simulations Réactionnelles', shortDesc: 'Acide-base, redox & courbes', icon: Activity, cat: 'Pratique & Calculs' },
  { key: 'virtual-lab', title: '6. Laboratoire Virtuel', shortDesc: 'Verrerie & réactifs sécurisés', icon: FlaskConical, cat: 'Pratique & Calculs' },
  { key: 'calculators', title: '7. Calculatrices Chimiques', shortDesc: '7 outils de calcul détaillés', icon: Calculator, cat: 'Pratique & Calculs' },
  { key: 'courses', title: '8. Cours & Fiches Synthèses', shortDesc: '7 chapitres & mnémotechniques', icon: BookOpen, cat: 'Apprentissage' },
  { key: 'quiz', title: '9. Quiz & Progression (XP)', shortDesc: 'Entraînement avec badges', icon: Award, cat: 'Apprentissage' },
  { key: 'tools', title: '10. Outils & Glossaire (A-Z)', shortDesc: 'Dictionnaire & convertisseur', icon: Wrench, cat: 'Ressources' },
];

const DEFAULT_FAVORITES = ['periodic-table', 'equation-balancer', 'calculators'];

export const ModulesDrawer: React.FC<ModulesDrawerProps> = ({
  isOpen,
  onClose,
  currentModule,
  onNavigate,
}) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atomia_favorite_modules');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return DEFAULT_FAVORITES;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atomia_favorite_modules', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  if (!isOpen) return null;

  const toggleFavorite = (e: React.MouseEvent, moduleKey: string) => {
    e.stopPropagation();
    setFavorites((prev) => {
      if (prev.includes(moduleKey)) {
        return prev.filter((k) => k !== moduleKey);
      } else {
        return [...prev, moduleKey];
      }
    });
  };

  // Find favorite modules in order of preference
  const favoriteItems = favorites
    .map((k) => ALL_MODULES.find((m) => m.key === k))
    .filter((m): m is ModuleItem => !!m);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-5 sm:p-6 text-slate-100 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-lg font-black text-white">Tous les Modules d'Atomia</h2>
              <p className="text-[11px] text-slate-400">
                Cliquez sur l'étoile ★ pour épingler vos modules favoris en haut
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pinned Favorites Section */}
        {favoriteItems.length > 0 && (
          <div className="space-y-2 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-900/60 p-3 sm:p-3.5 rounded-2xl border border-amber-500/30 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Modules Épinglés / Favoris ({favoriteItems.length})</span>
              </div>
              <span className="text-[10px] text-slate-400">Accès ultra-rapide</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {favoriteItems.map((m) => {
                const Icon = m.icon;
                const isActive = currentModule === m.key;
                return (
                  <div
                    key={`fav-${m.key}`}
                    onClick={() => {
                      onNavigate(m.key);
                      onClose();
                    }}
                    role="button"
                    tabIndex={0}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition cursor-pointer min-h-[50px] group ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-400/60 text-amber-200 font-bold shadow-md shadow-amber-500/10'
                        : 'bg-slate-900/90 border-amber-500/20 text-slate-200 hover:border-amber-400/50 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'bg-amber-400/15 text-amber-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold block truncate">{m.title}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{m.shortDesc}</span>
                      </div>
                    </div>

                    {/* Unpin button */}
                    <button
                      onClick={(e) => toggleFavorite(e, m.key)}
                      title="Désépingler des favoris"
                      aria-label="Désépingler des favoris"
                      className="p-1.5 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 transition shrink-0 min-h-[32px] min-w-[32px] flex items-center justify-center cursor-pointer"
                    >
                      <Star className="w-4 h-4 fill-amber-400" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Modules List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1 pt-1">
            <span>Tous les modules ({ALL_MODULES.length})</span>
            <span className="text-[11px] text-slate-500">Toucher ★ pour épingler</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ALL_MODULES.map((m) => {
              const Icon = m.icon;
              const isActive = currentModule === m.key;
              const isFav = favorites.includes(m.key);

              return (
                <div
                  key={m.key}
                  onClick={() => {
                    onNavigate(m.key);
                    onClose();
                  }}
                  role="button"
                  tabIndex={0}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition cursor-pointer min-h-[54px] group ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-800/90 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 text-cyan-400 group-hover:scale-105 transition-transform'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs block font-semibold truncate">{m.title}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{m.shortDesc}</span>
                    </div>
                  </div>

                  {/* Pin / Star favorite toggle button */}
                  <button
                    onClick={(e) => toggleFavorite(e, m.key)}
                    title={isFav ? 'Retirer des favoris' : 'Épingler en haut'}
                    aria-label={isFav ? 'Retirer des favoris' : 'Épingler en haut'}
                    className={`p-2 rounded-xl transition shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer ${
                      isFav
                        ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-400/10'
                        : 'text-slate-600 hover:text-amber-400 hover:bg-slate-800'
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 transition ${
                        isFav ? 'fill-amber-400 text-amber-400 scale-110' : 'text-slate-500'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
