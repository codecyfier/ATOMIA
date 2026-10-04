import React, { useState, useEffect } from 'react';
import { balanceChemicalEquation, BalancedResult } from './balancerAlgorithm';
import { Equal, CheckCircle2, AlertCircle, Sparkles, BookOpen, Scale, ArrowRight, ArrowLeft } from 'lucide-react';

const PRESET_EQUATIONS = [
  { label: 'Combustion du Propane', eq: 'C3H8 + O2 -> CO2 + H2O' },
  { label: 'Photosynthèse', eq: 'CO2 + H2O -> C6H12O6 + O2' },
  { label: 'Synthèse de l\'ammoniac (Haber-Bosch)', eq: 'N2 + H2 -> NH3' },
  { label: 'Oxydation du Fer (Rouille)', eq: 'Fe + O2 -> Fe2O3' },
  { label: 'Acide chlorhydrique sur zinc', eq: 'Zn + HCl -> ZnCl2 + H2' },
  { label: 'Précipitation chlorure d\'argent', eq: 'AgNO3 + NaCl -> AgCl + NaNO3' },
  { label: 'Combustion du Méthane', eq: 'CH4 + O2 -> CO2 + H2O' },
  { label: 'Attaque acide du calcaire', eq: 'CaCO3 + HCl -> CaCl2 + CO2 + H2O' },
];

interface EquationBalancerProps {
  onBack?: () => void;
}

export const EquationBalancer: React.FC<EquationBalancerProps> = ({ onBack }) => {
  const [inputEq, setInputEq] = useState('C3H8 + O2 -> CO2 + H2O');
  const [result, setResult] = useState<BalancedResult | null>(null);

  useEffect(() => {
    if (inputEq.trim()) {
      const res = balanceChemicalEquation(inputEq);
      setResult(res);
    } else {
      setResult(null);
    }
  }, [inputEq]);

  const insertSymbol = (s: string) => {
    setInputEq((prev) => prev + s);
  };

  return (
    <div className="flex flex-col space-y-5 max-w-4xl mx-auto pb-12">
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
              <Equal className="w-5 h-5 text-cyan-400" />
              Équilibreur d'Équations Chimiques
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Équilibrage instantané avec démonstration étape par étape et vérification de Lavoisier.
            </p>
          </div>
        </div>
      </div>

      {/* Preset reactions carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
        {PRESET_EQUATIONS.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setInputEq(preset.eq)}
            className="px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-300 text-xs font-semibold whitespace-nowrap transition active:scale-95 cursor-pointer min-h-[44px]"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Equation Input Box */}
      <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-4">
        <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
          Saisir l'équation brute (séparer par + et -&gt;) :
        </label>

        <div className="relative">
          <input
            type="text"
            value={inputEq}
            onChange={(e) => setInputEq(e.target.value)}
            placeholder="Ex : Fe + O2 -> Fe2O3"
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-base sm:text-lg font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition min-h-[52px]"
          />
        </div>

        {/* Chemical Keyboard helper buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-mono pr-2">Touches rapides :</span>
          {['->', '+', '(', ')', '2', '3', '4', 'H2O', 'CO2', 'O2'].map((btn) => (
            <button
              key={btn}
              onClick={() => insertSymbol(btn)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 transition min-h-[38px] cursor-pointer"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={() => setInputEq('')}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold ml-auto transition min-h-[38px] cursor-pointer"
          >
            Effacer
          </button>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {result.success ? (
            <>
              {/* Highlighted Balanced Equation Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-500/40 shadow-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Équation Stœchiométrique Équilibrée
                </span>

                <div className="text-xl sm:text-2xl md:text-3xl font-black font-mono text-white tracking-wide mt-2 px-2 py-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 w-full overflow-x-auto">
                  {result.balancedEquation}
                </div>

                <div className="flex items-center gap-4 mt-3 text-xs text-slate-300 font-mono">
                  <span>Masse réactifs : <strong className="text-cyan-300">{result.totalReactantMolarMass} g/mol</strong></span>
                  <span>=</span>
                  <span>Masse produits : <strong className="text-purple-300">{result.totalProductMolarMass} g/mol</strong></span>
                </div>
              </div>

              {/* Mass Conservation Table & Verification */}
              <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-purple-400" />
                  Vérification de la Conservation des Atomes (Lavoisier)
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono">
                        <th className="pb-2">Élément</th>
                        <th className="pb-2">Atomes dans les réactifs</th>
                        <th className="pb-2">Atomes dans les produits</th>
                        <th className="pb-2 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono">
                      {result.massConservation.map((item) => (
                        <tr key={item.element}>
                          <td className="py-2.5 font-bold text-white flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-300 font-black">
                              {item.element}
                            </span>
                          </td>
                          <td className="py-2.5 text-cyan-300 font-bold">{item.reactantsCount} atomes</td>
                          <td className="py-2.5 text-purple-300 font-bold">{item.productsCount} atomes</td>
                          <td className="py-2.5 text-right">
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Conservé
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Step-by-Step Explanation */}
              <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  Démonstration Étape par Étape
                </h3>

                <ol className="space-y-2 text-xs text-slate-300">
                  {result.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            /* Error Card */
            <div className="p-5 rounded-3xl bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-sm font-bold text-rose-200 mb-1">
                  Erreur de syntaxe ou de stœchiométrie
                </strong>
                <p>{result.error}</p>
                <p className="mt-2 text-slate-400">
                  Exemple de format attendu : <code className="font-mono text-cyan-300">C3H8 + O2 -&gt; CO2 + H2O</code>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
