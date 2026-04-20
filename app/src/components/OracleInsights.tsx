import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { M1PulldownModule } from './M1PulldownModule';
import { UndercollateralizedLendingModule } from './UndercollateralizedLendingModule';

export function OracleInsights() {
  const [expandedModules, setExpandedModules] = useState<Set<'lending' | 'm1'>>(new Set(['lending']));

  const toggleModule = (module: 'lending' | 'm1') => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(module)) {
      newExpanded.delete(module);
    } else {
      newExpanded.add(module);
    }
    setExpandedModules(newExpanded);
    
    // Prevent scroll jump on collapse/expand
    window.scrollY;
  };

  const modules = [
    {
      id: 'lending' as const,
      icon: '🔓',
      label: 'Undercollateralized Lending',
      color: 'purple',
      component: UndercollateralizedLendingModule,
    },
    {
      id: 'm1' as const,
      icon: '💰',
      label: 'M1 Pulldown',
      color: 'orange',
      component: M1PulldownModule,
    },
  ];

  const getColorClasses = (color: string, isExpanded: boolean) => {
    const baseClasses = `px-4 py-3 sm:py-4 rounded-lg transition-all w-full text-left flex items-center justify-between gap-2 border`;
    
    if (!isExpanded) {
      return `${baseClasses} text-red-300/60 hover:text-red-300/80 border-red-300/10 hover:border-red-300/20`;
    }

    const colorMap: Record<string, string> = {
      purple: 'bg-gradient-to-r from-purple-500/30 to-purple-400/20 border-purple-300/40 text-purple-100 shadow-lg shadow-purple-500/15',
      orange: 'bg-gradient-to-r from-orange-500/30 to-orange-400/20 border-orange-300/40 text-orange-100 shadow-lg shadow-orange-500/15',
      teal: 'bg-gradient-to-r from-teal-500/30 to-teal-400/20 border-teal-300/40 text-teal-100 shadow-lg shadow-teal-500/15',
    };

    return `${baseClasses} ${colorMap[color] || colorMap.purple}`;
  };

  return (
    <div className="space-y-8 px-4">
      {/* Shared Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-red-200 tracking-widest uppercase">Oracle Insights — King AI Categories</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            King AI provides the foresight and intelligence to navigate the next frontier of DeFi. Undercollateralized lending and M1 pulldown mechanisms unlock capital efficiency and sovereign liquidity flows — the true next degree of finance. Powered by <a href="https://worldlabsprotocol.carrd.co/" target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-300 hover:text-orange-200 transition">World Labs Protocol</a> institutional infrastructure.
          </p>
        </div>

        {/* Nested Categories */}
        <div className="space-y-3">
          {modules.map((module) => (
            <div key={module.id} className="border border-red-300/10 rounded-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleModule(module.id)}
                className={getColorClasses(module.color, expandedModules.has(module.id))}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{module.icon}</span>
                  <span className="font-bold uppercase tracking-wider text-sm">{module.label}</span>
                </div>
                <ChevronDown
                  size={20}
                  className={`transition-transform shrink-0 ${expandedModules.has(module.id) ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Category Content (Nested) */}
              {expandedModules.has(module.id) && module.component && (
                <div className="bg-slate-950/30 border-t border-red-300/10 p-4 sm:p-6">
                  {module.component === UndercollateralizedLendingModule && <UndercollateralizedLendingModule />}
                  {module.component === M1PulldownModule && <M1PulldownModule />}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
