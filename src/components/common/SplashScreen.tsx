import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  autoDismissMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  autoDismissMs = 2800,
}) => {
  const [stage, setStage] = useState<'orbits' | 'text' | 'ready'>('orbits');

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setStage('text');
    }, 700);

    const readyTimer = setTimeout(() => {
      setStage('ready');
    }, 1500);

    const autoTimer = setTimeout(() => {
      onComplete();
    }, autoDismissMs);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(readyTimer);
      clearTimeout(autoTimer);
    };
  }, [autoDismissMs, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 overflow-hidden select-none"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(6,182,212,0.18),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_65%,rgba(139,92,246,0.18),transparent_50%)] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 max-w-sm text-center">
        {/* Animated Atom SVG */}
        <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full overflow-visible"
            fill="none"
          >
            <defs>
              <linearGradient id="splashOrbit1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>

              <linearGradient id="splashOrbit2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>

              <radialGradient id="splashNucleus" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#67e8f9" />
                <stop offset="70%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#7c3aed" />
              </radialGradient>

              <filter id="splashGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing background aura */}
            <motion.circle
              cx="100"
              cy="100"
              r="60"
              fill="url(#splashOrbit1)"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.15, scale: [0.8, 1.1, 0.95] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
              filter="url(#splashGlow)"
            />

            {/* Left Orbit Path (-28 deg) */}
            <motion.ellipse
              cx="100"
              cy="100"
              rx="30"
              ry="78"
              transform="rotate(-28 100 100)"
              stroke="url(#splashOrbit1)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />

            {/* Right Orbit Path (+28 deg) */}
            <motion.ellipse
              cx="100"
              cy="100"
              rx="30"
              ry="78"
              transform="rotate(28 100 100)"
              stroke="url(#splashOrbit2)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
            />

            {/* Crossbar Orbit (Letter 'A' bar) */}
            <motion.ellipse
              cx="100"
              cy="114"
              rx="58"
              ry="18"
              stroke="url(#splashOrbit1)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            />

            {/* Central Nucleus with Flash */}
            <motion.circle
              cx="100"
              cy="100"
              r="17"
              fill="url(#splashNucleus)"
              filter="url(#splashGlow)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: 'backOut' }}
            />
            <motion.circle
              cx="100"
              cy="100"
              r="7"
              fill="#ffffff"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.8 }}
            />

            {/* Revolving Electron */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '100px 100px' }}
            >
              <circle
                cx="145"
                cy="75"
                r="6"
                fill="#22d3ee"
                filter="url(#splashGlow)"
              />
              <circle cx="145" cy="75" r="2.5" fill="#ffffff" />
            </motion.g>

            {/* Second counter-orbiting electron */}
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '100px 100px' }}
            >
              <circle
                cx="52"
                cy="128"
                r="4.5"
                fill="#c084fc"
                filter="url(#splashGlow)"
              />
            </motion.g>
          </svg>
        </div>

        {/* Wordmark and Tagline */}
        <AnimatePresence>
          {stage !== 'orbits' && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent">
                  Atom
                </span>
                <span className="text-purple-300">ia</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-2 text-sm text-cyan-200/80 font-medium tracking-wide flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                La chimie interactive & pédagogique
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Enter / Skip button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="mt-10"
        >
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 active:scale-95 transition min-h-[48px] touch-manipulation cursor-pointer"
          >
            <span>Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Bottom offline readiness notice */}
      <div className="absolute bottom-6 text-xs text-slate-500 tracking-wider font-mono">
        100% Hors-ligne • Données chimiques certifiées
      </div>
    </motion.div>
  );
};
