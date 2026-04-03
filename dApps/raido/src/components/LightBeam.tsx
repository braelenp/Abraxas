import React from 'react';

interface LightBeamProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  angle?: number;
  duration?: number;
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
      <div
        className="w-full h-full bg-gradient-to-r from-transparent via-raido-gold to-transparent opacity-30 blur-lg"
        style={{
          animation: `beam ${duration}s ease-in-out infinite`,
        }}
      />
    </div>
  );
};
