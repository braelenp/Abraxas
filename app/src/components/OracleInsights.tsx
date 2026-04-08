import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { M1PulldownModule } from './M1PulldownModule';
import { UndercollateralizedLendingModule } from './UndercollateralizedLendingModule';
import { RaidoDayTradingModule } from './RaidoDayTradingModule';
import { AbraxasAcademy } from './Academy/AbraxasAcademy';

export function OracleInsights() {
  const [activeModule, setActiveModule] = useState<'lending' | 'm1' | 'raido' | 'academy'>('lending');

  return (
    <div className="space-y-8 px-4">
      {/* Shared Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-red-200 tracking-widest uppercase">Oracle Insights — High-Level DeFi Strategies</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            King AI provides the foresight and intelligence to navigate the next frontier of DeFi. Undercollateralized lending and M1 pulldown mechanisms unlock capital efficiency and sovereign liquidity flows — the true next degree of finance. Powered by <a href="https://worldlabsprotocol.carrd.co/" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-300 hover:text-orange-200 transition">World Labs Protocol</a> institutional infrastructure.
          </p>
        </div>

        {/* Module Selector */}
        <div className="flex gap-2 border-b border-red-300/20 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveModule('lending')}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap flex items-center gap-2 ${
              activeModule === 'lending'
                ? 'bg-gradient-to-r from-purple-500/30 to-purple-400/20 border border-purple-300/40 text-purple-100 shadow-lg shadow-purple-500/15'
                : 'text-red-300/60 hover:text-red-300/80 border border-red-300/10 hover:border-red-300/20'
            }`}
          >
            <span className="text-lg">🔓</span>
            <span>Undercollateralized Lending</span>
          </button>

          <button
            onClick={() => setActiveModule('m1')}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap flex items-center gap-2 ${
              activeModule === 'm1'
                ? 'bg-gradient-to-r from-orange-500/30 to-orange-400/20 border border-orange-300/40 text-orange-100 shadow-lg shadow-orange-500/15'
                : 'text-red-300/60 hover:text-red-300/80 border border-red-300/10 hover:border-red-300/20'
            }`}
          >
            <span className="text-lg">💰</span>
            <span>M1 Pulldown</span>
          </button>

          <button
            onClick={() => setActiveModule('raido')}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap flex items-center gap-2 ${
              activeModule === 'raido'
                ? 'bg-gradient-to-r from-teal-500/30 to-teal-400/20 border border-teal-300/40 text-teal-100 shadow-lg shadow-teal-500/15'
                : 'text-red-300/60 hover:text-red-300/80 border border-red-300/10 hover:border-red-300/20'
            }`}
          >
            <span className="text-lg">⚒</span>
            <span>Day Trading & Raido Bot</span>
          </button>

          <button
            onClick={() => setActiveModule('academy')}
            className={`px-4 py-2.5 text-sm font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 whitespace-nowrap flex items-center gap-2 ${
              activeModule === 'academy'
                ? 'bg-gradient-to-r from-purple-500/30 to-purple-400/20 border border-purple-300/40 text-purple-100 shadow-lg shadow-purple-500/15'
                : 'text-red-300/60 hover:text-red-300/80 border border-red-300/10 hover:border-red-300/20'
            }`}
          >
            <span className="text-lg">📚</span>
            <span>Abraxas Academy</span>
          </button>
        </div>
      </div>

      {/* Active Module Content */}
      {activeModule === 'lending' && (
        <div className="animate-in fade-in duration-300">
          <UndercollateralizedLendingModule />
        </div>
      )}

      {activeModule === 'm1' && (
        <div className="animate-in fade-in duration-300">
          <M1PulldownModule />
        </div>
      )}

      {activeModule === 'raido' && (
        <div className="animate-in fade-in duration-300">
          <RaidoDayTradingModule />
        </div>
      )}

      {activeModule === 'academy' && (
        <div className="animate-in fade-in duration-300">
          <AbraxasAcademy />
        </div>
      )}
    </div>
  );
}
