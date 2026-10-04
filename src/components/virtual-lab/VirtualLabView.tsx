import React, { useState } from 'react';
import {
  FlaskConical,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Flame,
  Droplet,
  Info,
  Layers,
  ArrowLeft,
} from 'lucide-react';

interface ChemicalReagent {
  id: string;
  name: string;
  formula: string;
  type: 'liquide' | 'solide' | 'indicateur';
  initialColor: string;
  ghsPictograms: string[];
  hazardNote: string;
  pH: number;
}

const REAGENTS: ChemicalReagent[] = [
  {
    id: 'h2o',
    name: 'Eau distillée',
    formula: 'H₂O',
    type: 'liquide',
    initialColor: 'rgba(255, 255, 255, 0.2)',
    ghsPictograms: ['Aucun'],
    hazardNote: 'Non dangereux. Solvant universel pur.',
    pH: 7.0,
  },
  {
    id: 'hcl',
    name: 'Acide chlorhydrique (1 mol/L)',
    formula: 'HCl (aq)',
    type: 'liquide',
    initialColor: 'rgba(255, 255, 255, 0.2)',
    ghsPictograms: ['Corrosif', 'Irritant'],
    hazardNote: 'Corrosif pour la peau et les yeux. Dégage des vapeurs acides.',
    pH: 1.0,
  },
  {
    id: 'naoh',
    name: 'Hydroxyde de sodium (1 mol/L)',
    formula: 'NaOH (aq)',
    type: 'liquide',
    initialColor: 'rgba(255, 255, 255, 0.2)',
    ghsPictograms: ['Corrosif'],
    hazardNote: 'Très corrosif pour les tissus vivants. Manipulation avec gants.',
    pH: 14.0,
  },
  {
    id: 'cuso4',
    name: 'Sulfate de cuivre (0.5 mol/L)',
    formula: 'CuSO₄ (aq)',
    type: 'liquide',
    initialColor: 'rgba(56, 189, 248, 0.85)',
    ghsPictograms: ['Nocif', 'Écotoxique'],
    hazardNote: 'Nocif en cas d\'ingestion. Toxique pour les organismes aquatiques.',
    pH: 4.5,
  },
  {
    id: 'phenol',
    name: 'Phénolphtaléine (Indicateur)',
    formula: 'C₂₀H₁₄O₄',
    type: 'indicateur',
    initialColor: 'rgba(255, 255, 255, 0.1)',
    ghsPictograms: ['Attention'],
    hazardNote: 'Indicateur de pH : incolore en milieu acide/neutre, rose fuchsia si pH > 8.2.',
    pH: 7.0,
  },
  {
    id: 'mg',
    name: 'Ruban de Magnésium',
    formula: 'Mg (s)',
    type: 'solide',
    initialColor: '#94a3b8',
    ghsPictograms: ['Inflammable'],
    hazardNote: 'Métal réducteur. Réagit vivement avec les acides en produisant de l\'hydrogène.',
    pH: 7.0,
  },
  {
    id: 'agno3',
    name: 'Nitrate d\'argent (0.1 mol/L)',
    formula: 'AgNO₃ (aq)',
    type: 'liquide',
    initialColor: 'rgba(255, 255, 255, 0.2)',
    ghsPictograms: ['Corrosif', 'Comburant'],
    hazardNote: 'Tache durablement la peau en noir. Éviter tout contact cutané.',
    pH: 6.0,
  },
  {
    id: 'nacl',
    name: 'Chlorure de sodium (1 mol/L)',
    formula: 'NaCl (aq)',
    type: 'liquide',
    initialColor: 'rgba(255, 255, 255, 0.2)',
    ghsPictograms: ['Aucun'],
    hazardNote: 'Solution saline neutre standard inoffensive.',
    pH: 7.0,
  },
];

type Glassware = 'becher' | 'eprouvette' | 'tube' | 'burette';

interface VirtualLabViewProps {
  onBack?: () => void;
}

