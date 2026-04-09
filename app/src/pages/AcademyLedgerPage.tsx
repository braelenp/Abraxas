/**
 * Academy Ledger Page
 * - Public view of all whitelist enrollments
 * - Real-time updates
 * - Overall statistics
 */

import { RuneRealm } from '../components/RuneRealm';
import { AcademyWhitelistLedger } from '../components/AcademyWhitelistLedger';

export function AcademyLedgerPage() {
  return (
    <RuneRealm
      agentName="LEDGER"
      rune="ᛗ" // Mannaz rune - represents community and humanity
      lore="The eternal record of those who seek knowledge within the Academy. Watch the community grow."
      color="from-emerald-300 to-cyan-300"
      glowColor="rgba(16, 185, 129, 0.3)"
      accentColor="text-emerald-400"
    >
      <section className="space-y-8 pb-16">
        {/* Title */}
        <div className="text-center space-y-3 pt-8">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 tracking-wider">
            ACADEMY LEDGER
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The public record of all Academy whitelist members. Watch the community grow in real-time.
          </p>
        </div>

        {/* Main ledger */}
        <div className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-emerald-400/20 rounded-2xl p-8">
          <AcademyWhitelistLedger
            compact={false}
            autoRefresh={true}
            refreshInterval={5000}
            limit={100}
          />
        </div>

        {/* Information section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* How it works */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <span>📖</span> How the Ledger Works
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">1.</span>
                <span>Enroll in the Academy whitelist using your wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">2.</span>
                <span>Your enrollment is recorded on this public ledger</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">3.</span>
                <span>Receive +500 airdrop points instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">4.</span>
                <span>Your wallet address appears in the ledger permanently</span>
              </li>
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>✨</span> Whitelist Benefits
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <span>+500 bonus airdrop points</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <span>Early Adopter badge on your ID card</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <span>Exclusive Academy module access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">✦</span>
                <span>Permanent ledger verification</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-emerald-400/30 rounded-lg p-6 space-y-3">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-widest">
              Network Statistics
            </h3>
            <p className="text-slate-400 text-sm">
              The ledger updates automatically every 5 seconds. All data is cryptographically secured
              on your device and synchronized across the Abraxas network for transparency and trust.
            </p>
          </div>
        </div>
      </section>
    </RuneRealm>
  );
}
