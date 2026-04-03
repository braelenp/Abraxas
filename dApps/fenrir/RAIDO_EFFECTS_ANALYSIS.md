# RAIDO Repository - Complete Visual Effects Analysis

**Source**: braelenp/Raido  
**Current Date**: April 1, 2026  
**Stack**: React 18 + TypeScript + Tailwind CSS v3 + Vite

---

## 1. COLOR SCHEME

```javascript
// tailwind.config.js - Color Palette
colors: {
  raido: {
    gold: '#d4af37',           // Primary glow color
    'gold-light': '#e6c547',   // Accent/highlight
    'deep-blue': '#0a1f3e',    // Background base
    'deep-blue-accent': '#1a3a5c',   // Secondary background
    'deep-blue-lighter': '#2a4a7c',  // Tertiary background
    cyan: '#00ffff',           // Secondary glow (neon)
    'cyan-subtle': '#00e6e6',  // Cyan variant
    purple: '#9945ff',         // Tertiary color
    black: '#0d0d1a',          // Pure black with blue tint
  }
}
```

**Usage Pattern**:
- **Gold (#d4af37)**: Text glows, shadows, primary UI elements
- **Cyan (#00ffff)**: Secondary text, alternative glow, accent borders
- **Deep Blue**: Backgrounds, semi-transparent overlays
- **Black (#0d0d1a)**: Base background with subtle blue warmth

---

## 2. TAILWIND THEME EXTENSIONS & ANIMATIONS

```javascript
// tailwind.config.js - Full Theme Configuration
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raido: {
          gold: '#d4af37',
          'gold-light': '#e6c547',
          'deep-blue': '#0a1f3e',
          'deep-blue-accent': '#1a3a5c',
          'deep-blue-lighter': '#2a4a7c',
          cyan: '#00ffff',
          'cyan-subtle': '#00e6e6',
          purple: '#9945ff',
          black: '#0d0d1a',
        }
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      keyframes: {
        // TYPING REVEAL - Sequential character unveil
        'typing-reveal': {
          '0%': {
            width: '0%',
            opacity: '0',
          },
          '100%': {
            width: '100%',
            opacity: '1',
          },
        },
        
        // GLOW PULSE - Pulsing box-shadow glow effect
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.8), 0 0 80px rgba(212, 175, 55, 0.4)',
          },
        },
        
        // FLOAT - Gentle vertical floating motion
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        
        // SHIMMER - Background position sweep
        'shimmer': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        
        // BEAM - Light sweep across gradient
        'beam': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      
      animation: {
        'typing-reveal': 'typing-reveal 3s steps(50, end) forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'beam': 'beam 2s ease-in-out infinite',
      },
      
      boxShadow: {
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.6)',
        'glow-blue': '0 0 20px rgba(26, 58, 92, 0.6)',
        'glow-cyan': '0 0 20px rgba(0, 255, 255, 0.4)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

---

## 3. GLOBAL CSS & KEYFRAMES

```css
/* index.css - Complete Global Styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
}

body {
  background: #0d0d1a;
  color: #ffffff;
  font-family: 'Inter', 'system-ui', 'sans-serif';
  overflow-x: hidden;
  position: relative;
}

/* ============= GLOW EFFECTS ============= */

/* Rune glow - moderate intensity */
.rune-glow {
  filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.6)) 
          drop-shadow(0 0 40px rgba(212, 175, 55, 0.3));
}

/* Rune glow - intense (for animated runes) */
.rune-glow-intense {
  filter: drop-shadow(0 0 30px rgba(212, 175, 55, 0.8)) 
          drop-shadow(0 0 60px rgba(212, 175, 55, 0.5)) 
          drop-shadow(0 0 90px rgba(212, 175, 55, 0.3));
}

/* ============= PARTICLE SYSTEM ============= */

/* Particle canvas styling */
.particle {
  position: fixed;
  pointer-events: none;
  will-change: transform, opacity;
}

/* ============= SCROLLBAR STYLING ============= */

html {
  scroll-behavior: smooth;
}

/* Light beam effect base style */
.light-beam {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
  filter: blur(8px);
}

/* ============= TEXT GLOW EFFECTS ============= */

/* Text glow - gold */
.text-glow {
  text-shadow: 0 0 10px rgba(212, 175, 55, 0.6), 
               0 0 20px rgba(212, 175, 55, 0.3);
}

/* Text glow - cyan */
.text-glow-cyan {
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.6), 
               0 0 20px rgba(0, 255, 255, 0.3);
}

