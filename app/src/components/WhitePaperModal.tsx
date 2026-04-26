import { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';
import {
  ABRAXAS_PLAIN_ENGLISH_EXPLAINER,
  ABRAXAS_PRIMARY_VALUE_PROP,
  ABRAXAS_SHORT_FLOW,
  ABRAXAS_SUPPORTING_VALUE_PROP,
} from '../lib/messaging';

interface WhitePaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhitePaperModal({ isOpen, onClose }: WhitePaperModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" />

      {/* Modal container */}
      <div
        className={`relative z-10 w-[95vw] h-[95vh] max-w-4xl rounded-xl border border-purple-400/40 bg-slate-950 overflow-hidden transition-transform duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background effects */}
        <div className="absolute inset-0 -z-20 bg-slate-950" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-purple-900/20 via-slate-950/50 to-slate-950/90" />
        <div className="absolute inset-0 -z-20 opacity-20 mix-blend-screen [background:repeating-linear-gradient(180deg,rgba(148,163,184,0.07)_0px,rgba(148,163,184,0.07)_1px,transparent_2px,transparent_5px)]" />

        {/* Glowing border effect */}
        <div className="absolute inset-0 -z-10 rounded-xl opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-orange-600/20 rounded-xl blur-2xl" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-20 border-b border-purple-400/20 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-300 tracking-tight">
              Abraxas & ABRAX
            </h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
              AI-Powered Asset Management on Solana • Version 3.1 — April 2026
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-2 rounded-lg border border-purple-400/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(95vh-88px)] px-8 py-6 space-y-6 text-slate-200 text-sm leading-relaxed">
          {/* Executive Summary */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wider">Executive Summary</h3>
            <p>
              {ABRAXAS_PRIMARY_VALUE_PROP}
            </p>
            <p>
              {ABRAXAS_SUPPORTING_VALUE_PROP}
            </p>
            <p className="text-slate-300">
              {ABRAXAS_PLAIN_ENGLISH_EXPLAINER}
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-slate-300">• <span className="text-purple-200 font-semibold">Abraxas</span> helps you bring assets online and place them in AI-managed vaults.</li>
              <li className="text-slate-300">• <span className="text-purple-200 font-semibold">ABRAX</span> helps you move money through the system in a simpler way.</li>
            </ul>
            <p>
              <span className="text-orange-300 font-semibold">$ABRA</span> is the main access and utility token that powers the system.
            </p>
            <p className="text-slate-300 text-xs">
              The <span className="text-cyan-300 font-semibold">Species</span> are AI agents that trade, manage risk, and help grow value for you.
            </p>
            <p className="text-slate-300 text-xs">
              <span className="text-green-300 font-semibold">Validators</span> help secure the network and keep the system running.
            </p>
            <p>
              {ABRAXAS_SHORT_FLOW}
            </p>
          </div>

          {/* The Problem */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-red-400 uppercase tracking-wider">The Problem</h3>
            <p className="font-semibold">
              The old system is slow, expensive, censored, and eroding.
            </p>
            <ul className="space-y-1 ml-4 text-slate-300">
              <li>• Assets remain illiquid and trapped in paperwork.</li>
              <li>• Capital movement still relies on intermediaries.</li>
              <li>• Creators and builders lose control.</li>
              <li>• There is no seamless bridge between traditional finance and decentralized finance.</li>
            </ul>
          </div>

          {/* The Solution */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-green-400 uppercase tracking-wider">The Solution</h3>
            <p className="text-slate-300">
              <span className="text-cyan-300 font-semibold">Abraxas helps you bring assets online and manage them with AI.</span>
            </p>
            <p className="text-slate-300">
              <span className="text-purple-300 font-semibold">ABRAX helps you move capital when you need it.</span>
            </p>
            <p>
              Together they give you a simpler way to stay in control while software handles the heavy lifting.
            </p>
          </div>

          {/* How Each Layer Works */}
          <div className="space-y-4 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wider">How Each Layer Works</h3>

            {/* Abraxas - Asset Onboarding & Management */}
            <div className="space-y-3 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">Abraxas – Asset Onboarding & Management</h4>
              <ul className="space-y-2 text-slate-300 text-xs">
                <li><span className="text-cyan-300 font-semibold">Forge:</span> Any asset (real estate, yachts, players, art, dApps, GTA 6 RP servers) is tokenized as a La Casa NFT and deposited into Sophia Vaults.</li>
                <li><span className="text-cyan-300 font-semibold">The Species:</span> Multi-agent collective that collaborates in real time:
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• <span className="text-orange-300">Raido</span> → Spot & prediction market execution using the universal 50Bounce/MBL lane</li>
                    <li>• <span className="text-blue-300">Horizon</span> → Prediction market scouting</li>
                    <li>• <span className="text-blue-300">Tide</span> → Stable de-risk arbitrage (extra yield while protecting capital)</li>
                    <li>• <span className="text-red-300">Circuit</span> → Risk guardian (volatility pause, safety overrides)</li>
                    <li>• <span className="text-purple-300">King AI</span> → Central coordinator and oracle</li>
                  </ul>
                </li>
                <li><span className="text-cyan-300 font-semibold">Foundation Market:</span> DApp equity and tokenized gaming experiences as new RWA asset classes.</li>
                <li><span className="text-cyan-300 font-semibold">Pulse (inside Cadabra):</span> Tokenized GTA 6 RP servers, AI-powered tools, Discord bot kits, clip-to-viral pipelines, and in-game economy trading.</li>
              </ul>
            </div>

            {/* ABRAX - Capital Onboarding & Payment System */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">ABRAX – Capital Onboarding & Payment System</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Sovereign rails for instant P2P transfers, creator tips, royalties, in-app purchases, and vault funding.</li>
                <li>• Global onboarding support (local currency → $ABRA) with priority on major crypto-adopting countries (Japan JPY first).</li>
                <li>• Built-in Jupiter routing and optional liquidity pools.</li>
                <li>• Feels like the new Cash App / PayPal — but fully on-chain and sovereign.</li>
              </ul>
            </div>

            {/* Validators - Decentralized Infrastructure Layer */}
            <div className="space-y-2 bg-slate-900/40 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-bold text-green-300">Validators – Decentralized Infrastructure Layer</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Stake $ABRA or run dedicated nodes that support agent computation, oracle feeds, and prediction market resolution.</li>
                <li>• Earn $ABRA staking rewards + share of protocol fees from trades, ABRAX volume, and ecosystem activity.</li>
              </ul>
            </div>
          </div>

          {/* $ABRA Token */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-orange-300 uppercase tracking-wider">$ABRA – The Single Capital Token</h3>
            <p className="text-slate-300">
              <span className="text-orange-300 font-semibold">Fixed supply: 999,000,000 (no inflation)</span>
            </p>
            <ul className="space-y-2 ml-4 text-slate-300 text-xs">
              <li>• <span className="text-cyan-300 font-semibold">Passive holders</span> → staking yields and airdrops</li>
              <li>• <span className="text-purple-300 font-semibold">Active deployers</span> → minimum threshold into Sophia Vaults for agent-managed returns (market gains + de-risk arbitrage)</li>
              <li>• <span className="text-green-300 font-semibold">Validators</span> → infrastructure and protocol revenue share</li>
            </ul>
            <p className="text-slate-300 italic text-xs mt-2">
              Staked $ABRA and deployed $ABRA are separate. Sole holders do not receive bot profits.
            </p>
          </div>

          {/* Hybrid Devnet / Mainnet Phase */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-cyan-300 uppercase tracking-wider">Hybrid Devnet / Mainnet Phase</h3>
            <p>
              Full Abraxas vision is live in showcase/devnet mode so the community can experience the complete sovereign economy today.
            </p>
            <p>
              $ABRA holders and whitelist members receive priority access as features migrate to mainnet.
            </p>
          </div>

          {/* Roadmap */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6 pb-12">
            <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wider">Roadmap</h3>

            {/* Phase 0 */}
            <div className="space-y-2 bg-slate-900/40 border border-slate-700/50 rounded-lg p-4">
              <h4 className="font-bold text-slate-200">Phase 0 – Current (Live Showcase)</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Abraxas core with Forge, Vaults, Market, Cadabra + Pulse (GTA 6 RP focus), Raido engine, King AI, Circuit</li>
                <li>• Multi-agent Species Collective live</li>
                <li>• Global language support</li>
                <li>• Streamflow-powered staking/locking</li>
                <li>• Sharathon referrals and airdrop points</li>
                <li>• $ABRA utility active on Bags</li>
              </ul>
            </div>

            {/* Phase 1 */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">Phase 1 – Mainnet Activation (Q2 2026)</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Full migration of vaults and agents to mainnet</li>
                <li>• ABRAX sovereign payment rails launch</li>
                <li>• Validator node program and staking rewards</li>
                <li>• Athletic Equity asset class (player tokenization via academies)</li>
                <li>• Expanded global capital onboarding (Japan JPY priority)</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">Phase 2 – Full Sovereign Economy (Q3–Q4 2026)</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Complete ABRAX feature set with embedded commerce</li>
                <li>• Foundation Market expansion (dApp equity + tokenized RP servers)</li>
                <li>• Apex gaming layer + tournaments</li>
                <li>• Full Web5 biological ledger integration via Monolith NFT</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">Phase 3 – Global Scale (2027+)</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• New asset classes and additional agent species</li>
                <li>• Cross-ecosystem integrations</li>
                <li>• Multi-sig institutional custody infrastructure & Sovereign Regime governance</li>
                <li>• The complete parallel financial system</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4 border-t border-slate-700/50 pt-6 pb-24">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-300 uppercase tracking-wider text-center">
              Call to Action
            </h3>
            <p className="text-center text-purple-300 font-semibold">
              This is the next degree.
            </p>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li>• <span className="text-cyan-300 font-semibold">Hold $ABRA</span> for passive participation.</li>
              <li>• <span className="text-purple-300 font-semibold">Deploy $ABRA</span> (minimum threshold) into Sophia Vaults for active agent-managed returns.</li>
              <li>• <span className="text-green-300 font-semibold">Stake or run validator nodes</span> for infrastructure rewards.</li>
            </ul>
            <p className="text-center text-slate-300 italic font-semibold mt-4">
              The species is already alive and compounding.
            </p>
            <p className="text-center text-purple-300 font-semibold">
              Claim your whitelist spot + Discord role to get priority access
            </p>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <button
                onClick={handleClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-purple-400/60 bg-purple-600/20 text-purple-200 font-semibold text-sm hover:bg-purple-600/30 transition-all shadow-[0_0_16px_rgba(153,69,255,0.2)]"
              >
                <span>Join Whitelist</span>
              </button>
              <a
                href="https://discord.gg/JmuXbx3MW"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-indigo-400/60 bg-indigo-600/20 text-indigo-200 font-semibold text-sm hover:bg-indigo-600/30 transition-all shadow-[0_0_16px_rgba(99,102,241,0.2)]"
              >
                <span>Join Discord</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
