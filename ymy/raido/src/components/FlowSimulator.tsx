import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus, Trash2, Play, X } from 'lucide-react';
import { FlowPath, SavedFlow } from '../types';
import { AbraxasFooter } from './AbraxasFooter';

interface FlowSimulatorProps {
  onNavigate?: (section: string) => void;
}

interface SimulationResult {
  isOpen: boolean;
  capitalIn: number;
  expectedReturn: number;
  efficiency: number;
  timeEstimate: string;
}

export const FlowSimulator: React.FC<FlowSimulatorProps> = ({ onNavigate }) => {
  const [flowName, setFlowName] = useState('New Capital Path');
  const [paths, setPaths] = useState<FlowPath[]>([
    {
      id: 'path-1',
      from: 'SOL',
      to: 'USDC',
      amount: 100,
      route: ['Marinade Staking Pool', 'Jupiter Swap', 'Orca Swap'],
      expectedReturn: 125,
      efficiency: 92,
    },
  ]);

  const [totalCapital, setTotalCapital] = useState(100);
  const [savedFlows, setSavedFlows] = useState<SavedFlow[]>([
    {
      id: 'flow-1',
      name: 'SOL Multiplier Strategy',
      description: 'Route SOL through staking → yield generation',
      paths: [],
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: 'flow-2',
      name: 'USDC Arbitrage Path',
      description: 'Multi-pool arbitrage on stablecoin pairs',
      paths: [],
      status: 'completed',
      executedAt: new Date(),
    },
  ]);

  const [simulationResult, setSimulationResult] = useState<SimulationResult>({
    isOpen: false,
    capitalIn: 0,
    expectedReturn: 0,
    efficiency: 0,
    timeEstimate: '',
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const simulateFlow = () => {
    const totalExp = paths.reduce((sum, p) => sum + p.expectedReturn, 0);
    const avgEff = paths.length > 0 ? (paths.reduce((sum, p) => sum + p.efficiency, 0) / paths.length) : 0;
    
    setSimulationResult({
      isOpen: true,
      capitalIn: totalCapital,
      expectedReturn: totalExp,
      efficiency: avgEff,
      timeEstimate: `${Math.floor(Math.random() * 30) + 10} minutes`,
    });

    showToast(`Flow "${flowName}" simulated successfully`, 'success');
  };

  const saveFlow = () => {
    const newFlow: SavedFlow = {
      id: `flow-${Date.now()}`,
      name: flowName,
      description: `${paths.length} step${paths.length !== 1 ? 's' : ''} with ${totalCapital} capital`,
      paths,
      status: 'active',
      createdAt: new Date(),
    };

    setSavedFlows([newFlow, ...savedFlows]);
    showToast(`Flow "${flowName}" saved to My Flows`, 'success');
  };

  const loadFlow = (flow: SavedFlow) => {
    setFlowName(flow.name);
    setPaths(flow.paths.length > 0 ? flow.paths : paths);
    showToast(`Loaded flow: "${flow.name}"`, 'info');
  };

  const deleteFlow = (flowId: string) => {
    setSavedFlows(savedFlows.filter(f => f.id !== flowId));
    showToast('Flow deleted', 'info');
  };

  const addPath = () => {
    const newPath: FlowPath = {
      id: `path-${paths.length + 1}`,
      from: 'SOL',
      to: 'USDC',
      amount: 100,
      route: ['Pool 1', 'Pool 2'],
      expectedReturn: 110,
      efficiency: 85,
    };
    setPaths([...paths, newPath]);
  };

  const removePath = (id: string) => {
    setPaths(paths.filter(p => p.id !== id));
  };

  const updatePath = (id: string, updates: Partial<FlowPath>) => {
    setPaths(paths.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const totalExpectedReturn = paths.reduce((sum, p) => sum + p.expectedReturn, 0);
  const averageEfficiency = paths.length > 0 ? (paths.reduce((sum, p) => sum + p.efficiency, 0) / paths.length) : 0;

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-raido-black via-raido-black to-raido-deep-blue py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-repeat opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(212, 165, 55, 0.1) 1px, rgba(212, 165, 55, 0.1) 2px)' }} />

      {/* Animated glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-raido-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-raido-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <ArrowRight className="w-8 h-8 text-raido-gold" style={{ textShadow: '0 0 12px rgba(212, 165, 55, 0.6)' }} />
            <h2 className="text-3xl md:text-5xl font-black text-raido-gold font-mono uppercase tracking-widest" style={{ textShadow: '0 0 20px rgba(212, 165, 55, 0.5), 0 0 40px rgba(212, 165, 55, 0.25)' }}>
              [FLOW.SIMULATOR]
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg font-mono" style={{ color: '#9099b7' }}>
            &gt; STATUS: Designing multi-step capital flows and movement optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main flow builder */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Flow name input */}
            <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-6 md:p-8">
              <label className="block text-sm font-semibold text-raido-gold mb-2">
                Flow Name
              </label>
              <input
                type="text"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
                className="w-full px-4 py-3 bg-raido-deep-blue bg-opacity-60 border border-raido-gold border-opacity-30 rounded-lg text-white focus:border-raido-gold focus:outline-none transition-all"
              />
            </div>

            {/* Paths list */}
            <div className="space-y-4 md:space-y-6">
              {paths.map((path, idx) => (
                <div
                  key={path.id}
                  className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-raido-gold">
                      Step {idx + 1}
                    </h3>
                    <button
                      onClick={() => removePath(path.id)}
                      className="p-2 text-red-400 hover:bg-red-400 hover:bg-opacity-10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* From asset */}
                    <div>
                      <label className="block text-xs md:text-sm text-gray-400 mb-2">From</label>
                      <input
                        type="text"
                        value={path.from}
                        onChange={(e) => updatePath(path.id, { from: e.target.value })}
                        className="w-full px-3 md:px-4 py-2 bg-raido-deep-blue bg-opacity-60 border border-raido-gold border-opacity-20 rounded-lg text-white text-sm focus:outline-none"
                      />
                    </div>

                    {/* To asset */}
                    <div>
                      <label className="block text-xs md:text-sm text-gray-400 mb-2">To</label>
                      <input
                        type="text"
                        value={path.to}
                        onChange={(e) => updatePath(path.id, { to: e.target.value })}
                        className="w-full px-3 md:px-4 py-2 bg-raido-deep-blue bg-opacity-60 border border-raido-gold border-opacity-20 rounded-lg text-white text-sm focus:outline-none"
                      />
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-xs md:text-sm text-gray-400 mb-2">Amount</label>
                      <input
                        type="number"
                        value={path.amount}
                        onChange={(e) => updatePath(path.id, { amount: parseFloat(e.target.value) })}
                        className="w-full px-3 md:px-4 py-2 bg-raido-deep-blue bg-opacity-60 border border-raido-gold border-opacity-20 rounded-lg text-white text-sm focus:outline-none"
                      />
                    </div>

                    {/* Expected return */}
                    <div>
                      <label className="block text-xs md:text-sm text-gray-400 mb-2">Expected Return</label>
                      <div className="px-3 md:px-4 py-2 bg-raido-deep-blue bg-opacity-60 border border-raido-gold border-opacity-20 rounded-lg text-raido-gold animate-pulse text-sm">
                        {path.expectedReturn.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Route visualization */}
                  <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-raido-gold border-opacity-20">
                    <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4">Route</p>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {path.route.map((pool, i) => (
                        <React.Fragment key={i}>
                          <div className="px-3 md:px-4 py-2 bg-raido-deep-blue bg-opacity-60 border border-raido-gold border-opacity-30 rounded-lg text-xs md:text-sm text-raido-gold">
                            {pool}
                          </div>
                          {i < path.route.length - 1 && (
                            <div className="flex items-center text-raido-gold opacity-60">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Efficiency */}
                  <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-raido-gold border-opacity-20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-400">Route Efficiency</span>
                      <span className="text-sm md:text-base font-bold text-raido-cyan">
                        {path.efficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-raido-deep-blue bg-opacity-40 rounded-full h-2 mt-2">
                      <div
                        className="bg-gradient-to-r from-raido-gold to-raido-gold-light h-2 rounded-full transition-all"
                        style={{ width: `${path.efficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add path button */}
            <button
              onClick={addPath}
              className="w-full py-4 md:py-6 border-2 border-dashed border-raido-gold border-opacity-40 text-raido-gold font-semibold rounded-lg hover:border-opacity-70 hover:bg-raido-gold hover:bg-opacity-10 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Plus className="w-5 h-5" />
              Add Another Step
            </button>

            {/* Execute button */}
            <button
              onClick={simulateFlow}
              className="w-full py-4 md:py-6 bg-gradient-to-r from-raido-gold to-raido-gold-light text-raido-black font-bold rounded-lg hover:shadow-glow-gold transition-all flex items-center justify-center gap-2 text-base md:text-lg"
            >
              <Play className="w-5 h-5" />
              Simulate Flow
            </button>

            {/* Save flow button */}
            <button
              onClick={saveFlow}
              className="w-full py-3 md:py-4 border-2 border-raido-cyan text-raido-cyan font-semibold rounded-lg hover:bg-raido-cyan hover:bg-opacity-10 transition-all"
            >
              💾 Save This Flow
            </button>
          </div>

          {/* Summary sidebar */}
          <div className="space-y-6 md:space-y-8">
            {/* Capital summary */}
            <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-raido-gold mb-6 md:mb-8">
                Flow Summary
              </h3>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <p className="text-xs md:text-sm text-gray-400 mb-2">Total Capital</p>
                  <p className="text-2xl md:text-3xl font-bold text-raido-gold">
                    ${totalCapital.toFixed(2)}
                  </p>
                </div>

                <div className="h-px bg-raido-gold bg-opacity-20" />

                <div>
                  <p className="text-xs md:text-sm text-gray-400 mb-2">Projected Return</p>
                  <p className="text-2xl md:text-3xl font-bold text-raido-cyan">
                    ${totalExpectedReturn.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-xs md:text-sm text-gray-400 mb-2">Net Gain</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-400">
                    +${(totalExpectedReturn - totalCapital).toFixed(2)}
                  </p>
                  <p className="text-xs md:text-sm text-green-400 mt-1">
                    {((((totalExpectedReturn - totalCapital) / totalCapital) * 100)).toFixed(1)}%
                  </p>
                </div>

                <div className="h-px bg-raido-gold bg-opacity-20" />

                <div>
                  <p className="text-xs md:text-sm text-gray-400 mb-2">Avg. Efficiency</p>
                  <p className="text-xl md:text-2xl font-bold text-raido-cyan">
                    {averageEfficiency.toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>

            {/* My Flows section */}
            <div className="bg-raido-deep-blue-accent bg-opacity-40 backdrop-blur border border-raido-gold border-opacity-20 rounded-lg p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-raido-gold mb-6 md:mb-8">
                My Flows
              </h3>

              <div className="space-y-3 md:space-y-4">
                {savedFlows.map((flow) => (
                  <div
                    key={flow.id}
                    onClick={() => loadFlow(flow)}
                    className="p-3 md:p-4 bg-raido-deep-blue bg-opacity-60 rounded-lg border border-raido-gold border-opacity-20 hover:border-opacity-50 hover:bg-opacity-80 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm md:text-base font-semibold text-raido-gold group-hover:text-raido-gold-light transition-colors">
                          {flow.name}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-400 line-clamp-1">
                          {flow.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span
                          className={`text-xs px-2 md:px-3 py-1 rounded-full font-semibold ${
                            flow.status === 'active'
                              ? 'bg-green-400 bg-opacity-20 text-green-400'
                              : flow.status === 'completed'
                              ? 'bg-raido-gold bg-opacity-20 text-raido-gold'
                              : 'bg-gray-500 bg-opacity-20 text-gray-400'
                          }`}
                        >
                          {flow.status}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFlow(flow.id);
                          }}
                          className="p-1 text-red-400 hover:bg-red-400 hover:bg-opacity-20 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Abraxas Connection */}
        <AbraxasFooter />

        {/* Simulation Result Modal */}
        {simulationResult.isOpen && (
          <div className="fixed inset-0 bg-raido-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="bg-raido-deep-blue-accent backdrop-blur border border-raido-gold border-opacity-40 rounded-lg max-w-md w-full p-8 animate-pulse">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-raido-gold">Flow Simulation</h3>
                <button
                  onClick={() => setSimulationResult({ ...simulationResult, isOpen: false })}
                  className="p-2 hover:bg-raido-gold hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-raido-gold" />
                </button>
              </div>

              <div className="space-y-6 mb-8">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Capital Input</p>
                  <p className="text-2xl font-bold text-raido-gold">${simulationResult.capitalIn.toFixed(2)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Expected Return</p>
                  <p className="text-2xl font-bold text-raido-cyan">${simulationResult.expectedReturn.toFixed(2)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Average Efficiency</p>
                  <p className="text-2xl font-bold text-green-400">{simulationResult.efficiency.toFixed(0)}%</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-2">Estimated Time</p>
                  <p className="text-xl font-bold text-yellow-400">{simulationResult.timeEstimate}</p>
                </div>

                <div className="h-px bg-raido-gold bg-opacity-20" />

                <div>
                  <p className="text-sm text-gray-400 mb-2">Projected Gain</p>
                  <p className="text-2xl font-bold text-green-400">
                    +${(simulationResult.expectedReturn - simulationResult.capitalIn).toFixed(2)}
                  </p>
                  <p className="text-xs text-green-400 mt-1">
                    {(((simulationResult.expectedReturn - simulationResult.capitalIn) / simulationResult.capitalIn) * 100).toFixed(1)}% ROI
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSimulationResult({ ...simulationResult, isOpen: false });
                  showToast('Simulation ready to execute', 'success');
                }}
                className="w-full py-3 bg-raido-gold text-raido-black font-bold rounded-lg hover:bg-raido-gold-light transition-all"
              >
                ✓ Ready to Execute
              </button>
            </div>
          </div>
        )}

        {/* Toast notification */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg text-white font-semibold animate-pulse ${
              toast.type === 'success'
                ? 'bg-green-500 bg-opacity-80'
                : 'bg-raido-gold bg-opacity-80'
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </section>
  );
};
