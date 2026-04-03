import React, { useRef, useEffect } from 'react';
import { useParticles } from '../hooks/useParticles';

interface ParticleBackgroundProps {
  intensity?: number;
  color?: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  intensity = 0.3,
  color = 'rgba(212, 175, 55, 0.4)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createParticle } = useParticles(canvasRef);

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.3;
      createParticle(x, y, color);
    }, Math.floor(100 / intensity));

    return () => clearInterval(interval);
  }, [intensity, createParticle, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-50"
      style={{ zIndex: 0 }}
    />
  );
};
