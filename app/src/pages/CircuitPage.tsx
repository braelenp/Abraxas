import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, AlertTriangle, Zap, Cpu, BarChart3, Eye, Zap as ZapIcon, ArrowRight } from 'lucide-react';
import { useAbraxas } from '../providers/AbraxasProvider';
import { RuneRealm } from '../components/RuneRealm';

function TypingReveal({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let idx = 0;
    const startTime = setTimeout(() => {
      const interval = setInterval(() => {
        if (idx < text.length) {
          setDisplayed(text.slice(0, ++idx));
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTime);
    };
  }, [text, delay, speed]);

  return (
    <span className="font-mono text-2xl font-bold text-emerald-200 tracking-wide">
      {displayed}
      {!done && <span className="animate-pulse ml-1">∷</span>}
    </span>
  );
}

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

  // Reset state when navigating to the Circuit page
  useEffect(() => {
    if (location.pathname === '/app/circuit') {
      setPriceSpeedBps(450);
      setLiquidityDrainBps(350);
      setActivitySpikeBps(500);
      setLastAction('Not evaluated yet');
      if (vaults.length > 0) {
        setVaultId(vaults[0].id);
      }
    }
  }, [location.pathname, vaults]);

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
    <section className="space-y-4">
      {/* HERO SECTION */}
      <article className="glow-panel rounded-3xl border border-emerald-300/20 bg-[linear-gradient(140deg,rgba(15,23,42,0.9),rgba(5,46,22,0.75),rgba(56,189,248,0.12))] p-4 backdrop-blur space-y-4">
        <div className="font-mono">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">&gt; [CIRCUIT] AUTONOMOUS_DEFENSE_LAYER</p>
          <h2 className="mt-2 text-sm font-bold text-emerald-200 tracking-widest uppercase">THE_IMMUNE_SYSTEM | AEGIS_ACTIVE</h2>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-300/90">
            Circuit is the autonomous immune system of Abraxas. While other protocols are caught flat-footed by exploits like Drift, Circuit monitors real-time liquidity flows, collateral health, and market impact signals — then acts before damage spreads. Every vault. Every $ABRA holder. Protected.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs text-slate-200/90">
          <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/40 px-3 py-3">
            <p className="text-slate-500">Response latency</p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">Sub-second</p>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/40 px-3 py-3">
            <p className="text-slate-500">Protection coverage</p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">100%</p>
          </div>
        </div>
      </article>

      {/* BUY $ABRA - TOP CTA */}
      <div className="flex justify-center px-4">
        <a
          href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/60 bg-gradient-to-r from-emerald-500/30 to-cyan-500/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-emerald-200 shadow-[0_0_16px_rgba(52,211,153,0.25)] transition hover:shadow-[0_0_24px_rgba(52,211,153,0.4)] hover:border-emerald-300/80"
        >
          <Shield size={18} className="text-emerald-400" />
          Buy $ABRA Token
          <ArrowRight size={16} />
        </a>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-4 space-y-6">
        {/* Welcome Header */}
        <div className="space-y-4">
          <TypingReveal text="Welcome to the next degree." delay={200} speed={60} />
          <h2 className="text-xl font-bold text-emerald-200 tracking-widest uppercase">Circuit — The Immune System</h2>
          <p className="text-sm leading-relaxed text-slate-300/90">
            Circuit is not a dashboard. It is the active immune system defending Abraxas and every $ABRA staker from real-world DeFi attacks. Drift, Luna-style cascade failures, liquidity drains — Circuit sees them coming and stops them before they happen.
          </p>
        </div>

        {/* REAL-TIME MONITORING SECTION */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-300/30 bg-gradient-to-br from-emerald-500/8 via-slate-900/80 to-slate-900/60 p-8">
          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-emerald-300 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Eye size={20} className="text-emerald-400" /> Real-Time Monitoring
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Circuit watches every second. Liquidity pools. Collateral ratios. Market impact signals. Price speed across 50ms windows. Sophia vault composition. When anomalies spike above safety thresholds, Circuit doesn't wait for governance votes or liquidation auctions — it acts immediately.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="border-l-2 border-emerald-400/40 pl-3 py-2">
                <p className="font-bold uppercase tracking-widest text-emerald-300 mb-1">Liquidity Drain Detection</p>
                <p className="text-slate-400">Tracks withdrawal velocity across all connected pools</p>
              </div>
              <div className="border-l-2 border-emerald-400/40 pl-3 py-2">
                <p className="font-bold uppercase tracking-widest text-emerald-300 mb-1">Price Speed Analysis</p>
                <p className="text-slate-400">50ms window anomaly detection prevents flash crashes</p>
              </div>
              <div className="border-l-2 border-emerald-400/40 pl-3 py-2">
                <p className="font-bold uppercase tracking-widest text-emerald-300 mb-1">Collateral Health</p>
                <p className="text-slate-400">Real-time LTV & liquidation risk monitoring</p>
              </div>
              <div className="border-l-2 border-emerald-400/40 pl-3 py-2">
                <p className="font-bold uppercase tracking-widest text-emerald-300 mb-1">Activity Spike Detection</p>
                <p className="text-slate-400">Unusual volume & position changes trigger alerts</p>
              </div>
            </div>
          </div>
        </div>

        {/* AUTOMATIC PROTECTIVE RESPONSES SECTION */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-300/30 bg-gradient-to-br from-cyan-500/8 via-slate-900/80 to-slate-900/60 p-8">
          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-cyan-300 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Zap size={20} className="text-cyan-400" /> Automatic Protective Responses
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                When Circuit detects danger, it doesn't send a notification email. It acts. Risky flows are paused. Capital moves to stables. Sophia agents redirect yield. Vault members get real-time alerts. All before exploiters can extract value.
              </p>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-cyan-300/20 bg-slate-950/40 p-3">
                <p className="font-bold text-cyan-300 text-xs uppercase tracking-widest mb-2">⏸ Flow Pause Protocol</p>
                <p className="text-xs text-slate-400">Risky transactions suspended when price volatility exceeds safety bands. Reactivates when conditions normalize.</p>
              </div>
              <div className="rounded-lg border border-cyan-300/20 bg-slate-950/40 p-3">
                <p className="font-bold text-cyan-300 text-xs uppercase tracking-widest mb-2">💰 Capital Redistribution</p>
                <p className="text-xs text-slate-400">When liquidity drain is imminent, vault collateral automatically moves to stable asset positions, preserving capital.</p>
              </div>
              <div className="rounded-lg border border-cyan-300/20 bg-slate-950/40 p-3">
                <p className="font-bold text-cyan-300 text-xs uppercase tracking-widest mb-2">🎯 Sophia Agent Alert</p>
                <p className="text-xs text-slate-400">King AI and all Sophia vault agents are notified in real-time. Automated rebalancing cascades across the species.</p>
              </div>
              <div className="rounded-lg border border-cyan-300/20 bg-slate-950/40 p-3">
                <p className="font-bold text-cyan-300 text-xs uppercase tracking-widest mb-2">🔔 Member Notification</p>
                <p className="text-xs text-slate-400">Every $ABRA holder and vault member receives real-time protection alerts. Your capital is defended. Period.</p>
              </div>
            </div>
          </div>
        </div>

        {/* HOW CIRCUIT PREVENTS DRIFT-LIKE EXPLOITS */}
        <div className="relative overflow-hidden rounded-2xl border border-orange-300/30 bg-gradient-to-br from-orange-500/8 via-slate-900/80 to-slate-900/60 p-8">
          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-orange-300 tracking-widest uppercase mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-400" /> Case Study: The Drift Exploit
              </h3>
              <p className="text-sm leading-relaxed text-slate-300">
                Drift's vulnerability allowed liquidators to manipulate positions through cascading collateral damage. Without Circuit, Abraxas would suffer the same fate. With Circuit, here's what happens:
              </p>
            </div>

            <div className="space-y-3 border-l-4 border-orange-400/40 pl-6">
              <div>
                <p className="font-bold text-orange-300 text-xs uppercase tracking-widest mb-1">Second 0 — Anomaly Detected</p>
                <p className="text-xs text-slate-300">Circuit spots the liquidation cascade beginning. Price speed spikes 5,000 bps. Activity volume jumps 1,200%.</p>
              </div>
              <div>
                <p className="font-bold text-orange-300 text-xs uppercase tracking-widest mb-1">Second 0.3 — Flow Pause Activated</p>
                <p className="text-xs text-slate-300">All risky liquidation flows are paused. No more cascading margin calls. The attack vector is blocked.</p>
              </div>
              <div>
                <p className="font-bold text-orange-300 text-xs uppercase tracking-widest mb-1">Second 0.6 — Capital Redistributed</p>
                <p className="text-xs text-slate-300">Vault collateral automatically moves to stables. Position sizes rebalance. $ABRA holders' exposure is contained.</p>
              </div>
              <div>
                <p className="font-bold text-orange-300 text-xs uppercase tracking-widest mb-1">Second 1.0 — All Clear</p>
                <p className="text-xs text-slate-300">Circuit evaluates if conditions have stabilized. Flows reactivate cautiously. The exploit never had a foothold.</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 italic border-t border-orange-300/20 pt-4">
              Drift: $100M+ exploited. Luna: $40B evaporated. Abraxas + Circuit: Protected before damage spreads.
            </p>
          </div>
        </div>

        {/* BENEFITS SECTION */}
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

        {/* CIRCUIT SAFETY TRIGGER SIMULATOR */}
        <div className="space-y-4 border-t border-emerald-300/20 pt-6">
          <h3 className="text-lg font-bold text-emerald-300 tracking-widest uppercase">Interactive: Test Circuit Protection</h3>
          <p className="text-xs text-slate-300">Simulate attack scenarios and watch Circuit respond.</p>

          <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-4 backdrop-blur">
            <form onSubmit={onEvaluate} className="space-y-3">
              <select
                value={vaultId}
                onChange={(event) => setVaultId(event.target.value)}
                className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100"
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

              <div>
                <label className="block text-xs text-slate-300/80 mb-1 font-mono">Price Speed (bps) — Flash crash detection</label>
                <input
                  type="number"
                  value={priceSpeedBps}
                  onChange={(event) => setPriceSpeedBps(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                />
                <p className="text-[10px] text-slate-500 mt-1">Threshold: 500 bps warning, 1000 bps protection</p>
              </div>

              <div>
                <label className="block text-xs text-slate-300/80 mb-1 font-mono">Liquidity Drain (bps) — Withdrawal velocity</label>
                <input
                  type="number"
                  value={liquidityDrainBps}
                  onChange={(event) => setLiquidityDrainBps(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                />
                <p className="text-[10px] text-slate-500 mt-1">Threshold: 600 bps warning, 900 bps protection</p>
              </div>

              <div>
                <label className="block text-xs text-slate-300/80 mb-1 font-mono">Activity Spike (bps) — Unusual volume</label>
                <input
                  type="number"
                  value={activitySpikeBps}
                  onChange={(event) => setActivitySpikeBps(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                />
                <p className="text-[10px] text-slate-500 mt-1">Threshold: 1200 bps protection</p>
              </div>

              <button type="submit" className="ui-action w-full rounded-xl bg-emerald-300 px-3 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-200 transition">
                Simulate Attack Scenario
              </button>
            </form>
          </article>

          <article className="glow-panel rounded-2xl border border-emerald-300/20 bg-slate-900/75 p-4 text-xs backdrop-blur">
            <div className="space-y-2">
              <p><span className="font-bold text-emerald-300">Protected Vault:</span> {selectedVault?.name ?? 'N/A'}</p>
              <p><span className="font-bold text-emerald-300">Last Circuit Action:</span> {lastAction}</p>
              <p className="text-slate-400">When alert thresholds are exceeded, Circuit automatically pauses risky flows and protects vault collateral.</p>
            </div>
          </article>
        </div>
      </div>

      {/* BUY $ABRA - BOTTOM CTA */}
      <div className="flex justify-center px-4 pb-4">
        <a
          href="https://bags.fm/5c1FHZj36pkA3cpXcyZxDhRmQyxzUqMNQn8K5neDBAGS"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/60 bg-gradient-to-r from-emerald-500/30 to-cyan-500/25 px-8 py-4 text-sm font-bold uppercase tracking-wider text-emerald-200 shadow-[0_0_16px_rgba(52,211,153,0.25)] transition hover:shadow-[0_0_24px_rgba(52,211,153,0.4)] hover:border-emerald-300/80"
        >
          <Shield size={18} className="text-emerald-400" />
          Protect with $ABRA
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
    </RuneRealm>
  );
}
