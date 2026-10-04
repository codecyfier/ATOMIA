import React from 'react';
import { Home, Grid, Box, FlaskConical, LayoutGrid } from 'lucide-react';

interface BottomNavProps {
  currentModule: string;
  onNavigate: (key: string) => void;
  onOpenMenu: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentModule,
  onNavigate,
  onOpenMenu,
}) => {
  const tabs = [
    { key: 'home', label: 'Accueil', icon: Home },
    { key: 'periodic-table', label: 'Tableau', icon: Grid },
    { key: 'molecules-3d', label: '3D Molécules', icon: Box },
    { key: 'virtual-lab', label: 'Laboratoire', icon: FlaskConical },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1 sm:hidden">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentModule === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition min-w-[56px] min-h-[48px] select-none cursor-pointer ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px] scale-105' : 'stroke-[1.8px]'}`} />
              <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-cyan-400 mt-0.5" />
              )}
            </button>
          );
        })}

        {/* 5th button: All Modules Drawer */}
        <button
          onClick={onOpenMenu}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition min-w-[56px] min-h-[48px] text-slate-400 hover:text-white select-none cursor-pointer"
        >
          <LayoutGrid className="w-5 h-5 stroke-[1.8px]" />
          <span className="text-[10px] tracking-tight mt-0.5">Modules</span>
        </button>
      </div>
    </nav>
  );
};
