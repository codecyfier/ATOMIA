import React, { useState } from 'react';
import { ALL_ELEMENTS } from '../../data/elements';
import { Plus, Minus, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

export const IsotopesIonsExplorer: React.FC = () => {
  const [protons, setProtons] = useState<number>(6); // Carbon
  const [neutrons, setNeutrons] = useState<number>(6); // C-12
  const [electrons, setElectrons] = useState<number>(6); // Neutral

  const currentElement = ALL_ELEMENTS.find((e) => e.number === protons) || ALL_ELEMENTS[0];
  const massNumber = protons + neutrons;
  const charge = protons - electrons;

  // Stability heuristic for light/medium nuclei (N/Z ratio)
  const getStability = () => {
    if (protons === 1) {
      if (neutrons === 0) return { label: 'Stable (Protium)', isStable: true };
      if (neutrons === 1) return { label: 'Stable (Deutérium)', isStable: true };
      if (neutrons === 2) return { label: 'Radioactif β⁻ (Tritium)', isStable: false };
      return { label: 'Instable (durée de vie infime)', isStable: false };
    }

    if (protons === 6) {
      if (neutrons === 6) return { label: 'Stable (98.9% d\'abondance)', isStable: true };
      if (neutrons === 7) return { label: 'Stable (1.1% d\'abondance)', isStable: true };
      if (neutrons === 8) return { label: 'Radioactif β⁻ (Carbone 14 - T½ = 5730 ans)', isStable: false };
      return { label: 'Instable', isStable: false };
    }

    const ratio = neutrons / protons;
    if (ratio >= 0.95 && ratio <= 1.25) {
      return { label: 'Isotope généralement stable', isStable: true };
    } else if (ratio < 0.95) {
      return { label: 'Radioactif (déficit de neutrons : émission β⁺ ou capture électronique)', isStable: false };
    } else {
      return { label: 'Radioactif (excès de neutrons : émission β⁻)', isStable: false };
    }
  };

  const stability = getStability();

  const resetToNeutral = () => {
    setElectrons(protons);
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Central Visual Isotope Symbol Card */}
      <div className="bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center text-center shadow-xl">
        <div className="flex items-center justify-center font-mono select-none">
          {/* Left superscript (A) and subscript (Z) */}
          <div className="flex flex-col items-end pr-1 text-right">
            <span className="text-xl sm:text-2xl font-black text-purple-400 leading-tight" title="Nombre de masse A">
              {massNumber}
            </span>
            <span className="text-xl sm:text-2xl font-black text-cyan-400 leading-tight" title="Numéro atomique Z">
              {protons}
            </span>
          </div>

          {/* Large Symbol */}
          <span className="text-6xl sm:text-7xl font-black text-white px-2">
            {currentElement.symbol}
          </span>

          {/* Right superscript (Charge) */}
          <div className="flex flex-col justify-start pl-1 text-left min-w-[32px]">
            {charge !== 0 && (
              <span
                className={`text-xl sm:text-2xl font-black leading-tight ${
                  charge > 0 ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                {Math.abs(charge) > 1 ? Math.abs(charge) : ''}
                {charge > 0 ? '+' : '−'}
              </span>
            )}
          </div>
        </div>

        {/* Name and State text */}
        <div className="mt-3">
          <h3 className="text-lg font-bold text-white">{currentElement.name}</h3>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                charge === 0
                  ? 'bg-slate-800 text-slate-300'
                  : charge > 0
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {charge === 0 ? 'Atome neutre' : charge > 0 ? `Cation (+${charge})` : `Anion (${charge})`}
            </span>

            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 ${
                stability.isStable
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {stability.isStable ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5" />
              )}
              {stability.label}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Protons Control */}
        <div className="bg-slate-900/70 p-4 rounded-3xl border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Protons (p⁺)
              </span>
              <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded-md">
                Z = {protons}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Définit l'élément chimique et la charge du noyau.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4">
            <button
              onClick={() => setProtons(Math.max(1, protons - 1))}
              className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold flex items-center justify-center transition cursor-pointer min-h-[48px]"
              aria-label="Diminuer protons"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-2xl font-black text-white font-mono">{protons}</span>
            <button
              onClick={() => setProtons(Math.min(30, protons + 1))}
              className="w-12 h-12 rounded-2xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold flex items-center justify-center transition cursor-pointer min-h-[48px]"
              aria-label="Augmenter protons"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Neutrons Control */}
        <div className="bg-slate-900/70 p-4 rounded-3xl border border-purple-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Neutrons (n⁰)
              </span>
              <span className="text-xs font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded-md">
                N = {neutrons}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Modifie l'isotope et la masse atomique A = Z + N.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4">
            <button
              onClick={() => setNeutrons(Math.max(0, neutrons - 1))}
              className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold flex items-center justify-center transition cursor-pointer min-h-[48px]"
              aria-label="Diminuer neutrons"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-2xl font-black text-white font-mono">{neutrons}</span>
            <button
              onClick={() => setNeutrons(neutrons + 1)}
              className="w-12 h-12 rounded-2xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white font-bold flex items-center justify-center transition cursor-pointer min-h-[48px]"
              aria-label="Augmenter neutrons"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Electrons Control */}
        <div className="bg-slate-900/70 p-4 rounded-3xl border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Électrons (e⁻)
              </span>
              <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-md">
                e⁻ = {electrons}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Modifie l'ionisation et la charge globale q = Z - e.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4">
            <button
              onClick={() => setElectrons(Math.max(0, electrons - 1))}
              className="w-12 h-12 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-bold flex items-center justify-center transition cursor-pointer min-h-[48px]"
              aria-label="Diminuer électrons"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-2xl font-black text-white font-mono">{electrons}</span>
            <button
              onClick={() => setElectrons(electrons + 1)}
              className="w-12 h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold flex items-center justify-center transition cursor-pointer min-h-[48px]"
              aria-label="Augmenter électrons"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Neutralize action */}
      {charge !== 0 && (
        <div className="flex justify-center">
          <button
            onClick={resetToNeutral}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition min-h-[40px] cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Rétablir l'atome neutre ({protons} électrons)</span>
          </button>
        </div>
      )}
    </div>
  );
};
