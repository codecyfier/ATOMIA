import React, { useState } from 'react';
import { parseFormula, computeMolarMass } from '../equation-balancer/balancerAlgorithm';
import { ALL_ELEMENTS } from '../../data/elements';
import { Calculator, ArrowRight, Sparkles, Scale, RefreshCw, Layers, ArrowLeft } from 'lucide-react';

type CalcType = 'molar-mass' | 'moles-mass' | 'concentration' | 'dilution' | 'ph' | 'gas' | 'stoechio';

interface CalculatorsViewProps {
  onBack?: () => void;
}

export const CalculatorsView: React.FC<CalculatorsViewProps> = ({ onBack }) => {
  const [activeCalc, setActiveCalc] = useState<CalcType>('molar-mass');

  // Molar Mass state
  const [formulaInput, setFormulaInput] = useState('C6H12O6');

  // Moles & Mass state
  const [moleMode, setMoleMode] = useState<'find-n' | 'find-m'>('find-n');
  const [mMass, setMMass] = useState('180.16');
  const [mValue, setMValue] = useState('36.03');
  const [nValue, setNValue] = useState('0.2');

  // Concentration state
  const [concM, setConcM] = useState('58.44'); // NaCl
  const [concN, setConcN] = useState('0.05');
  const [concV, setConcV] = useState('0.25'); // 250 mL = 0.25 L

  // Dilution state
  const [c1, setC1] = useState('2.0'); // 2 mol/L
  const [v2, setV2] = useState('500'); // 500 mL
  const [c2, setC2] = useState('0.1'); // 0.1 mol/L

  // pH state
  const [phInput, setPhInput] = useState('3.0');
  const [phMode, setPhMode] = useState<'from-ph' | 'from-conc'>('from-ph');
  const [h3oInput, setH3oInput] = useState('0.001');

  // Gas law state
  const [gasP, setGasP] = useState('1.013'); // bar
  const [gasV, setGasV] = useState('22.4'); // L
  const [gasT, setGasT] = useState('20'); // °C

  // Stoechiometry state
  const [coeffA, setCoeffA] = useState('1');
  const [n0A, setN0A] = useState('2.0');
  const [coeffB, setCoeffB] = useState('5');
  const [n0B, setN0B] = useState('8.0');

  // Compute Molar Mass breakdown
  const parsedMap = parseFormula(formulaInput);
  const totalMolarMass = computeMolarMass(parsedMap);
  const elementsBreakdown = Object.entries(parsedMap).map(([sym, count]) => {
    const el = ALL_ELEMENTS.find((e) => e.symbol === sym);
    const weight = el ? el.atomicMass : 0;
    const subtotal = weight * count;
    const pct = totalMolarMass > 0 ? (subtotal / totalMolarMass) * 100 : 0;
    return {
      symbol: sym,
      name: el ? el.name : sym,
      count,
      weight,
      subtotal: Math.round(subtotal * 1000) / 1000,
      percentage: Math.round(pct * 10) / 10,
    };
  });

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
              <Calculator className="w-5 h-5 text-cyan-400" />
              Calculatrices Chimiques Pédagogiques
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Formules et détails pas à pas pour chaque étape de vos calculs de laboratoire.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Tab Switcher Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
        {[
          { id: 'molar-mass', label: '1. Masse molaire' },
          { id: 'moles-mass', label: '2. Moles & Masse (n = m/M)' },
          { id: 'concentration', label: '3. Concentration (C = n/V)' },
          { id: 'dilution', label: '4. Dilution (C1·V1 = C2·V2)' },
          { id: 'ph', label: '5. pH & pOH' },
          { id: 'gas', label: '6. Gaz parfaits (PV = nRT)' },
          { id: 'stoechio', label: '7. Stœchiométrie & Avancement' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCalc(tab.id as CalcType)}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition min-h-[44px] cursor-pointer ${
              activeCalc === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/25 scale-102'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Molar Mass Calculator */}
      {activeCalc === 'molar-mass' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 animate-fade-in">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
              Formule brute de la molécule :
            </label>
            <input
              type="text"
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
              placeholder="Ex : C6H12O6, CuSO4, Ca(OH)2..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-lg font-mono text-white focus:outline-none focus:border-cyan-400 min-h-[48px]"
            />
          </div>

          {/* Quick preset formulas */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-mono">Exemples :</span>
            {['H2O', 'CO2', 'C6H12O6', 'Ca(OH)2', 'CuSO4', 'CH3COOH'].map((f) => (
              <button
                key={f}
                onClick={() => setFormulaInput(f)}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 cursor-pointer min-h-[36px]"
              >
                {f}
              </button>
            ))}
          </div>

          {/* Result Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-mono">Masse Molaire Totale (M)</span>
              <div className="text-3xl font-black font-mono text-cyan-300 mt-1">
                {totalMolarMass} <span className="text-lg text-slate-400 font-sans">g/mol</span>
              </div>
            </div>
          </div>

          {/* Percentage Composition Table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
              Décomposition par Élément & Fraction Massique (%)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="pb-2">Élément</th>
                    <th className="pb-2">Masse atomique</th>
                    <th className="pb-2">Quantité</th>
                    <th className="pb-2">Sous-total</th>
                    <th className="pb-2 text-right">Pourcentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {elementsBreakdown.map((row) => (
                    <tr key={row.symbol}>
                      <td className="py-2 font-bold text-white">
                        {row.name} ({row.symbol})
                      </td>
                      <td className="py-2 text-slate-300">{row.weight} g/mol</td>
                      <td className="py-2 text-cyan-300">× {row.count}</td>
                      <td className="py-2 text-purple-300 font-bold">{row.subtotal} g/mol</td>
                      <td className="py-2 text-right font-bold text-emerald-400">
                        {row.percentage} %
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. Moles & Mass (n = m / M) */}
      {activeCalc === 'moles-mass' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 animate-fade-in">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start">
            <button
              onClick={() => setMoleMode('find-n')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer min-h-[36px] ${
                moleMode === 'find-n' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Calculer n (moles)
            </button>
            <button
              onClick={() => setMoleMode('find-m')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer min-h-[36px] ${
                moleMode === 'find-m' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              Calculer m (masse en g)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Masse molaire M (g/mol) :</label>
              <input
                type="number"
                value={mMass}
                onChange={(e) => setMMass(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>

            {moleMode === 'find-n' ? (
              <div>
                <label className="text-xs text-slate-400 font-mono block mb-1">Masse pesée m (g) :</label>
                <input
                  type="number"
                  value={mValue}
                  onChange={(e) => setMValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
                />
              </div>
            ) : (
              <div>
                <label className="text-xs text-slate-400 font-mono block mb-1">Quantité de matière n (mol) :</label>
                <input
                  type="number"
                  value={nValue}
                  onChange={(e) => setNValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
                />
              </div>
            )}
          </div>

          {/* Computed Detail */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs text-cyan-400 uppercase font-mono font-bold">Détail du calcul pas à pas :</span>
            {moleMode === 'find-n' ? (
              <>
                <p className="text-xs text-slate-300 font-mono">
                  Formule : <strong className="text-white">n = m / M</strong>
                </p>
                <p className="text-xs text-slate-300 font-mono">
                  Application numérique : n = {mValue} g / {mMass} g/mol
                </p>
                <div className="text-2xl font-black text-cyan-300 font-mono pt-1">
                  n = {(parseFloat(mValue) / parseFloat(mMass) || 0).toFixed(4)} mol
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-slate-300 font-mono">
                  Formule : <strong className="text-white">m = n × M</strong>
                </p>
                <p className="text-xs text-slate-300 font-mono">
                  Application numérique : m = {nValue} mol × {mMass} g/mol
                </p>
                <div className="text-2xl font-black text-purple-300 font-mono pt-1">
                  m = {(parseFloat(nValue) * parseFloat(mMass) || 0).toFixed(3)} g
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. Concentration (C = n / V) */}
      {activeCalc === 'concentration' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Quantité n (mol) :</label>
              <input
                type="number"
                value={concN}
                onChange={(e) => setConcN(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Volume de solution V (L) :</label>
              <input
                type="number"
                value={concV}
                onChange={(e) => setConcV(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Masse molaire soluté (g/mol) :</label>
              <input
                type="number"
                value={concM}
                onChange={(e) => setConcM(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs text-cyan-400 uppercase font-mono font-bold">Résultats :</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-xs text-slate-400 block font-mono">Concentration molaire (C = n / V) :</span>
                <span className="text-2xl font-black text-cyan-300 font-mono">
                  {(parseFloat(concN) / parseFloat(concV) || 0).toFixed(4)} mol/L
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-mono">Concentration massique (Cm = C × M) :</span>
                <span className="text-2xl font-black text-purple-300 font-mono">
                  {((parseFloat(concN) / parseFloat(concV)) * parseFloat(concM) || 0).toFixed(2)} g/L
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Dilution (C1·V1 = C2·V2) */}
      {activeCalc === 'dilution' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 animate-fade-in">
          <p className="text-xs text-slate-400">
            Préparer une solution fille de concentration C₂ et volume V₂ à partir d'une solution mère C₁.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">C₁ mère (mol/L) :</label>
              <input
                type="number"
                value={c1}
                onChange={(e) => setC1(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">C₂ fille désirée (mol/L) :</label>
              <input
                type="number"
                value={c2}
                onChange={(e) => setC2(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">V₂ volume total fille (mL) :</label>
              <input
                type="number"
                value={v2}
                onChange={(e) => setV2(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
          </div>

          {/* Computed Dilution Protocol */}
          {(() => {
            const numC1 = parseFloat(c1) || 1;
            const numC2 = parseFloat(c2) || 0.1;
            const numV2 = parseFloat(v2) || 100;
            const v1Sample = (numC2 * numV2) / numC1;
            const vWater = numV2 - v1Sample;
            const factor = numC1 / numC2;

            return (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs text-cyan-400 uppercase font-mono font-bold">
                  Protocole de Dilution (Facteur F = {factor.toFixed(1)}) :
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                  <li>
                    Prélever précisément <strong className="text-cyan-300 font-mono text-sm">{v1Sample.toFixed(2)} mL</strong> de solution mère à l'aide d'une pipette jaugée.
                  </li>
                  <li>
                    Verser le prélèvement dans une fiole jaugée de <strong>{numV2} mL</strong>.
                  </li>
                  <li>
                    Ajouter environ <strong className="text-purple-300 font-mono text-sm">{vWater.toFixed(2)} mL</strong> d'eau distillée jusqu'au trait de jauge en agitant.
                  </li>
                </ol>
              </div>
            );
          })()}
        </div>
      )}

      {/* 5. pH & pOH */}
      {activeCalc === 'ph' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-slate-400 font-mono block mb-1">Valeur de pH (0 à 14) :</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={phInput}
                onChange={(e) => setPhInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
          </div>

          {(() => {
            const ph = Math.max(0, Math.min(14, parseFloat(phInput) || 7));
            const poh = 14 - ph;
            const h3o = Math.pow(10, -ph);
            const oh = Math.pow(10, -poh);

            return (
              <div className="space-y-4">
                {/* Visual Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span className="text-rose-400 font-bold">Acide (pH 0)</span>
                    <span className="text-teal-400 font-bold">Neutre (pH 7)</span>
                    <span className="text-purple-400 font-bold">Basique (pH 14)</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-gradient-to-r from-rose-500 via-emerald-400 to-purple-600 relative overflow-hidden shadow-inner">
                    <div
                      className="absolute top-0 bottom-0 w-2 bg-white shadow-md border border-slate-900 -translate-x-1"
                      style={{ left: `${(ph / 14) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5 font-mono">pH</span>
                    <span className="text-xl font-black text-cyan-300 font-mono">{ph.toFixed(2)}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5 font-mono">pOH (14 - pH)</span>
                    <span className="text-xl font-black text-purple-300 font-mono">{poh.toFixed(2)}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5 font-mono">[H₃O⁺]</span>
                    <span className="text-xs font-black text-white font-mono truncate block">
                      {h3o.toExponential(3)} mol/L
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5 font-mono">[OH⁻]</span>
                    <span className="text-xs font-black text-white font-mono truncate block">
                      {oh.toExponential(3)} mol/L
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 6. Gaz Parfaits (PV = nRT) */}
      {activeCalc === 'gas' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Pression P (bar) :</label>
              <input
                type="number"
                value={gasP}
                onChange={(e) => setGasP(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Volume V (L) :</label>
              <input
                type="number"
                value={gasV}
                onChange={(e) => setGasV(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Température T (°C) :</label>
              <input
                type="number"
                value={gasT}
                onChange={(e) => setGasT(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
          </div>

          {(() => {
            const p = parseFloat(gasP) * 1e5 || 101325; // Pa
            const v = (parseFloat(gasV) || 22.4) * 1e-3; // m3
            const tK = (parseFloat(gasT) || 20) + 273.15; // K
            const r = 8.314; // J / (mol K)
            const n = (p * v) / (r * tK);

            return (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs text-cyan-400 uppercase font-mono font-bold">
                  Quantité de matière n calculée :
                </span>
                <p className="text-xs text-slate-300 font-mono">
                  n = (P × V) / (R × T) avec T = {tK.toFixed(2)} K et R = 8.314 J·mol⁻¹·K⁻¹
                </p>
                <div className="text-3xl font-black text-cyan-300 font-mono pt-1">
                  n = {n.toFixed(4)} mol
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 7. Stoechiométrie & Tableau d'avancement */}
      {activeCalc === 'stoechio' && (
        <div className="bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 animate-fade-in">
          <p className="text-xs text-slate-400">
            Réaction modèle : a A + b B ➔ Produits. Détermination du réactif limitant et de l'avancement maximal x_max.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Coeff 'a' :</label>
              <input
                type="number"
                value={coeffA}
                onChange={(e) => setCoeffA(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">n₀(A) (mol) :</label>
              <input
                type="number"
                value={n0A}
                onChange={(e) => setN0A(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">Coeff 'b' :</label>
              <input
                type="number"
                value={coeffB}
                onChange={(e) => setCoeffB(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-mono block mb-1">n₀(B) (mol) :</label>
              <input
                type="number"
                value={n0B}
                onChange={(e) => setN0B(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-white text-sm"
              />
            </div>
          </div>

          {(() => {
            const a = parseFloat(coeffA) || 1;
            const b = parseFloat(coeffB) || 1;
            const na = parseFloat(n0A) || 0;
            const nb = parseFloat(n0B) || 0;

            const xMaxA = na / a;
            const xMaxB = nb / b;
            const xMax = Math.min(xMaxA, xMaxB);
            const isLimitingA = xMaxA <= xMaxB;

            const nFinalA = Math.max(0, na - a * xMax);
            const nFinalB = Math.max(0, nb - b * xMax);

            return (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-mono">Réactif limitant :</span>
                      <h4 className="text-lg font-bold text-white mt-0.5">
                        {isLimitingA ? 'Réactif A' : 'Réactif B'} (épuisé à l'état final)
                      </h4>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-xs text-slate-400">Avancement maximal :</span>
                      <div className="text-xl font-black text-cyan-300">{xMax.toFixed(3)} mol</div>
                    </div>
                  </div>
                </div>

                {/* Tableau d'avancement Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="pb-2">État</th>
                        <th className="pb-2">Avancement</th>
                        <th className="pb-2">n(A) [mol]</th>
                        <th className="pb-2">n(B) [mol]</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="py-2.5 font-bold text-slate-300">Initial</td>
                        <td className="py-2.5 text-slate-400">x = 0</td>
                        <td className="py-2.5 text-cyan-300">{na}</td>
                        <td className="py-2.5 text-purple-300">{nb}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-slate-300">En cours</td>
                        <td className="py-2.5 text-slate-400">x</td>
                        <td className="py-2.5 text-cyan-300">{na} - {a}x</td>
                        <td className="py-2.5 text-purple-300">{nb} - {b}x</td>
                      </tr>
                      <tr className="bg-slate-950/60 font-bold">
                        <td className="py-2.5 text-emerald-400">Final</td>
                        <td className="py-2.5 text-white">x = {xMax.toFixed(3)}</td>
                        <td className="py-2.5 text-cyan-300">{nFinalA.toFixed(3)} {isLimitingA && '(limitant)'}</td>
                        <td className="py-2.5 text-purple-300">{nFinalB.toFixed(3)} {!isLimitingA && '(limitant)'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
