import { useEffect, useRef } from 'react';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export const useParticles = (canvasRef: React.RefObject<HTMLCanvasElement>, enabled = true) => {
  const particles = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  const createParticle = (x: number, y: number, color = 'rgba(212, 175, 55, 0.6)') => {
    if (!canvasRef.current) return;

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 2 + 1;

    particles.current.push({
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      life: 1,
      maxLife: Math.random() * 1 + 0.5,
      size: Math.random() * 3 + 1,
      color,
    });
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current = particles.current.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // gravity
      p.life -= 1 / (p.maxLife * 60);

      if (p.life > 0) {
        ctx.fillStyle = p.color.replace('0.6', String(0.6 * p.life));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      }
      return false;
    });

    if (particles.current.length > 0 || enabled) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled]);

  return { createParticle, particles };
};
