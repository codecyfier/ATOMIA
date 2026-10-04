import React from 'react';

export interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'symbol' | 'full' | 'monochrome' | 'dark' | 'light';
  animated?: boolean;
  className?: string;
  showSubtext?: boolean;
}

const SIZE_MAP = {
  xs: 24,
  sm: 32,
  md: 44,
  lg: 64,
  xl: 96,
};

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  animated = false,
  className = '',
  showSubtext = false,
}) => {
  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 44;
  const isFull = variant === 'full';
  const isMono = variant === 'monochrome';
  const isLight = variant === 'light';

  // Dynamic unique IDs for gradients to prevent collisions if multiple instances are mounted
  const idSuffix = React.useId().replace(/:/g, '');
  const orbit1Id = `orbit1-${idSuffix}`;
  const orbit2Id = `orbit2-${idSuffix}`;
  const brandId = `brand-${idSuffix}`;
  const nucleusId = `nucleus-${idSuffix}`;
  const glowId = `glow-${idSuffix}`;

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon */}
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
        aria-label="Logo Atomia"
      >
        <defs>
          <linearGradient id={brandId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isMono ? 'currentColor' : '#06b6d4'} />
            <stop offset="50%" stopColor={isMono ? 'currentColor' : '#14b8a6'} />
            <stop offset="100%" stopColor={isMono ? 'currentColor' : '#8b5cf6'} />
          </linearGradient>

          <linearGradient id={orbit1Id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isMono ? 'currentColor' : '#22d3ee'} />
            <stop offset="100%" stopColor={isMono ? 'currentColor' : '#8b5cf6'} />
          </linearGradient>

          <linearGradient id={orbit2Id} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isMono ? 'currentColor' : '#c084fc'} />
            <stop offset="100%" stopColor={isMono ? 'currentColor' : '#06b6d4'} />
          </linearGradient>

          <radialGradient id={nucleusId} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor={isMono ? '#ffffff' : '#ffffff'} />
            <stop offset="35%" stopColor={isMono ? 'currentColor' : '#67e8f9'} />
            <stop offset="80%" stopColor={isMono ? 'currentColor' : '#06b6d4'} />
            <stop offset="100%" stopColor={isMono ? 'currentColor' : '#7c3aed'} />
          </radialGradient>

          <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform="translate(50, 50)">
          {/* Subtle soft backdrop ambient glow */}
          {!isMono && (
            <circle
              r="28"
              fill={`url(#${brandId})`}
              opacity="0.12"
              className={animated ? 'animate-pulse' : ''}
            />
          )}

          {/* Left Orbit of 'A' (tilted -28 degrees) */}
          <ellipse
            rx="15"
            ry="38"
            transform="rotate(-28)"
            fill="none"
            stroke={isMono ? 'currentColor' : `url(#${orbit1Id})`}
            strokeWidth="4"
            strokeLinecap="round"
            className={animated ? 'transition-all duration-700' : ''}
          />

          {/* Right Orbit of 'A' (tilted +28 degrees) */}
          <ellipse
            rx="15"
            ry="38"
            transform="rotate(28)"
            fill="none"
            stroke={isMono ? 'currentColor' : `url(#${orbit2Id})`}
            strokeWidth="4"
            strokeLinecap="round"
            className={animated ? 'transition-all duration-700' : ''}
          />

          {/* Horizontal crossbar of 'A' */}
          <ellipse
            rx="29"
            ry="9"
            transform="translate(0, 6)"
            fill="none"
            stroke={isMono ? 'currentColor' : `url(#${brandId})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Central glowing Nucleus */}
          <circle
            r="8.5"
            fill={isMono ? 'currentColor' : `url(#${nucleusId})`}
            filter={isMono ? undefined : `url(#${glowId})`}
          />
          <circle
            r="3.2"
            fill="#ffffff"
            opacity="0.9"
          />

          {/* Orbiting electron */}
          <g
            className={animated ? 'animate-spin' : ''}
            style={{
              transformOrigin: '0 0',
              animationDuration: animated ? '4s' : undefined,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            <circle
              cx="18"
              cy="-16"
              r="3.2"
              fill={isMono ? 'currentColor' : '#38bdf8'}
              filter={isMono ? undefined : `url(#${glowId})`}
            />
            <circle cx="18" cy="-16" r="1.3" fill="#ffffff" />
          </g>

          {/* Second subtle counter-electron */}
          <g
            className={animated ? 'animate-spin' : ''}
            style={{
              transformOrigin: '0 0',
              animationDuration: animated ? '6s' : undefined,
              animationDirection: 'reverse',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
            }}
          >
            <circle
              cx="-20"
              cy="16"
              r="2.4"
              fill={isMono ? 'currentColor' : '#c084fc'}
              opacity="0.9"
            />
          </g>
        </g>
      </svg>

      {/* Brand Typography Wordmark "Atomia" */}
      {isFull && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center tracking-tight font-extrabold text-xl sm:text-2xl font-sans">
            <span
              className={
                isMono
                  ? 'text-current'
                  : isLight
                  ? 'bg-gradient-to-r from-teal-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm'
              }
            >
              Atom
            </span>
            <span
              className={
                isMono
                  ? 'text-current opacity-80'
                  : isLight
                  ? 'text-purple-600 font-bold'
                  : 'text-purple-300 font-bold'
              }
            >
              ia
            </span>
          </div>
          {showSubtext && (
            <span
              className={`text-[10px] tracking-widest uppercase font-semibold mt-0.5 ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Chimie Interactive
            </span>
          )}
        </div>
      )}
    </div>
  );
};
