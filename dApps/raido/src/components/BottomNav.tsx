import React from 'react';
import { Activity, Lock, Zap, Waves, Wind } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: Activity, rune: 'ᚲ' },
    { id: 'hunt', name: 'Hunt', icon: Lock, rune: 'ᚱ' },
    { id: 'flow', name: 'Flow', icon: Zap, rune: 'ᛋ' },
    { id: 'market', name: 'Market', icon: Waves, rune: '⇄' },
    { id: 'tidepool', name: 'Tide', icon: Wind, rune: '✦' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-raido-black to-raido-black/80 border-t border-raido-gold/20 backdrop-blur-sm z-50">
      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(212, 165, 55, 0.03) 0px, rgba(212, 165, 55, 0.03) 1px, transparent 1px, transparent 2px)',
        }}
      />

      <div className="relative grid grid-cols-5 gap-0 overflow-x-auto px-2 py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center py-2 px-1 transition-all duration-300 ${
              activeTab === tab.id
                ? 'opacity-100'
                : 'opacity-50 hover:opacity-75'
            }`}
          >
            {/* Glow background for active tab */}
            {activeTab === tab.id && (
              <div 
                className="absolute inset-0 bg-raido-gold/10 rounded-lg"
                style={{
                  boxShadow: 'inset 0 0 12px rgba(212, 165, 55, 0.2)',
                }}
              />
            )}
            
            <div className="relative z-10 flex flex-col items-center gap-1">
              {/* Rune */}
              <span 
                className="text-lg font-black"
                style={{ 
                  color: '#d4af37',
                  textShadow: '0 0 8px rgba(212, 165, 55, 0.6)',
                }}
              >
                {tab.rune}
              </span>
              
              {/* Label */}
              <span 
                className="text-xs font-mono font-bold uppercase tracking-wider"
                style={{ 
                  color: '#d4af37',
                  textShadow: '0 0 4px rgba(212, 165, 55, 0.4)',
                }}
              >
                {tab.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