/* ============= SCROLLBAR STYLING ============= */

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(26, 58, 92, 0.2);
}

::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.4);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.6);
}

/* ============= SELECTION STYLING ============= */

::selection {
  background: rgba(212, 175, 55, 0.3);
  color: inherit;
}

/* ============= FOCUS STATES ============= */

:focus-visible {
  outline: 2px solid rgba(212, 175, 55, 0.6);
  outline-offset: 2px;
}

/* ============= BUTTON UTILITIES ============= */

button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ============= FADE IN ANIMATIONS ============= */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

---

## 4. PARTICLE BACKGROUND COMPONENT

### useParticles Hook
```typescript
// src/hooks/useParticles.ts - Canvas-based Particle System

import { useEffect, useRef } from 'react';

export interface Particle {
  x: number;
  y: number;
  vx: number;                    // x velocity
  vy: number;                    // y velocity
  life: number;                  // 0-1 (fades out)
  maxLife: number;               // Total lifetime in seconds
  size: number;                  // Particle radius in pixels
  color: string;                 // RGBA color string
}

export const useParticles = (
  canvasRef: React.RefObject<HTMLCanvasElement>, 
  enabled = true
) => {
  const particles = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  // CREATE NEW PARTICLE
  const createParticle = (
    x: number, 
    y: number, 
    color = 'rgba(212, 175, 55, 0.6)'
  ) => {
    if (!canvasRef.current) return;

    // Random direction (radians) with random speed
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 2 + 1;

    particles.current.push({
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      life: 1,
      maxLife: Math.random() * 1 + 0.5,  // 0.5-1.5 seconds
      size: Math.random() * 3 + 1,        // 1-4 pixels
      color,
    });
  };

  // ANIMATION LOOP
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // UPDATE & DRAW PARTICLES
    particles.current = particles.current.filter(p => {
      // Apply velocity
      p.x += p.vx;
      p.y += p.vy;
      
      // Apply gravity (accelerates downward)
      p.vy += 0.1;
      
      // Decrease life over time
      p.life -= 1 / (p.maxLife * 60);

      if (p.life > 0) {
        // Fade out opacity as particle dies
        ctx.fillStyle = p.color.replace('0.6', String(0.6 * p.life));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        return true;
      }
      return false;
    });

    // Continue animation if particles exist or enabled
    if (particles.current.length > 0 || enabled) {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  // SETUP & CLEANUP
  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Handle window resize
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
```

### ParticleBackground Component
```typescript
// src/components/ParticleBackground.tsx

import React, { useRef, useEffect } from 'react';
import { useParticles } from '../hooks/useParticles';

interface ParticleBackgroundProps {
  intensity?: number;           // 0.1-1.0, controls spawn rate
  color?: string;               // RGBA color string
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  intensity = 0.3,
  color = 'rgba(212, 175, 55, 0.4)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createParticle } = useParticles(canvasRef);

  useEffect(() => {
    // Spawn particles at intervals based on intensity
    const interval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.3; // Top 30% only
      createParticle(x, y, color);
    }, Math.floor(100 / intensity));  // Lower intensity = longer interval

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
```

**Key Techniques**:
- Canvas 2D rendering with `requestAnimationFrame` for 60fps
- Particle physics: velocity + gravity acceleration
- Life decay for fade-out effect
- Filter particles to remove dead ones
- `will-change` CSS for performance hints
- Dynamic spawn rate based on `intensity` prop

