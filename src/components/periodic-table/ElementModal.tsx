import React from 'react';
import { X, Sparkles, AlertTriangle, ShieldCheck, Bookmark, Share2 } from 'lucide-react';
import { ChemicalElement, CATEGORY_COLORS } from '../../data/elements';
import { BohrModel } from './BohrModel';

interface ElementModalProps {
  element: ChemicalElement | null;
  onClose: () => void;
  onSelectElement?: (el: ChemicalElement) => void;
}

export const ElementModal: React.FC<ElementModalProps> = ({
  element,
  onClose,
}) => {
  if (!element) return null;

  const colorStyles = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['unknown'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${element.name} (${element.symbol}) - Atomia`,
        text: `Découvrez ${element.name} (Z = ${element.number}) sur Atomia Chimie : ${element.summary}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${element.name} (${element.symbol}) : ${element.summary}`);
      alert('Résumé copié dans le presse-papiers !');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl text-slate-100 flex flex-col my-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with color banner */}
        <div className={`p-5 sm:p-6 border-b border-slate-800 flex items-start justify-between relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900`}>
          <div className="flex items-center gap-4 z-10">
            <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border font-bold shadow-lg ${colorStyles.bg} ${colorStyles.border} ${colorStyles.text}`}>
              <span className="text-xs text-slate-400 font-mono leading-none">{element.number}</span>
              <span className="text-2xl font-black">{element.symbol}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-extrabold text-white">{element.name}</h2>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${colorStyles.badge}`}>
                  {element.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Masse atomique : <strong className="text-slate-200">{element.atomicMass} u</strong> • Période {element.period}, Groupe {element.group}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 z-10">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
              title="Partager l'élément"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Top section: Summary & Bohr Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Description & Identité
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/80">
                {element.summary}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 block">État à 20°C :</span>
                  <span className="font-semibold text-white capitalize">{element.phase}</span>
                </div>
                <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 block">Découverte :</span>
                  <span className="font-semibold text-white">{element.yearDiscovered}</span>
                </div>
                <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 col-span-2">
                  <span className="text-slate-400 block">Découvreur :</span>
                  <span className="font-semibold text-white">{element.discoverer}</span>
                </div>
              </div>
            </div>

            {/* Animated Bohr Model */}
            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 mb-2">Modèle de Bohr & Électrons</span>
              <BohrModel
                shells={element.electronShells}
                symbol={element.symbol}
                number={element.number}
                size={200}
              />
            </div>
          </div>

          {/* Atomic & Physical Properties Grid */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">
              Propriétés Physico-Chimiques
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block mb-1">Configuration</span>
                <span className="font-mono font-bold text-cyan-300">{element.electronConfiguration}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block mb-1">Électronégativité</span>
                <span className="font-bold text-white">
                  {element.electronegativity !== null ? `${element.electronegativity} (Pauling)` : 'N/D'}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block mb-1">Point de fusion</span>
                <span className="font-bold text-white">
                  {element.meltingPoint !== null ? `${element.meltingPoint} °C` : 'N/D'}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/40 border border-slate-800">
                <span className="text-slate-400 block mb-1">Point d'ébullition</span>
                <span className="font-bold text-white">
                  {element.boilingPoint !== null ? `${element.boilingPoint} °C` : 'N/D'}
                </span>
              </div>
            </div>
          </div>

          {/* Practical Uses & Hazards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-900/30">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Usages & Applications
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {element.uses.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/30">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5 mb-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Dangers & Sécurité
              </h4>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {element.hazards}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition min-h-[44px] cursor-pointer"
          >
            Fermer la fiche
          </button>
        </div>
      </div>
    </div>
  );
};