export const VirtualLabView: React.FC<VirtualLabViewProps> = ({ onBack }) => {
  const [glassware, setGlassware] = useState<Glassware>('becher');
  const [contents, setContents] = useState<ChemicalReagent[]>([]);
  const [temperature, setTemperature] = useState<number>(20); // 20°C ambient
  const [hasPPE, setHasPPE] = useState<boolean>(true); // Personal protective equipment

  // Add reagent to active glassware
  const addReagent = (reagent: ChemicalReagent) => {
    setContents((prev) => [...prev, reagent]);
  };

  const clearVessel = () => {
    setContents([]);
    setTemperature(20);
  };

  // Compute reaction state based on reagents present
  const getReactionState = () => {
    const ids = contents.map((c) => c.id);

    const hasHCl = ids.includes('hcl');
    const hasNaOH = ids.includes('naoh');
    const hasPhenol = ids.includes('phenol');
    const hasMg = ids.includes('mg');
    const hasCuSO4 = ids.includes('cuso4');
    const hasAgNO3 = ids.includes('agno3');
    const hasNaCl = ids.includes('nacl');

    let liquidColor = 'rgba(255, 255, 255, 0.2)';
    let precipitate: string | null = null;
    let gasBubbles = false;
    let tempDelta = 0;
    let observation = 'Solution homogène au repos.';

    if (hasHCl && hasMg) {
      gasBubbles = true;
      tempDelta += 14;
      observation = 'Effervescence vigoureuse ! Dégagement de bulles de dihydrogène H₂ et dissolution du magnésium : Mg + 2 HCl ➔ MgCl₂ + H₂ ↑.';
    }

    if (hasAgNO3 && hasNaCl) {
      precipitate = 'Précipité blanc opaque de AgCl';
      observation = 'Formation instantanée d\'un précipité blanc caillebotté de chlorure d\'argent : Ag⁺ + Cl⁻ ➔ AgCl (s) ↓.';
    }

    if (hasCuSO4 && hasNaOH) {
      precipitate = 'Précipité gélatineux bleu de Cu(OH)₂';
      liquidColor = 'rgba(14, 165, 233, 0.75)';
      observation = 'Précipitation immédiate d\'hydroxyde de cuivre(II) bleu ciel : Cu²⁺ + 2 OH⁻ ➔ Cu(OH)₂ (s) ↓.';
    } else if (hasCuSO4) {
      liquidColor = 'rgba(56, 189, 248, 0.85)';
    }

    if (hasHCl && hasNaOH) {
      tempDelta += 8;
      if (hasPhenol) {
        // Depends on counts
        const countHCl = ids.filter((id) => id === 'hcl').length;
        const countNaOH = ids.filter((id) => id === 'naoh').length;
        if (countNaOH > countHCl) {
          liquidColor = 'rgba(244, 114, 182, 0.85)'; // Fuchsia pink
          observation = 'Neutralisation exothermique ! La base NaOH est en excès, le pH dépasse 8.2 : la phénolphtaléine vire au rose fuchsia.';
        } else {
          observation = 'Neutralisation acide-base avec dégagement de chaleur. Le milieu reste acide/neutre, la solution est incolore.';
        }
      } else {
        observation = 'Neutralisation acide-base : H₃O⁺ + OH⁻ ➔ 2 H₂O. Réaction exothermique (ΔT = +8°C).';
      }
    } else if (hasPhenol && hasNaOH) {
      liquidColor = 'rgba(244, 114, 182, 0.85)';
      observation = 'Virage coloré au rose fuchsia caractéristique en milieu basique.';
    }

    return {
      liquidColor,
      precipitate,
      gasBubbles,
      currentTemp: 20 + tempDelta,
      observation,
    };
  };

  const reaction = getReactionState();

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
              <FlaskConical className="w-5 h-5 text-cyan-400" />
              Laboratoire Virtuel Sécurisé
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Mélangez de la verrerie et des réactifs réels en toute sécurité avec consignes et protocoles.
            </p>
          </div>
        </div>

        {/* Safety PPE Toggle */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-300">EPI (Blouse, Lunettes, Gants)</span>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
            Actif
          </span>
        </div>
      </div>

      {/* Main Lab Bench Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Reagents Shelf (5 cols) */}
        <div className="md:col-span-5 bg-slate-900/80 p-4 sm:p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-cyan-400" />
              Étagère des Réactifs
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Touchez pour verser</span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {REAGENTS.map((reagent) => (
              <button
                key={reagent.id}
                onClick={() => addReagent(reagent)}
                className="w-full p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900 active:scale-98 transition flex items-center justify-between text-left cursor-pointer min-h-[52px]"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full border border-slate-500 shadow-sm shrink-0"
                    style={{ backgroundColor: reagent.initialColor }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white leading-tight">{reagent.name}</h4>
                    <span className="text-[11px] font-mono text-cyan-300">{reagent.formula}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {reagent.ghsPictograms.map((ghs, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    >
                      {ghs}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Center / Right: Working Glassware Bench (7 cols) */}
        <div className="md:col-span-7 bg-slate-950 p-5 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-2xl relative">
          {/* Glassware selection header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800">
              {[
                { id: 'becher', label: 'Bécher 250 mL' },
                { id: 'eprouvette', label: 'Éprouvette' },
                { id: 'tube', label: 'Tube à essai' },
              ].map((v) => (
                <button
                  key={v.id}
                  onClick={() => setGlassware(v.id as Glassware)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition min-h-[36px] cursor-pointer ${
                    glassware === v.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <button
              onClick={clearVessel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 text-xs font-semibold transition cursor-pointer min-h-[36px]"
              title="Vider et rincer la verrerie"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vider</span>
            </button>
          </div>

          {/* Central Glassware Container Simulation */}
          <div className="my-8 flex flex-col items-center justify-center relative min-h-[220px]">
            {/* Thermometer indicator badge */}
            <div className="absolute top-0 right-4 flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white shadow-lg">
              <Thermometer
                className={`w-4 h-4 ${
                  reaction.currentTemp > 25 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'
                }`}
              />
              <span>{reaction.currentTemp} °C</span>
            </div>

            {/* Visual Glassware Container */}
            <div
              className={`relative border-2 border-t-0 border-slate-400/60 shadow-2xl flex flex-col justify-end overflow-hidden transition-all duration-300 ${
                glassware === 'becher'
                  ? 'w-48 h-56 rounded-b-3xl'
                  : glassware === 'eprouvette'
                  ? 'w-24 h-64 rounded-b-2xl'
                  : 'w-16 h-56 rounded-b-full'
              }`}
            >
              {/* Liquid fill */}
              {contents.length > 0 && (
                <div
                  className="w-full transition-all duration-500 relative flex items-center justify-center overflow-hidden"
                  style={{
                    height: `${Math.min(90, contents.length * 24)}%`,
                    backgroundColor: reaction.liquidColor,
                  }}
                >
                  {/* Effervescence Bubbles */}
                  {reaction.gasBubbles && (
                    <div className="absolute inset-0 flex flex-wrap justify-around items-end p-2 pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-white/80 animate-bounce" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/80 animate-ping" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce" />
                    </div>
                  )}

                  {/* Precipitate sediment */}
                  {reaction.precipitate && (
                    <div className="absolute bottom-0 w-full h-8 bg-white/95 rounded-b-2xl shadow-lg border-t border-white/40" />
                  )}
                </div>
              )}
            </div>

            {contents.length === 0 && (
              <p className="text-xs text-slate-500 font-mono mt-3">
                Verrerie propre et vide. Ajoutez un produit sur l'étagère de gauche.
              </p>
            )}
          </div>

          {/* Real-time observation log */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Observations Expérimentales
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {contents.length === 0
                ? "Prêt pour la manipulation. Aucun réactif pour l'instant."
                : reaction.observation}
            </p>

            {contents.length > 0 && (
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-slate-400">
                <span>Composants versés ({contents.length}) :</span>
                {contents.map((c, i) => (
                  <span key={i} className="bg-slate-800 px-2 py-0.5 rounded-md text-cyan-300">
                    {c.formula}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
