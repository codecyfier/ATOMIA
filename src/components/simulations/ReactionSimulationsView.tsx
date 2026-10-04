import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Eye, Zap, Flame, Droplets, Thermometer, Sparkles, ArrowLeft } from 'lucide-react';

type SimulationType = 'acid-base' | 'combustion' | 'precipitation' | 'redox';

interface SimParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: string;
  color: string;
  radius: number;
}

interface ReactionSimulationsViewProps {
  onBack?: () => void;
}

export const ReactionSimulationsView: React.FC<ReactionSimulationsViewProps> = ({ onBack }) => {
  const [selectedSim, setSelectedSim] = useState<SimulationType>('acid-base');
  const [progress, setProgress] = useState<number>(0); // 0 to 100%
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [viewType, setViewType] = useState<'both' | 'macro' | 'micro'>('both');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SimParticle[]>([]);

  // Initialize or reset particles on sim change or reset
  const initParticles = (type: SimulationType) => {
    const list: SimParticle[] = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      let pType = 'H3O+';
      let color = '#ef4444';

      if (type === 'acid-base') {
        pType = i < 20 ? 'H3O+' : 'OH-';
        color = i < 20 ? '#ef4444' : '#3b82f6';
      } else if (type === 'combustion') {
        pType = i < 15 ? 'CH4' : 'O2';
        color = i < 15 ? '#06b6d4' : '#38bdf8';
      } else if (type === 'precipitation') {
        pType = i < 20 ? 'Ag+' : 'Cl-';
        color = i < 20 ? '#94a3b8' : '#10b981';
      } else if (type === 'redox') {
        pType = i < 20 ? 'Cu2+' : 'Zn';
        color = i < 20 ? '#38bdf8' : '#cbd5e1';
      }

      list.push({
        x: 20 + Math.random() * 260,
        y: 20 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        type: pType,
        color,
        radius: 4.5,
      });
    }

    particlesRef.current = list;
  };

  useEffect(() => {
    initParticles(selectedSim);
    setProgress(0);
    setIsPlaying(false);
  }, [selectedSim]);

  // Animation timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return prev + 1.2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Canvas particle simulation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;

      const particles = particlesRef.current;
      const ratio = progress / 100;

      // Update & Draw particles
      particles.forEach((p, idx) => {
        // Physical movement
        p.x += p.vx * (selectedSim === 'combustion' ? 1 + ratio * 2.5 : 1);
        p.y += p.vy * (selectedSim === 'combustion' ? 1 + ratio * 2.5 : 1);

        if (p.x < p.radius || p.x > width - p.radius) p.vx *= -1;
        if (p.y < p.radius || p.y > height - p.radius) p.vy *= -1;

        // Visual evolution based on progress
        let renderColor = p.color;
        let label = p.type;

        if (selectedSim === 'acid-base') {
          if (idx < ratio * particles.length) {
            renderColor = '#06b6d4'; // H2O molecule
            label = 'H2O';
          }
        } else if (selectedSim === 'combustion') {
          if (idx < ratio * particles.length) {
            renderColor = idx % 2 === 0 ? '#f97316' : '#a855f7'; // CO2 or H2O
            label = idx % 2 === 0 ? 'CO2' : 'H2O';
          }
        } else if (selectedSim === 'precipitation') {
          if (idx < ratio * particles.length) {
            renderColor = '#ffffff'; // AgCl precipitate sinking
            label = 'AgCl(s)';
            p.y = Math.min(height - 15, p.y + 0.8); // Sinks
          }
        } else if (selectedSim === 'redox') {
          if (idx < ratio * particles.length) {
            renderColor = '#b45309'; // Metallic Cu deposited
            label = 'Cu(s)';
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = renderColor;
        ctx.fill();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, p.x, p.y - 7);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [progress, selectedSim]);

  // Derived properties based on reaction and progress
  const simData = {
    'acid-base': {
      title: 'Titrage Acido-Basique & Neutralisation',
      equation: 'H3O⁺ (aq) + OH⁻ (aq) ➔ 2 H₂O (l)',
      currentVal: `pH = ${(1.0 + (progress < 50 ? (progress / 50) * 1.5 : 2.5 + ((progress - 50) / 50) * 9.5)).toFixed(2)}`,
      curveLabel: 'Courbe de pH vs Volume NaOH ajouté (mL)',
      explanation:
        progress < 45
          ? "Avant l'équivalence : Les ions H3O+ sont en large excès, le pH augmente lentement. La solution reste incolore."
          : progress <= 55
          ? "Au point d'équivalence (pH = 7) : Tout l'acide a été neutralisé stœchiométriquement par la base ! Virage coloré immédiat au rose persistant (indicateur phénolphtaléine)."
          : "Après l'équivalence : Les ions hydroxyde OH- apportés en excès rendent la solution très basique (pH > 11).",
      indicatorColor:
        progress < 50 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(244, 114, 182, 0.75)',
    },
    combustion: {
      title: 'Combustion Complète du Méthane',
      equation: 'CH₄ (g) + 2 O₂ (g) ➔ CO₂ (g) + 2 H₂O (g) + Chaleur',
      currentVal: `T = ${Math.round(25 + (progress / 100) * 1175)} °C`,
      curveLabel: 'Température du réacteur (°C) vs Temps',
      explanation:
        "Réaction fortement exothermique (ΔH = -890 kJ/mol). Les liaisons C-H et O=O se rompent pour former des liaisons C=O et O-H beaucoup plus stables, libérant une intense énergie thermique.",
      indicatorColor: 'rgba(249, 115, 22, 0.85)',
    },
    precipitation: {
      title: 'Précipitation du Chlorure d\'Argent',
      equation: 'Ag⁺ (aq) + Cl⁻ (aq) ➔ AgCl (s) ↓ (précipité blanc)',
      currentVal: `Masse précipitée = ${((progress / 100) * 2.87).toFixed(2)} g`,
      curveLabel: 'Masse de AgCl formé (g) vs Volume AgNO3 ajouté',
      explanation:
        "Les ions argent Ag+ et chlorure Cl- possèdent un produit de solubilité Ks extrêmement faible (1.8 × 10⁻¹⁰). Dès leur rencontre, ils s'agrègent en un solide ionique blanc opaque qui sédimente au fond du récipient.",
      indicatorColor: `rgba(255, 255, 255, ${0.2 + (progress / 100) * 0.7})`,
    },
    redox: {
      title: 'Oxydoréduction : Lame de Zinc dans le Sulfate de Cuivre',
      equation: 'Zn (s) + Cu²⁺ (aq) ➔ Zn²⁺ (aq) + Cu (s)',
      currentVal: `[Cu²⁺] = ${(0.1 * (1 - progress / 100)).toFixed(3)} mol/L`,
      curveLabel: 'Concentration en ions Cu²⁺ (mol/L) vs Temps',
      explanation:
        "Transfert spontané de deux électrons : le zinc métallique s'oxyde en cédant 2 e⁻ (Zn ➔ Zn²⁺ + 2 e⁻), tandis que les ions cuivre Cu²⁺ bleus se réduisent en cuivre métallique rouge-orangé déposé sur la lame.",
      indicatorColor: `rgba(56, 189, 248, ${0.85 - (progress / 100) * 0.75})`,
    },
  }[selectedSim];

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
              <Activity className="w-5 h-5 text-cyan-400" />
              Simulations de Réactions Animées
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Observation simultanée aux échelles macroscopique et microscopique avec courbes en direct.
            </p>
          </div>
        </div>

        {/* View filter */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
          {(['both', 'macro', 'micro'] as const).map((vt) => (
            <button
              key={vt}
              onClick={() => setViewType(vt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition min-h-[36px] cursor-pointer ${
                viewType === vt
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {vt === 'both' ? 'Double Vue' : vt === 'macro' ? 'Macroscopique' : 'Microscopique'}
            </button>
          ))}
        </div>
      </div>

      {/* Simulation Selector Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
        {[
          { id: 'acid-base', label: 'Acide-Base & Titrage', icon: Droplets },
          { id: 'combustion', label: 'Combustion Méthane', icon: Flame },
          { id: 'precipitation', label: 'Précipitation AgCl', icon: Sparkles },
          { id: 'redox', label: 'Oxydoréduction Cu/Zn', icon: Zap },
        ].map((sim) => {
          const Icon = sim.icon;
          return (
            <button
              key={sim.id}
              onClick={() => setSelectedSim(sim.id as SimulationType)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-2 min-h-[44px] cursor-pointer ${
                selectedSim === sim.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/25 scale-102'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{sim.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Simulation Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Macroscopic Flask & Beaker Animation */}
        {(viewType === 'both' || viewType === 'macro') && (
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-5 flex flex-col items-center justify-between min-h-[340px] relative overflow-hidden shadow-2xl">
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Eye className="w-4 h-4" /> Échelle Macroscopique
              </span>
              <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800">
                {simData.currentVal}
              </span>
            </div>

            {/* Macroscopic Illustration */}
            <div className="relative w-44 h-52 flex flex-col items-center justify-end my-3">
              {/* Dropper or Burner */}
              {selectedSim === 'acid-base' && (
                <div className="absolute top-0 w-3 h-16 bg-slate-700/80 rounded-b-md border border-cyan-400/40">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mx-auto animate-ping mt-14" />
                </div>
              )}

              {/* Chemical Glass Beaker */}
              <div className="w-40 h-44 rounded-b-3xl border-2 border-t-0 border-slate-400/50 relative overflow-hidden bg-slate-900/40 shadow-inner flex flex-col justify-end">
                {/* Liquid Level */}
                <div
                  className="w-full transition-all duration-300 relative flex items-center justify-center"
                  style={{
                    height: `${45 + (progress / 100) * 35}%`,
                    backgroundColor: simData.indicatorColor,
                  }}
                >
                  {/* Effervescence or Bubbles */}
                  {selectedSim === 'combustion' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flame className="w-16 h-16 text-amber-500 animate-pulse" />
                    </div>
                  )}

                  {/* Precipitate settling at bottom */}
                  {selectedSim === 'precipitation' && progress > 5 && (
                    <div
                      className="absolute bottom-0 w-full bg-white/90 shadow-lg transition-all duration-300 rounded-b-2xl"
                      style={{ height: `${(progress / 100) * 28}px` }}
                    />
                  )}

                  {/* Redox zinc plate */}
                  {selectedSim === 'redox' && (
                    <div className="absolute top-0 w-8 h-36 bg-slate-400 border border-slate-300 rounded-t-md shadow-md">
                      {progress > 15 && (
                        <div
                          className="w-full bg-amber-700/90 absolute bottom-0 rounded-b-md transition-all duration-300"
                          style={{ height: `${(progress / 100) * 100}%` }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full text-center text-xs font-mono text-slate-400 z-10">
              {selectedSim === 'acid-base'
                ? 'Indicateur phénolphtaléine (incolore ➔ rose équivalence)'
                : selectedSim === 'combustion'
                ? 'Chaleur dégagée & flamme exothermique'
                : selectedSim === 'precipitation'
                ? 'Formation solide de AgCl insoluble'
                : 'Dépôt de cuivre rouge Cu(s) sur lame de Zn'}
            </div>
          </div>
        )}

        {/* Microscopic Particle Canvas Animation */}
        {(viewType === 'both' || viewType === 'micro') && (
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-5 flex flex-col items-center justify-between min-h-[340px] relative overflow-hidden shadow-2xl">
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Échelle Microscopique (Particules & Chocs)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Avancement x : {Math.round(progress)}%
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={320}
              height={220}
              className="w-full max-w-[340px] aspect-video rounded-2xl bg-slate-900/60 border border-slate-800 my-2"
            />

            <div className="w-full text-center text-xs font-mono text-cyan-300 z-10 truncate">
              {simData.equation}
            </div>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="bg-slate-900/80 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-cyan-500/25 flex items-center gap-2 min-h-[44px] cursor-pointer active:scale-95 transition"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Lancer la réaction'}</span>
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setProgress(0);
                initParticles(selectedSim);
              }}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 min-h-[44px] min-w-[44px] flex items-center justify-center transition cursor-pointer"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper slider */}
          <div className="flex-1 max-w-md flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">0%</span>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-xs font-mono text-cyan-400 font-bold">100%</span>
          </div>
        </div>

        {/* Live Pedagogical Explanation Card */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed mt-2">
          <h4 className="text-cyan-400 font-bold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Que se passe-t-il dans cette réaction ?
          </h4>
          <p>{simData.explanation}</p>
        </div>
      </div>
    </div>
  );
};
