import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, AlertTriangle, Zap, Cpu, BarChart3, Eye, Zap as ZapIcon, ArrowRight } from 'lucide-react';
import { useAbraxas } from '../providers/AbraxasProvider';
import { RuneRealm } from '../components/RuneRealm';

const RUNE_CONFIG = {
  rune: 'ᚦ',
  runeName: 'Thurisaz',
  runeEssence: 'Thorn · Unbreakable Defense',
  agentName: 'AEGIS',
  lore: "Thurisaz is the thorn of Thor, the force that stops chaos in its path. Aegis is Circuit's autonomous defense layer — the immune system of Abraxas itself. While other protocols react after exploits like Drift, Circuit monitors in real time and acts before damage spreads. Not retaliation. Prevention.",
  ctaLabel: 'Activate Circuit',
  coreGlow: '52, 211, 153',
  fireGlow: '34, 211, 238',
  accentClass: 'text-emerald-300',
} as const;

export function CircuitPage() {
  const location = useLocation();
  const { vaults, runCircuitCheck } = useAbraxas();
  const [vaultId, setVaultId] = useState(vaults[0]?.id ?? '');
  const [priceSpeedBps, setPriceSpeedBps] = useState(450);
  const [liquidityDrainBps, setLiquidityDrainBps] = useState(350);
  const [activitySpikeBps, setActivitySpikeBps] = useState(500);
  const [lastAction, setLastAction] = useState('Not evaluated yet');

  useEffect(() => {
    if (!vaultId && vaults.length > 0) {
      setVaultId(vaults[0].id);
      return;
    }

    if (vaultId && !vaults.some((vault) => vault.id === vaultId) && vaults.length > 0) {
      setVaultId(vaults[0].id);
    }
  }, [vaultId, vaults]);

  const selectedVault = useMemo(() => vaults.find((vault) => vault.id === vaultId), [vaults, vaultId]);

  const onEvaluate = (event: FormEvent) => {
    event.preventDefault();
    const action = runCircuitCheck(vaultId, { priceSpeedBps, liquidityDrainBps, activitySpikeBps });
    setLastAction(`${action} • ${new Date().toLocaleTimeString()}`);
  };

  return (
    <RuneRealm {...RUNE_CONFIG}>
    <section className="space-y-6">
      {/* Welcome Header */}
      <div className="glow-panel rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-6 backdrop-blur">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="h-6 w-6 text-emerald-300" />
          <h1 className="text-2xl font-bold text-emerald-200">🛡️ Circuit: Your Financial Shield</h1>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">
          Circuit is your personal insurance system. It watches your money 24/7 and automatically protects it from market dangers — like the Drift hack that cost others millions. With Circuit, you sleep easy.
        </p>
      </div>

      {/* Why Circuit Matters */}
      <div className="glow-panel rounded-2xl border border-emerald-300/20 bg-slate-900/60 p-5 space-y-4">
        <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
          <Eye size={20} /> What Circuit Protects You From
        </h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-slate-100">Market Crashes</p>
              <p className="text-xs text-slate-400">Sudden price drops that could wipe out investments</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">💨</span>
            <div>
              <p className="font-semibold text-slate-100">Money Drains</p>
              <p className="text-xs text-slate-400">Unusual amounts leaving the system too fast</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold text-slate-100">Targeted Attacks</p>
              <p className="text-xs text-slate-400">Hackers trying to exploit the system (like Drift)</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold text-slate-100">Bad Collateral</p>
              <p className="text-xs text-slate-400">Your vault's health gets monitored constantly</p>
            </div>
          </div>
        </div>
      </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-emerald-300 tracking-widest uppercase">Benefits to $ABRA Stakers & Sophia Vault Members</h3>
          
          <div className="grid gap-3">
            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/35 p-4">
              <p className="font-bold text-emerald-300 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <Shield size={16} /> Capital Protection
              </p>
              <p className="text-xs text-slate-300">Your vault stays safe. No more watching exploits drain $100M+ before governance votes.</p>
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/35 p-4">
              <p className="font-bold text-emerald-300 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <BarChart3 size={16} /> Yield Continuity
              </p>
              <p className="text-xs text-slate-300">Even during market chaos, Circuit preserves your position and keeps yield-generating flows active where safe.</p>
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/35 p-4">
              <p className="font-bold text-emerald-300 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <Cpu size={16} /> Autonomous Intelligence
              </p>
              <p className="text-xs text-slate-300">Circuit + Sophia agents act at machine speed. No human delays. No liquidation cascades. Prevention, not reaction.</p>
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/35 p-4">
              <p className="font-bold text-emerald-300 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <Zap size={16} /> Institutional Grade
              </p>
              <p className="text-xs text-slate-300">Built on World Labs Protocol infrastructure. The same defense mechanisms used by RWA institutions and family offices.</p>
            </div>
          </div>
        </div>

      {/* Test Circuit Responses */}
      <div className="space-y-4 border-t border-emerald-300/20 pt-6">
        <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
          <Zap size={20} /> How Circuit Responds
        </h3>
        <p className="text-sm text-slate-300">See how Circuit protects your vault when danger strikes.</p>

        <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-4 backdrop-blur">
          <form onSubmit={onEvaluate} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Choose Your Vault</label>
              <select
                value={vaultId}
                onChange={(event) => setVaultId(event.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              >
                {vaults.length === 0 ? (
                  <option>No vaults available</option>
                ) : (
                  vaults.map((vault) => (
                    <option key={vault.id} value={vault.id}>
                      {vault.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Price Moving Too Fast?</label>
              <p className="text-xs text-slate-400 mb-2">This detects sudden price movements (like a crash)</p>
              <input
                type="number"
                value={priceSpeedBps}
                onChange={(event) => setPriceSpeedBps(Number(event.target.value))}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
              <p className="text-xs text-emerald-300/80 mt-1">Alert at 500, Protection at 1000</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">People Withdrawing Too Much?</label>
              <p className="text-xs text-slate-400 mb-2">This detects money leaving the system too fast</p>
              <input
                type="number"
                value={liquidityDrainBps}
                onChange={(event) => setLiquidityDrainBps(Number(event.target.value))}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
              <p className="text-xs text-emerald-300/80 mt-1">Alert at 600, Protection at 900</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">Unusual Activity Spike?</label>
              <p className="text-xs text-slate-400 mb-2">This detects weird trading patterns</p>
              <input
                type="number"
                value={activitySpikeBps}
                onChange={(event) => setActivitySpikeBps(Number(event.target.value))}
                className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100"
              />
              <p className="text-xs text-emerald-300/80 mt-1">Protection triggered at 1200</p>
            </div>

            <button type="submit" className="ui-action w-full rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3 py-3 text-sm font-semibold text-slate-950 transition">
              🚨 Simulate Danger & See Response
            </button>
          </form>
        </article>

        <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-4 text-sm backdrop-blur">
          <div className="space-y-2">
            <p><span className="font-semibold text-emerald-300">Your Vault:</span> {selectedVault?.name ?? 'Choose one above'}</p>
            <p><span className="font-semibold text-emerald-300">Last Check:</span> {lastAction}</p>
            <p className="text-slate-400 text-xs">When Circuit detects danger, it instantly pauses risky trading and moves your money to safety.</p>
          </div>
        </article>
      </div>
      </section>
      
      {/* Bottom call to action */}
      <div className="flex justify-center px-4 pb-4">
        <a
          href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 rounded-lg border border-emerald-400/60 bg-gradient-to-r from-emerald-500/30 to-cyan-500/25 px-8 py-3 text-sm font-bold text-emerald-200 shadow-[0_0_16px_rgba(52,211,153,0.25)] transition hover:shadow-[0_0_24px_rgba(52,211,153,0.4)] hover:border-emerald-300/80"
        >
          <Shield size={18} className="text-emerald-400" />
          Get Protected: Buy $ABRA Now
          <ArrowRight size={16} />
        </a>
      </div>
    </RuneRealm>
  );
}
