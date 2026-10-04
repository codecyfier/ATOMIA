import React, { useEffect, useRef } from 'react';

interface BohrModelProps {
  shells: number[];
  symbol: string;
  number: number;
  size?: number;
}

export const BohrModel: React.FC<BohrModelProps> = ({
  shells,
  symbol,
  number,
  size = 240,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const numShells = shells.length;
    const maxRadius = (size / 2) - 16;
    const minRadius = 28;
    const radiusStep = numShells > 1 ? (maxRadius - minRadius) / (numShells - 1) : 0;

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      const centerX = size / 2;
      const centerY = size / 2;

      // Draw concentric orbital rings
      shells.forEach((count, i) => {
        const r = numShells === 1 ? minRadius + 18 : minRadius + i * radiusStep;

        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.22)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Draw electrons evenly spaced around each shell
        for (let j = 0; j < count; j++) {
          const speedMultiplier = (i % 2 === 0 ? 1 : -1) * (0.8 + (numShells - i) * 0.25);
          const currentAngle = angle * speedMultiplier + (j * (Math.PI * 2 / count));
          const ex = centerX + Math.cos(currentAngle) * r;
          const ey = centerY + Math.sin(currentAngle) * r;

          // Electron glow
          ctx.beginPath();
          ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(34, 211, 238, 0.35)';
          ctx.fill();

          // Electron core
          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
        }
      });

      // Draw central nucleus
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(centerX - 4, centerY - 4, 2, centerX, centerY, 18);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.4, '#06b6d4');
      grad.addColorStop(1, '#7c3aed');
      ctx.fillStyle = grad;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();

      // Nucleus Symbol
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol, centerX, centerY);

      angle += 0.015;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [shells, symbol, number, size]);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full max-w-[260px] aspect-square rounded-2xl bg-slate-950/60 border border-slate-800 shadow-inner"
      />
      <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-cyan-300/80">
        <span>Couches :</span>
        <span className="font-semibold text-white">[{shells.join(' , ')}]</span>
      </div>
    </div>
  );
};
