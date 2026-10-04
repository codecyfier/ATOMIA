import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS, GlossaryTerm } from '../../data/glossary';
import { ALL_ELEMENTS, ChemicalElement } from '../../data/elements';
import { ElementModal } from '../periodic-table/ElementModal';
import {
  Wrench,
  Search,
  BookOpen,
  ArrowRightLeft,
  Calendar,
  Sparkles,
  Layers,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

type ToolTab = 'glossary' | 'converter' | 'comparator' | 'element-of-day';

interface ExtraToolsViewProps {
  onBack?: () => void;
}

export const ExtraToolsView: React.FC<ExtraToolsViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<ToolTab>('element-of-day');

  // Glossary state
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedGlossaryCategory, setSelectedGlossaryCategory] = useState<string>('all');

  // Converter state
  const [convCategory, setConvCategory] = useState<'temp' | 'pressure' | 'volume' | 'energy'>('temp');
  const [convVal, setConvVal] = useState<number>(25);

  // Comparator state
  const [elAId, setElAId] = useState<number>(6); // Carbone
  const [elBId, setElBId] = useState<number>(14); // Silicium
  const [modalElement, setModalElement] = useState<ChemicalElement | null>(null);

  // Element of the day (deterministic calculation based on current date)
  const elementOfTheDay = useMemo(() => {
    const today = new Date();
    const dayOfYear =
      Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
          (1000 * 60 * 60 * 24)
      ) || 1;
    const elementIndex = (dayOfYear % 118);
    return ALL_ELEMENTS[elementIndex] || ALL_ELEMENTS[0];
  }, []);

  const elementA = ALL_ELEMENTS.find((e) => e.number === elAId) || ALL_ELEMENTS[0];
  const elementB = ALL_ELEMENTS.find((e) => e.number === elBId) || ALL_ELEMENTS[13];

  // Filtered glossary
  const filteredGlossary = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const q = glossarySearch.trim().toLowerCase();
      const matchesQ =
        !q ||
        term.term.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q);
      const matchesCat =
        selectedGlossaryCategory === 'all' || term.category === selectedGlossaryCategory;
      return matchesQ && matchesCat;
    });
  }, [glossarySearch, selectedGlossaryCategory]);

  return (
    <div className="flex flex-col space-y-5 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
              <Wrench className="w-5 h-5 text-cyan-400" />
              Outils & Ressources Complémentaires
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Glossaire encyclopédique, convertisseur métrique, comparateur d'atomes et élément du jour.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
        {[
          { id: 'element-of-day', label: '🌟 Élément du Jour' },
          { id: 'comparator', label: '⚖️ Comparateur d\'Éléments' },
          { id: 'glossary', label: '📖 Glossaire Chimique (A-Z)' },
          { id: 'converter', label: '🔄 Convertisseur d\'Unités' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as ToolTab)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition min-h-[44px] cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/25 scale-102'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Element of the Day */}
      {activeTab === 'element-of-day' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/30 shadow-2xl space-y-5 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-mono">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Élément du Jour • {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {elementOfTheDay.categoryLabel}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-slate-950 border-2 border-cyan-500/40 flex flex-col items-center justify-center font-bold shadow-xl shrink-0">
              <span className="text-xs text-slate-400 font-mono">{elementOfTheDay.number}</span>
              <span className="text-4xl font-black text-cyan-300">{elementOfTheDay.symbol}</span>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-black text-white">{elementOfTheDay.name}</h2>
              <p className="text-xs text-slate-400 font-mono">
                Masse atomique : <strong className="text-white">{elementOfTheDay.atomicMass} u</strong> • Période {elementOfTheDay.period}, Groupe {elementOfTheDay.group}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {elementOfTheDay.summary}
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setModalElement(elementOfTheDay)}
              className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/25 active:scale-95 transition min-h-[44px] cursor-pointer"
            >
              Voir la fiche complète & Modèle de Bohr
            </button>
          </div>
        </div>
      )}

      {/* 2. Element Comparator */}
      {activeTab === 'comparator' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Élément A :</label>
              <select
                value={elAId}
                onChange={(e) => setElAId(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-white min-h-[44px]"
              >
                {ALL_ELEMENTS.map((el) => (
                  <option key={el.number} value={el.number}>
                    {el.number}. {el.name} ({el.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Élément B :</label>
              <select
                value={elBId}
                onChange={(e) => setElBId(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-3 py-2.5 text-xs text-white min-h-[44px]"
              >
                {ALL_ELEMENTS.map((el) => (
                  <option key={el.number} value={el.number}>
                    {el.number}. {el.name} ({el.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards Face-to-Face */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30">
              <span className="text-xs font-mono text-cyan-400">Z = {elementA.number}</span>
              <h3 className="text-2xl font-black text-white">{elementA.symbol}</h3>
              <p className="text-xs text-slate-300 font-semibold">{elementA.name}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30">
              <span className="text-xs font-mono text-purple-400">Z = {elementB.number}</span>
              <h3 className="text-2xl font-black text-white">{elementB.symbol}</h3>
              <p className="text-xs text-slate-300 font-semibold">{elementB.name}</p>
            </div>
          </div>

          {/* Properties comparison table */}
          <div className="space-y-3">
            {[
              {
                label: 'Masse Atomique (u)',
                valA: elementA.atomicMass,
                valB: elementB.atomicMass,
              },
              {
                label: 'Électronégativité (Pauling)',
                valA: elementA.electronegativity ?? 'N/D',
                valB: elementB.electronegativity ?? 'N/D',
              },
              {
                label: 'Point de Fusion (°C)',
                valA: elementA.meltingPoint !== null ? `${elementA.meltingPoint} °C` : 'N/D',
                valB: elementB.meltingPoint !== null ? `${elementB.meltingPoint} °C` : 'N/D',
              },
              {
                label: 'Famille Chimique',
                valA: elementA.categoryLabel,
                valB: elementB.categoryLabel,
              },
              {
                label: 'Configuration Électronique',
                valA: elementA.electronConfiguration,
                valB: elementB.electronConfiguration,
              },
            ].map((prop, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs font-mono"
              >
                <span className="text-cyan-300 font-bold w-1/3 text-left">{prop.valA}</span>
                <span className="text-slate-400 font-sans text-center w-1/3 font-semibold">
                  {prop.label}
                </span>
                <span className="text-purple-300 font-bold w-1/3 text-right">{prop.valB}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Glossary */}
      {activeTab === 'glossary' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-4 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Rechercher un terme (ex: VSEPR, Enthalpie, Catalyseur)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 min-h-[44px]"
            />
          </div>

          <div className="space-y-3">
            {filteredGlossary.map((item) => (
              <div
                key={item.term}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">#</span>
                    {item.term}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
                {item.formulaOrSymbol && (
                  <div className="text-xs font-mono text-cyan-300 pt-1">
                    Formule : <strong>{item.formulaOrSymbol}</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Unit Converter */}
      {activeTab === 'converter' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 animate-fade-in">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
            {[
              { id: 'temp', label: 'Température' },
              { id: 'pressure', label: 'Pression' },
              { id: 'volume', label: 'Volume' },
              { id: 'energy', label: 'Énergie' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setConvCategory(c.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer min-h-[36px] ${
                  convCategory === c.id
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs text-slate-400 font-mono block mb-1">
              Valeur source à convertir :
            </label>
            <input
              type="number"
              value={convVal}
              onChange={(e) => setConvVal(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm min-h-[44px]"
            />
          </div>

          {/* Converted values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {convCategory === 'temp' && (
              <>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Celsius (°C)</span>
                  <span className="text-xl font-black text-cyan-300 font-mono">{convVal} °C</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Kelvin (K)</span>
                  <span className="text-xl font-black text-purple-300 font-mono">{(convVal + 273.15).toFixed(2)} K</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Fahrenheit (°F)</span>
                  <span className="text-xl font-black text-teal-300 font-mono">{((convVal * 9) / 5 + 32).toFixed(1)} °F</span>
                </div>
              </>
            )}

            {convCategory === 'pressure' && (
              <>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Atmosphère (atm)</span>
                  <span className="text-xl font-black text-cyan-300 font-mono">{convVal} atm</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Bar (bar)</span>
                  <span className="text-xl font-black text-purple-300 font-mono">{(convVal * 1.01325).toFixed(4)} bar</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Pascal (Pa)</span>
                  <span className="text-lg font-black text-teal-300 font-mono">{(convVal * 101325).toLocaleString()} Pa</span>
                </div>
              </>
            )}

            {convCategory === 'volume' && (
              <>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Litres (L)</span>
                  <span className="text-xl font-black text-cyan-300 font-mono">{convVal} L</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Millilitres (mL)</span>
                  <span className="text-xl font-black text-purple-300 font-mono">{(convVal * 1000).toLocaleString()} mL</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Mètres cubes (m³)</span>
                  <span className="text-xl font-black text-teal-300 font-mono">{(convVal * 0.001).toFixed(4)} m³</span>
                </div>
              </>
            )}

            {convCategory === 'energy' && (
              <>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Joules (J)</span>
                  <span className="text-xl font-black text-cyan-300 font-mono">{convVal} J</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Calories (cal)</span>
                  <span className="text-xl font-black text-purple-300 font-mono">{(convVal / 4.184).toFixed(2)} cal</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Électron-volt (eV)</span>
                  <span className="text-sm font-black text-teal-300 font-mono block truncate">
                    {(convVal * 6.242e18).toExponential(3)} eV
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal for Element of the Day */}
      <ElementModal
        element={modalElement}
        onClose={() => setModalElement(null)}
      />
    </div>
  );
};