---

## 5. LIGHT BEAM COMPONENT

```typescript
// src/components/LightBeam.tsx

import React from 'react';

interface LightBeamProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  angle?: number;               // Rotation in degrees (default 45)
  duration?: number;            // Animation duration in seconds (default 3)
}

export const LightBeam: React.FC<LightBeamProps> = ({
  position,
  angle = 45,
  duration = 3,
}) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} w-96 h-1 pointer-events-none overflow-hidden`}
      style={{
        transform: `rotate(${angle}deg)`,
        transformOrigin: position.includes('left') ? 'left center' : 'right center',
      }}
    >
      {/* Gradient beam that sweeps via 'beam' animation */}
      <div
        className="w-full h-full bg-gradient-to-r from-transparent via-raido-gold to-transparent opacity-30 blur-lg"
        style={{
          animation: `beam ${duration}s ease-in-out infinite`,
        }}
      />
    </div>
  );
};
```

**Beam Animation Mechanics**:
1. Linear gradient: `transparent → gold → transparent`
2. `blur-lg` CSS (8px blur) for soft appearance
3. `beam` keyframe animation sweeps from `-100%` → `+100%`
4. Opacity fades in at 50%, out at 0% and 100%
5. Position-based transform origin for realistic angles

---

## 6. RAIDHO RUNE SVG COMPONENT

```typescript
// src/components/RaidhoRune.tsx

import React from 'react';

interface RaidhoRuneProps {
  size?: number;                // SVG viewBox size (default 300)
  animated?: boolean;           // Apply glow-pulse animation
  className?: string;           // Additional CSS classes
}

