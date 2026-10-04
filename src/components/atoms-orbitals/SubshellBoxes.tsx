import React, { useState } from 'react';
import { ALL_ELEMENTS, ChemicalElement } from '../../data/elements';
import { ArrowUp, ArrowDown, ChevronRight, HelpCircle } from 'lucide-react';

interface Subshell {
  label: string; // '1s', '2s', '2p', etc.
  capacity: number;
  boxesCount: number;
}

const SUBSHELLS_ORDER: Subshell[] = [
  { label: '1s', capacity: 2, boxesCount: 1 },
  { label: '2s', capacity: 2, boxesCount: 1 },
  { label: '2p', capacity: 6, boxesCount: 3 },
  { label: '3s', capacity: 2, boxesCount: 1 },
  { label: '3p', capacity: 6, boxesCount: 3 },
  { label: '4s', capacity: 2, boxesCount: 1 },
  { label: '3d', capacity: 10, boxesCount: 5 },
  { label: '4p', capacity: 6, boxesCount: 3 },
];

export const SubshellBoxes: React.FC = () => {
  const [atomicNumber, setAtomicNumber] = useState<number>(6); // Default: Carbone (Z=6)

  const currentElement = ALL_ELEMENTS.find((e) => e.number === atomicNumber) || ALL_ELEMENTS[0];

  // Distribute atomicNumber electrons across subshells using Klechkowski & Hund's rule
  const calculateBoxes = () => {
    let remaining = atomicNumber;

    return SUBSHELLS_ORDER.map((subshell) => {
      const electronsInSubshell = Math.min(remaining, subshell.capacity);
      remaining -= electronsInSubshell;

      // Fill boxes according to Hund's rule: 1 electron each with spin up first!
      const boxes: { up: boolean; down: boolean }[] = Array.from(
        { length: subshell.boxesCount },
        () => ({ up: false, down: false })
      );

      // Phase 1: Spin up across all boxes
      for (let i = 0; i < subshell.boxesCount && i < electronsInSubshell; i++) {
        boxes[i].up = true;
      }

      // Phase 2: Spin down for remaining paired electrons
      if (electronsInSubshell > subshell.boxesCount) {
        const paired = electronsInSubshell - subshell.boxesCount;
        for (let i = 0; i < paired; i++) {
          boxes[i].down = true;
        }
      }

      return {
        ...subshell,
        electronsCount: electronsInSubshell,
        boxes,
      };
    }).filter((s) => s.electronsCount > 0);
  };

  const subshellsFilled = calculateBoxes();

  return (
    <div className="flex flex-col space-y-5">
      {/* Element Selector / Slider */}
      <div className="bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-mono font-black flex items-center justify-center text-sm border border-cyan-500/30">
                {currentElement.symbol}
              </span>
              <span>{currentElement.name} (Z = {currentElement.number})</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Configuration : <strong className="text-cyan-300">{currentElement.electronConfiguration}</strong>
            </p>
          </div>

          {/* Quick Select common elements */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[1, 6, 7, 8, 11, 17, 26, 29].map((z) => (
              <button
                key={z}
                onClick={() => setAtomicNumber(z)}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition min-h-[36px] cursor-pointer ${
                  atomicNumber === z
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {ALL_ELEMENTS[z - 1]?.symbol} ({z})
              </button>
            ))}
          </div>
        </div>

        {/* Stepper Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Hydrogène (Z = 1)</span>
            <span className="text-cyan-400 font-bold">Z = {atomicNumber} ({atomicNumber} électrons)</span>
            <span>Krypton (Z = 36)</span>
          </div>
          <input
            type="range"
            min={1}
            max={36}
            value={atomicNumber}
            onChange={(e) => setAtomicNumber(Number(e.target.value))}
            className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      </div>

      {/* Quantum Boxes Display (Cases quantiques) */}
      <div className="bg-slate-900/60 p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Cases Quantiques & Règle de Hund
          </h4>
          <span className="text-xs text-slate-400 font-mono">
            Principe de Pauli : max 2 e⁻ par case
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          {subshellsFilled.map((sub, idx) => (
            <div
              key={sub.label}
              className="flex flex-col items-center bg-slate-950/70 p-3 rounded-2xl border border-slate-800 shadow-inner"
            >
              {/* Subshell Label */}
              <div className="flex items-center gap-1 mb-2">
                <span className="font-bold text-sm text-cyan-300 font-mono">{sub.label}</span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded-md">
                  {sub.electronsCount} e⁻
                </span>
              </div>

              {/* Quantum Boxes Container */}
              <div className="flex items-center gap-1.5">
                {sub.boxes.map((box, bIdx) => (
                  <div
                    key={bIdx}
                    className="w-10 h-12 rounded-xl border border-slate-700 bg-slate-900 flex items-center justify-center gap-0.5 shadow-sm relative"
                  >
                    {/* Spin Up Arrow */}
                    {box.up && (
                      <span className="text-cyan-400 font-bold text-lg leading-none" title="Spin up (+1/2)">
                        ↑
                      </span>
                    )}

                    {/* Spin Down Arrow */}
                    {box.down && (
                      <span className="text-purple-400 font-bold text-lg leading-none" title="Spin down (-1/2)">
                        ↓
                      </span>
                    )}

                    {!box.up && !box.down && (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700/60" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rules Explanatory Box */}
      <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-900/30 text-xs text-slate-300 space-y-1.5">
        <h5 className="font-bold text-cyan-300 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          Règles quantiques fondamentales appliquées :
        </h5>
        <ul className="list-disc list-inside space-y-1 text-slate-400">
          <li><strong>Règle de Klechkowski :</strong> Remplissage selon l'ordre croissant de (n + l) : 1s → 2s → 2p → 3s → 3p → 4s → 3d...</li>
          <li><strong>Principe de Pauli :</strong> Deux électrons dans une même case ont obligatoirement des spins opposés (↑ et ↓).</li>
          <li><strong>Règle de Hund :</strong> Pour une sous-couche (ex: 2p), les électrons occupent un maximum de cases avec des spins parallèles (↑) avant de s'apparier.</li>
        </ul>
      </div>
    </div>
  );
};
