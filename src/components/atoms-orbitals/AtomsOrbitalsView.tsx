import React, { useState } from 'react';
import { Orbitals3D } from './Orbitals3D';
import { SubshellBoxes } from './SubshellBoxes';
import { IsotopesIonsExplorer } from './IsotopesIonsExplorer';
import { Atom, Box, Sparkles, Orbit, ArrowLeft } from 'lucide-react';

interface AtomsOrbitalsViewProps {
  onBack?: () => void;
}

export const AtomsOrbitalsView: React.FC<AtomsOrbitalsViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'subshells' | 'isotopes'>('3d');

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
              <Atom className="w-5 h-5 text-cyan-400" />
              Atomes & Orbitales Quantiques
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Visualisation 3D des fonctions d'onde s, p, d, remplissage de Klechkowski et isotopes.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('3d')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition min-h-[40px] cursor-pointer whitespace-nowrap ${
              activeTab === '3d'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>Orbitales 3D</span>
          </button>
          <button
            onClick={() => setActiveTab('subshells')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition min-h-[40px] cursor-pointer whitespace-nowrap ${
              activeTab === 'subshells'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Cases Quantiques</span>
          </button>
          <button
            onClick={() => setActiveTab('isotopes')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition min-h-[40px] cursor-pointer whitespace-nowrap ${
              activeTab === 'isotopes'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Isotopes & Ions</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === '3d' && <Orbitals3D />}
      {activeTab === 'subshells' && <SubshellBoxes />}
      {activeTab === 'isotopes' && <IsotopesIonsExplorer />}
    </div>
  );
};
