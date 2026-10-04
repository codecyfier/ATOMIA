import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Layers, Sparkles, Filter, Grid, List, ArrowLeft } from 'lucide-react';
import { ALL_ELEMENTS, ChemicalElement, CATEGORY_COLORS } from '../../data/elements';
import { ElementModal } from './ElementModal';

type PropertyMode = 'family' | 'electronegativity' | 'mass' | 'radius' | 'melting';

interface PeriodicTableProps {
  onBack?: () => void;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [propertyMode, setPropertyMode] = useState<PropertyMode>('family');
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');
  const [activeElement, setActiveElement] = useState<ChemicalElement | null>(null);

  // Filtered elements
  const filteredElements = useMemo(() => {
    return ALL_ELEMENTS.filter((el) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        el.name.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        el.number.toString() === q ||
        el.electronConfiguration.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === 'all' || el.category === selectedCategory;

      const matchesPhase =
        selectedPhase === 'all' || el.phase === selectedPhase;

      return matchesSearch && matchesCat && matchesPhase;
    });
  }, [search, selectedCategory, selectedPhase]);

  // Compute color based on active property mode
  const getCellColor = (el: ChemicalElement, isSelected: boolean) => {
    if (propertyMode === 'family') {
      const styles = CATEGORY_COLORS[el.category] || CATEGORY_COLORS['unknown'];
      return {
        className: `${styles.bg} ${styles.border} ${styles.text} hover:scale-105 active:scale-95`,
        inlineStyle: {},
      };
    }

    if (propertyMode === 'electronegativity') {
      if (el.electronegativity === null) {
        return {
          className: 'bg-slate-800/60 border-slate-700 text-slate-500',
          inlineStyle: {},
        };
      }
      // Electronegativity ranges from 0.7 (Cs/Fr) to 4.0 (F)
      const ratio = Math.max(0, Math.min(1, (el.electronegativity - 0.7) / (4.0 - 0.7)));
      // Hue from 220 (blue) to 160 (cyan) to 280 (purple)
      const r = Math.round(14 + ratio * 6);
      const g = Math.round(182 - ratio * 40);
      const b = Math.round(212 + ratio * 35);
      return {
        className: 'hover:scale-105 active:scale-95 text-white',
        inlineStyle: {
          backgroundColor: `rgba(${r}, ${g}, ${b}, ${0.15 + ratio * 0.45})`,
          borderColor: `rgba(${r}, ${g}, ${b}, 0.6)`,
        },
      };
    }

    if (propertyMode === 'mass') {
      const ratio = Math.min(1, el.atomicMass / 294);
      return {
        className: 'hover:scale-105 active:scale-95 text-white',
        inlineStyle: {
          backgroundColor: `rgba(139, 92, 246, ${0.15 + ratio * 0.5})`,
          borderColor: `rgba(168, 85, 247, 0.6)`,
        },
      };
    }

    if (propertyMode === 'melting') {
      if (el.meltingPoint === null) {
        return {
          className: 'bg-slate-800/60 border-slate-700 text-slate-500',
          inlineStyle: {},
        };
      }
      // Range -272 to 3500°C
      const ratio = Math.max(0, Math.min(1, (el.meltingPoint + 273) / 3800));
      return {
        className: 'hover:scale-105 active:scale-95 text-white',
        inlineStyle: {
          backgroundColor: `rgba(239, 68, 68, ${0.12 + ratio * 0.55})`,
          borderColor: `rgba(248, 113, 113, 0.6)`,
        },
      };
    }

    // Default fallback
    return {
      className: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
      inlineStyle: {},
    };
  };

  // Helper for grid positioning
  const getGridPosition = (el: ChemicalElement): { col: number; row: number } => {
    // Lanthanides row 8
    if (el.number >= 57 && el.number <= 71) {
      return { row: 8, col: el.number - 57 + 3 };
    }
    // Actinides row 9
    if (el.number >= 89 && el.number <= 103) {
      return { row: 9, col: el.number - 89 + 3 };
    }
    return { row: el.period, col: el.group };
  };

  const categories = [
    { id: 'all', label: 'Tous (118)' },
    { id: 'alkali-metal', label: 'Métaux alcalins' },
    { id: 'alkaline-earth', label: 'Alcalino-terreux' },
    { id: 'transition-metal', label: 'Métaux de transition' },
    { id: 'post-transition-metal', label: 'Métaux pauvres' },
    { id: 'metalloid', label: 'Métalloïdes' },
    { id: 'reactive-nonmetal', label: 'Non-métaux' },
    { id: 'halogen', label: 'Halogènes' },
    { id: 'noble-gas', label: 'Gaz nobles' },
    { id: 'lanthanide', label: 'Lanthanides' },
    { id: 'actinide', label: 'Actinides' },
  ];

  return (
    <div className="flex flex-col space-y-4 max-w-7xl mx-auto pb-12">
      {/* Top Controls Header */}
      <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Tableau Périodique des Éléments
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                118 éléments avec configurations électroniques, propriétés physico-chimiques et modèle de Bohr.
              </p>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition min-h-[36px] cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grille (18 col)</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition min-h-[36px] cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Cartes & Liste</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Property Mode */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Search input */}
          <div className="relative md:col-span-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, symbole, Z (ex: Fe, Fer, 26)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition min-h-[44px]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Effacer
              </button>
            )}
          </div>

          {/* Property Heatmap Selector */}
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400 shrink-0" />
            <select
              value={propertyMode}
              onChange={(e) => setPropertyMode(e.target.value as PropertyMode)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-medium min-h-[44px]"
            >
              <option value="family">Coloration : Famille chimique</option>
              <option value="electronegativity">Coloration : Électronégativité (Pauling)</option>
              <option value="mass">Coloration : Masse atomique</option>
              <option value="melting">Coloration : Point de fusion</option>
            </select>
          </div>
        </div>

        {/* Filter categories tabs (horizontal swipeable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition min-h-[36px] cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/25'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid View */}
      {viewMode === 'grid' ? (
        <div className="relative bg-slate-900/60 backdrop-blur-md p-3 sm:p-5 rounded-3xl border border-slate-800 shadow-xl overflow-x-auto touch-pan-x">
          <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between mb-3 px-1">
            <span>Faites glisser horizontalement sur mobile • Touchez un élément pour voir sa fiche détaillée</span>
            <span className="font-semibold text-cyan-400">{filteredElements.length} éléments visibles</span>
          </div>

          <div
            className="grid gap-1.5 min-w-[980px] p-1"
            style={{
              gridTemplateColumns: 'repeat(18, minmax(48px, 1fr))',
              gridTemplateRows: 'repeat(9, minmax(56px, auto))',
            }}
          >
            {ALL_ELEMENTS.map((el) => {
              const pos = getGridPosition(el);
              const isFiltered = filteredElements.some((fe) => fe.number === el.number);
              const colorInfo = getCellColor(el, activeElement?.number === el.number);

              return (
                <button
                  key={el.number}
                  onClick={() => setActiveElement(el)}
                  style={{
                    gridColumn: pos.col,
                    gridRow: pos.row,
                    ...colorInfo.inlineStyle,
                  }}
                  className={`relative flex flex-col items-center justify-center p-1 rounded-xl border transition duration-200 select-none cursor-pointer min-h-[54px] ${
                    colorInfo.className
                  } ${
                    isFiltered
                      ? 'opacity-100 ring-0'
                      : 'opacity-20 scale-95 pointer-events-none'
                  }`}
                  title={`${el.name} (Z=${el.number})`}
                >
                  <span className="absolute top-1 left-1.5 text-[9px] font-mono text-slate-300 leading-none">
                    {el.number}
                  </span>
                  <span className="text-sm font-black tracking-tight leading-none mt-1">
                    {el.symbol}
                  </span>
                  <span className="text-[8px] font-medium truncate max-w-full text-center px-0.5 leading-tight mt-0.5 opacity-90">
                    {el.name}
                  </span>
                  <span className="text-[7.5px] font-mono opacity-70 leading-none">
                    {propertyMode === 'electronegativity' && el.electronegativity
                      ? `χ ${el.electronegativity}`
                      : propertyMode === 'melting' && el.meltingPoint !== null
                      ? `${el.meltingPoint}°`
                      : Math.round(el.atomicMass * 10) / 10}
                  </span>
                </button>
              );
            })}

            {/* Lanthanides & Actinides row labels */}
            <div
              className="text-[10px] font-bold text-pink-400 flex items-center justify-end pr-2 font-mono"
              style={{ gridColumn: '1 / span 2', gridRow: 8 }}
            >
              57-71 La*
            </div>
            <div
              className="text-[10px] font-bold text-fuchsia-400 flex items-center justify-end pr-2 font-mono"
              style={{ gridColumn: '1 / span 2', gridRow: 9 }}
            >
              89-103 Ac**
            </div>
          </div>
        </div>
      ) : (
        /* Cards / List View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredElements.map((el) => {
            const styles = CATEGORY_COLORS[el.category] || CATEGORY_COLORS['unknown'];
            return (
              <div
                key={el.number}
                onClick={() => setActiveElement(el)}
                className={`p-3.5 rounded-2xl border ${styles.bg} ${styles.border} hover:scale-102 active:scale-95 transition cursor-pointer flex flex-col justify-between`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">{el.number}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${styles.badge}`}>
                    {el.phase}
                  </span>
                </div>

                <div className="my-2">
                  <span className={`text-2xl font-black ${styles.text}`}>{el.symbol}</span>
                  <h4 className="text-sm font-bold text-white truncate">{el.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">{el.atomicMass} u</p>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>P.{el.period} G.{el.group}</span>
                  <span className="text-cyan-300 font-mono">
                    {el.electronegativity ? `χ ${el.electronegativity}` : 'χ N/D'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Details */}
      <ElementModal
        element={activeElement}
        onClose={() => setActiveElement(null)}
      />
    </div>
  );
};