export const RaidhoRune: React.FC<RaidhoRuneProps> = ({
  size = 300,
  animated = true,
  className = '',
}) => {
  // Raidho rune represents: movement, journey, flow (wheel/chariot)
  const glowClass = animated ? 'animate-glow-pulse rune-glow-intense' : 'rune-glow';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${glowClass} ${className}`}
      style={{
        filter: animated 
          ? 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 40px rgba(212, 175, 55, 0.3))'
          : 'none',
      }}
    >
      {/* ===== OUTER RINGS ===== */}
      
      {/* Outer circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2"
        opacity="0.8"
      />

      {/* Inner circle */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* ===== RUNE SHAPE (Wheel) ===== */}
      
      {/* Main diamond/rhombus for the wheel */}
      <path
        d="M 100 30 L 150 70 L 120 130 L 80 130 L 50 70 Z"
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2.5"
        opacity="0.9"
      />

      {/* ===== WHEEL SPOKES ===== */}
      
      {/* Central vertical spoke */}
      <line 
        x1="100" y1="50" x2="100" y2="130" 
        stroke="url(#goldGradient)" 
        strokeWidth="2" 
        opacity="0.7" 
      />
      
      {/* Central horizontal spoke */}
      <line 
        x1="60" y1="90" x2="140" y2="90" 
        stroke="url(#goldGradient)" 
        strokeWidth="2" 
        opacity="0.7" 
      />

      {/* Diagonal spoke (top-left to bottom-right) */}
      <line 
        x1="70" y1="60" x2="130" y2="120" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5" 
        opacity="0.5" 
      />
      
      {/* Diagonal spoke (top-right to bottom-left) */}
      <line 
        x1="130" y1="60" x2="70" y2="120" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5" 
        opacity="0.5" 
      />

      {/* ===== CENTER POINT ===== */}
      
      {/* Outer center circle (gradient filled) */}
      <circle
        cx="100"
        cy="90"
        r="8"
        fill="url(#goldGradient)"
        opacity="0.8"
      />

      {/* Inner pulsing center point (solid) */}
      <circle
        cx="100"
        cy="90"
        r="4"
        fill="#d4af37"
        opacity="1"
      />

      {/* ===== MOTION INDICATORS ===== */}
      
      {/* Top accent triangle */}
      <path
        d="M 95 40 L 105 40 L 100 50 Z"
        fill="url(#goldGradient)"
        opacity="0.6"
      />

      {/* Bottom accent triangle */}
      <path
        d="M 95 130 L 105 130 L 100 120 Z"
        fill="url(#goldGradient)"
        opacity="0.6"
      />

      {/* ===== GRADIENTS ===== */}
      <defs>
        {/* Linear gradient: light gold → primary gold → dark gold */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e6c547" stopOpacity="1" />
          <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
          <stop offset="100%" stopColor="#c99f2f" stopOpacity="1" />
        </linearGradient>

        {/* Radial gradient: centered bright gold fading to transparent */}
        <radialGradient id="goldRadial">
          <stop offset="0%" stopColor="#e6c547" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
```

**SVG Effects Techniques**:
- `url(#gradient)` references for reusable gradients
- `drop-shadow` filter for individual element glows (not box-shadow)
- Multiple opacity levels for depth (0.5, 0.7, 0.8, 0.9)
- Linear gradient mapped across 2D plane
- Radial gradient for center bloom effect
- SVG strokes with gradient fills (advanced technique)

---

## 7. LOADING SCREENS

### Raidho Loading Screen
```typescript
// src/components/RaidhoLoadingScreen.tsx

import React, { useEffect, useState } from 'react';

interface RaidhoLoadingScreenProps {
  onComplete?: () => void;
}

export const RaidhoLoadingScreen: React.FC<RaidhoLoadingScreenProps> = ({ 
  onComplete 
}) => {
  const [dots, setDots] = useState('.');
  const [progress, setProgress] = useState(0);

  // Animate dots (. → .. → ... → . cycling)
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  // Animate progress bar (0-100% with random jumps)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete?.();
          }, 300);
          return 100;
        }
        return prev + Math.random() * 30;  // Jump 0-30% per tick
      });
    }, 300);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-raido-black via-raido-black to-raido-deep-blue flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left glow blob */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-raido-gold/10 rounded-full blur-3xl animate-pulse" />
        
        {/* Bottom-right glow blob (delayed) */}
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-raido-gold/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '1s' }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        
        {/* ===== ANIMATED LOADING SYMBOL ===== */}
        <div className="relative">
          
          {/* Outer rotating ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-raido-gold border-r-raido-gold/50 animate-spin" 
            style={{ width: '80px', height: '80px' }} 
          />

          {/* Middle pulsing ring */}
          <div 
            className="absolute inset-2 rounded-full border border-raido-gold/30 animate-pulse" 
            style={{ width: '64px', height: '64px' }} 
          />

          {/* Inner rune glyph */}
          <div className="flex items-center justify-center" style={{ width: '80px', height: '80px' }}>
            <span 
              className="text-4xl font-black drop-shadow-lg" 
              style={{ 
                color: '#d4af37',
                textShadow: '0 0 12px rgba(212, 165, 55, 0.6), 0 0 24px rgba(212, 165, 55, 0.3)'
              }}
            >
              ᚱ
            </span>
          </div>
        </div>

        {/* ===== SYSTEM MESSAGE ===== */}
        <div className="text-center">
          {/* Label */}
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-raido-gold font-mono mb-4">
            [SYSTEM.INITIALIZING]
          </p>
          
          {/* Main title with glow */}
          <h2 
            className="text-xl md:text-2xl font-black uppercase tracking-widest mb-2 animate-pulse" 
            style={{ 
              color: '#d4af37',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
            }}
          >
            RAIDO PROTOCOL
          </h2>
          
          {/* Status message with animated dots */}
          <p className="text-xs md:text-sm text-raido-blue/80 font-mono">
            Status: <span className="animate-pulse">Activating{dots}</span>
          </p>
        </div>

        {/* ===== PROGRESS BAR ===== */}
        <div className="w-64 h-1 bg-raido-black/60 rounded-full border border-raido-gold/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-raido-gold to-raido-gold/60 rounded-full"
            style={{
              width: `${Math.min(progress, 100)}%`,
              animation: 'pulse 2s ease-in-out infinite',
              boxShadow: '0 0 16px rgba(212, 175, 55, 0.6)',
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>

        {/* Progress percentage */}
        <p className="text-xs text-raido-gold/60">
          {Math.floor(Math.min(progress, 100))}%
        </p>
      </div>
    </div>
  );
};
```

### Standard Loading Screen
```typescript
// src/components/LoadingScreen.tsx

import React, { useEffect, useState } from 'react';
import { RaidhoRune } from './RaidhoRune';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 3000,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, duration / 10);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const loadingStages = [
    'Initializing Raido Protocol...',
    'Scanning Solana ecosystem...',
    'Loading liquidity pools...',
    'Connecting to Tide...',
    'Standing by for Swift Provider...',
  ];

  const currentStage = Math.floor((progress / 100) * loadingStages.length);

  return (
    <div className="fixed inset-0 z-50 bg-raido-black flex items-center justify-center overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Top-right warm glow */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-raido-gold opacity-5 rounded-full blur-3xl" />
        
        {/* Bottom-left cool glow */}
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-raido-deep-blue-accent opacity-5 rounded-full blur-3xl" />
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center space-y-8 md:space-y-12 px-4">
        
        {/* Rune with pulse animation */}
        <div className="flex justify-center">
          <RaidhoRune size={150} animated={true} />
        </div>

        {/* Loading stage text with fade in/out */}
        <div className="h-16 md:h-20 flex items-center justify-center">
          <p className="text-lg md:text-2xl text-raido-gold text-glow animate-pulse">
            {loadingStages[Math.min(currentStage, loadingStages.length - 1)]}
          </p>
        </div>

        {/* ===== PROGRESS BAR ===== */}
        <div className="w-64 md:w-80 mx-auto">
          <div className="relative h-2 md:h-3 bg-raido-deep-blue-accent bg-opacity-40 rounded-full overflow-hidden border border-raido-gold border-opacity-20">
            {/* Gradient progress fill */}
            <div
              className="h-full bg-gradient-to-r from-raido-gold to-raido-gold-light transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          {/* Percentage label */}
          <p className="text-xs md:text-sm text-raido-gold mt-3 md:mt-4 opacity-60">
            {Math.floor(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Status messages */}
        <div className="text-sm md:text-base text-gray-400 space-y-2">
          <p>Raido is awakening...</p>
          <p className="text-xs md:text-sm opacity-60">The Swift Provider rises</p>
        </div>
      </div>
    </div>
  );
};
```

---

## 8. CARD & BUTTON STYLING

```typescript
// From Dashboard.tsx - Metric Card Example

{/* Metric Card with hover glow */}
<div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur 
                border border-raido-gold border-opacity-20 rounded-lg 
                p-4 md:p-6 hover:border-opacity-60 transition-all">
  <div className="flex items-center gap-2 mb-2 md:mb-3">
    <Droplet className="w-5 h-5 text-raido-gold" />
    <p className="text-xs md:text-sm text-gray-400">Total Liquidity</p>
  </div>
  <p className="text-2xl md:text-3xl font-bold text-raido-gold">
    ${(metrics.totalLiquidity / 1000000).toFixed(1)}M
  </p>
</div>
```

**Card Techniques**:
- `bg-opacity-40` + `backdrop-blur` for frosted glass effect
- `border border-{{color}} border-opacity-20` for subtle glow borders
- `hover:border-opacity-60` for interactive border glow
- `transition-all` with default 0.3s cubic-bezier timing
- Layered text with icons + secondary label

### Primary Button
```typescript
{/* Primary CTA button with gradient */}
<button
  onClick={() => onNavigate?.('dashboard')}
  className="group relative px-8 md:px-10 py-3 md:py-4 
             bg-gradient-to-r from-raido-gold to-raido-gold-light 
             text-raido-black font-bold rounded-lg 
             hover:shadow-glow-gold transition-all duration-300 
             flex items-center justify-center gap-2 
             text-base md:text-lg"
>
  <ZapIcon className="w-5 h-5" />
  Hunt Opportunities
</button>
```

### Secondary Button (Border Style)
```typescript
{/* Secondary button with cyan border */}
<button
  className="px-8 md:px-10 py-3 md:py-4 
             border-2 border-raido-cyan text-raido-cyan 
             font-bold rounded-lg 
             hover:bg-raido-cyan hover:text-raido-black 
             transition-all duration-300 
             flex items-center justify-center gap-2 
             text-base md:text-lg"
>
  <Compass className="w-5 h-5" />
  Connect Wallet
</button>
```

**Button Techniques**:
- Gradient fills: `from-color to-color-light`
- Shadow glow on hover: `hover:shadow-glow-gold`
- Color inversion on hover for secondary buttons
- `transition-all duration-300`: 300ms smooth transition
- Icon + text layout with gap spacing

---

## 9. SCANLINE OVERLAY EFFECT

```typescript
// From Dashboard.tsx

{/* Scanlines overlay - subtle horizontal lines */}
<div 
  className="fixed inset-0 pointer-events-none z-40 bg-repeat opacity-5" 
  style={{ 
    backgroundImage: 'repeating-linear-gradient(
      0deg,                          // Horizontal lines
      transparent,
      transparent 1px,               // Transparent line
      rgba(212, 165, 55, 0.1) 1px,   // Gold line
      rgba(212, 165, 55, 0.1) 2px    // 2px total height
    )' 
  }} 
/>
```

**Scanline Technique**:
- `repeating-linear-gradient` creates 2px pattern (1px transparent + 1px colored)
- `opacity-5` makes it very subtle (5% opacity)
- `pointer-events-none` ensures it doesn't block interaction
- Fixed positioning at `z-40` places it above content
- Gold color for thematic consistency

---

## 10. ANIMATED BACKGROUND BLOBS

```typescript
// Reusable animated glow blob pattern

{/* Top-left glow blob */}
<div className="absolute top-0 left-1/4 w-96 h-96 
                bg-raido-gold opacity-5 rounded-full blur-3xl 
                animate-pulse" />

{/* Bottom-right glow blob with delayed pulse */}
<div className="absolute bottom-0 right-1/4 w-96 h-96 
                bg-raido-gold/10 rounded-full blur-3xl 
                animate-pulse" 
     style={{ animationDelay: '1s' }} />

{/* Cyan variant for variety */}
<div className="absolute inset-0 rounded-full w-96 h-96 
                bg-raido-cyan/5 blur-3xl animate-pulse" 
     style={{ animationDelay: '0.5s' }} />
```

**Blob Techniques**:
- `w-96 h-96` (384px) soft circular glow
- `blur-3xl` (64px blur) for diffuse effect
- `opacity-5` or `color/5` for subtle blend
- `rounded-full` creates perfect circle (50%)
- `animate-pulse` Tailwind's built-in 2s pulsing
- `animationDelay` staggers multiple blobs
- `absolute` positioned at corners/quadrants

---

## 11. TYPING EFFECT

```typescript
// src/hooks/useTypingEffect.ts

import { useState, useEffect } from 'react';

export const useTypingEffect = (
  text: string, 
  speed = 50,              // ms per character
  startDelay = 0           // ms before starting
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let index = 0;

    const typeCharacter = () => {
      if (index < text.length) {
        // Reveal characters: text.slice(0, 1), text.slice(0, 2), etc.
        setDisplayedText(text.slice(0, index + 1));
        index++;
        timeoutId = setTimeout(typeCharacter, speed);
      } else {
        setIsComplete(true);
      }
    };

    if (startDelay > 0) {
      timeoutId = setTimeout(typeCharacter, startDelay);
    } else {
      timeoutId = setTimeout(typeCharacter, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
};

// USAGE:
const { displayedText, isComplete } = useTypingEffect("RAIDO", 80, 300);

// Renders with cursor:
<h1>
  {displayedText}
  {!isComplete && <span className="animate-pulse">▌</span>}
</h1>
```

**Typing Effect Techniques**:
- Sequential character reveal using `slice(0, index)`
- `speed` controls ms between character reveals
- `startDelay` staggers animation start
- Animated cursor: `animate-pulse` on separator glyph
- Returns both `displayedText` and `isComplete` state
- Perfect for sequential animations (title → subtitle → content)

---

## 12. PERFORMANCE OPTIMIZATIONS

```typescript
// 1. PARTICLE SYSTEM - Canvas for performance
// → Uses requestAnimationFrame for 60fps
// → Single canvas element (not DOM elements per particle)
// → will-change CSS hint for browser optimization

.particle {
  will-change: transform, opacity;
}

// 2. STAGGERED ANIMATIONS
// → Use animationDelay to spread rendering work
<div style={{ animationDelay: '0s' }} />
<div style={{ animationDelay: '0.5s' }} />
<div style={{ animationDelay: '1s' }} />

// 3. BACKDROP BLUR (GPU accelerated)
// → Cheaper than multiple shadow layers
<div className="backdrop-blur bg-opacity-40" />

// 4. POINTER EVENTS NONE
// → Removes interactive overhead from decorative elements
<div className="pointer-events-none" />

// 5. OPACITY AND TRANSFORMS (vs color/shadow changes)
// → opacity and transform are GPU-accelerated
// → Avoid frequent color or box-shadow changes
```

---

## 13. LANDING PAGE COMPOSITION

```typescript
// src/components/LandingPage.tsx - Complete effect orchestration

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onConnectWallet,
}) => {
  // ===== TYPING EFFECTS =====
  const { displayedText: displayedRaido, isComplete: raidoComplete } = 
    useTypingEffect(raidoTitle, 80, 300);

  const { displayedText: displayedTagline, isComplete: taglineComplete } = 
    useTypingEffect(mainTagline, 50, raidoComplete ? 400 : 999999);

  const [showContent, setShowContent] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // ===== ANIMATION SEQUENCING =====
  useEffect(() => {
    if (taglineComplete) {
      const timer = setTimeout(() => setShowContent(true), 500);
      return () => clearTimeout(timer);
    }
  }, [taglineComplete]);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => setShowInfo(true), 800);
      return () => clearTimeout(timer);
    }
  }, [showContent]);

  return (
    <div className="relative w-full bg-raido-black overflow-hidden">
      
      {/* PARTICLES + LIGHT BEAMS */}
      <ParticleBackground intensity={0.5} color="rgba(212, 175, 55, 0.3)" />
      <LightBeam position="top-left" angle={45} />
      <LightBeam position="top-right" angle={-45} />
      <LightBeam position="bottom-left" angle={-45} />

      {/* HERO SECTION */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-5xl mx-auto text-center space-y-2 md:space-y-3">
          
          {/* RUNE */}
          <div className="flex justify-center mb-4 md:mb-8 pt-8 md:pt-12">
            <RaidhoRune size={220} animated={true} />
          </div>

          {/* MAIN TITLE - TYPING EFFECT */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-raido-gold min-h-[40px] md:min-h-[60px] text-glow leading-tight">
            {displayedRaido}
            {!raidoComplete && <span className="animate-pulse">▌</span>}
          </h1>

          {/* SUBTITLE - TYPED AFTER TITLE */}
          <div className="min-h-[30px]">
            {raidoComplete && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-raido-cyan animate-fade-in leading-tight">
                {displayedTagline}
                {!taglineComplete && <span className="animate-pulse">▌</span>}
              </h2>
            )}
          </div>

          {/* SECONDARY TEXT */}
          {taglineComplete && (
            <div className="animate-fade-in">
              <p className="text-xl sm:text-2xl md:text-2xl text-raido-gold font-bold">
                {subtitle}
              </p>
            </div>
          )}

          {/* DESCRIPTION - FADES IN */}
          {showContent && (
            <div className="fade-in-up max-w-3xl mx-auto pt-4 md:pt-8">
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                Where the Daughters birth assets into matter, Raido provides the masculine current of movement.
                He hunts liquidity, opens new pathways, and multiplies value across the entire family on Solana.
              </p>
            </div>
          )}

          {/* CTA BUTTONS - FADE IN */}
          {showContent && (
            <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center pt-8 md:pt-12 flex-wrap">
              {/* Primary button */}
              <button
                onClick={() => onNavigate?.('dashboard')}
                className="group relative px-8 md:px-10 py-3 md:py-4 
                           bg-gradient-to-r from-raido-gold to-raido-gold-light 
                           text-raido-black font-bold rounded-lg 
                           hover:shadow-glow-gold transition-all duration-300 
                           flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <ZapIcon className="w-5 h-5" />
                Hunt Opportunities
              </button>

              {/* Secondary button */}
              <button
                onClick={onConnectWallet?.()}
                className="px-8 md:px-10 py-3 md:py-4 
                           border-2 border-raido-cyan text-raido-cyan 
                           font-bold rounded-lg 
                           hover:bg-raido-cyan hover:text-raido-black 
                           transition-all duration-300 
                           flex items-center justify-center gap-2 text-base md:text-lg"
              >
                <Compass className="w-5 h-5" />
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
```

---

## 14. QUICK REFERENCE: EFFECT COMBINATIONS

### "Glowing Card" Pattern
```tsx
<div className="bg-raido-deep-blue-accent bg-opacity-40 
                backdrop-blur 
                border border-raido-gold border-opacity-20 
                hover:border-opacity-60 
                rounded-lg p-6 
                hover:shadow-glow-gold 
                transition-all">
  {/* Content */}
</div>
```

### "Text with Glow" Pattern
```tsx
<h1 className="text-raido-gold text-glow">
  {text}
</h1>
```

### "Animated Blob Background" Pattern
```tsx
<div className="absolute inset-0 pointer-events-none">
  <div className="absolute top-0 left-1/4 w-96 h-96 
                  bg-raido-gold opacity-5 rounded-full 
                  blur-3xl animate-pulse" />
</div>
```

### "Sequential Animation" Pattern
```tsx
const [phase, setPhase] = useState(0);

useEffect(() => {
  if (phase === 0 && completeA) { setPhase(1); }
  if (phase === 1 && completeB) { setPhase(2); }
}, [completeA, completeB, phase]);

// Show elements based on phase
{phase >= 1 && <Element1 />}
{phase >= 2 && <Element2 />}
```

---

## 15. KEY TAKEAWAYS FOR FENRIR

1. **Gradient Gold Text**: Use `text-raido-gold` + `text-glow` class for authority
2. **Particle System**: Canvas-based > DOM elements for performance
3. **Light Beams**: Simple gradient + blur + animation = high impact
4. **Glowing Borders**: `border border-color border-opacity-20/60` + hover states
5. **Staggered Animations**: Use `animationDelay` to prevent jank
6. **Rune Graphics**: SVG with gradients inside `<defs>` for reusability
7. **Loading Screens**: Combine rotating rings + pulsing blobs + progress bars
8. **Backdrop Blur**: Instead of multiple shadow layers (cheaper on GPU)
9. **Typing Effects**: Hook with state sequencing for interactive reveals
10. **Three-Color Scheme**: Gold primary, Cyan secondary, Deep Blue backgrounds

---

## Installation & Setup

```bash
# Required dependencies
npm install react react-dom typescript tailwindcss postcss autoprefixer lucide-react

# Optional (if using wallet integration)
npm install @solana/wallet-adapter-react

# Tailwind setup
npx tailwindcss init -p
```

Copy `tailwind.config.js`, `src/index.css`, and component files to your Fenrir project to replicate effects.

