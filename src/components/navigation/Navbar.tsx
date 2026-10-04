import React from 'react';
import { Logo } from '../common/Logo';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { Menu, Sparkles, X } from 'lucide-react';

interface NavbarProps {
  currentModule: string;
  onNavigate: (key: string) => void;
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentModule,
  onNavigate,
  onOpenMenu,
  isMenuOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer text-left focus:outline-none min-h-[44px]"
          aria-label="Accueil Atomia"
        >
          <Logo size="sm" variant="full" />
        </button>

        {/* Right action buttons */}
        <div className="flex items-center gap-2">
          {/* In-app install PWA button */}
          <PWAInstallButton compact={true} />

          {/* Module Drawer trigger button */}
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Menu des modules"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
