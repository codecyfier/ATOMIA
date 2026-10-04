import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full bg-slate-900/90 border border-amber-500/40 px-3.5 py-1.5 text-xs font-medium text-amber-300 shadow-xl backdrop-blur-md animate-bounce-subtle pointer-events-none">
      <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <span>Mode hors ligne actif • Données locales préservées</span>
    </div>
  );
};
