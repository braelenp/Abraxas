import { useState } from 'react';
import { X } from 'lucide-react';

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
              White Paper & Roadmap — Version 1.0 — March 2026
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
              Abraxas is the first complete sovereign economy on Solana.
            </p>
            <p>
              It is built as two symbiotic layers:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="text-slate-300">• <span className="text-purple-200 font-semibold">Abraxas</span> handles onboarding assets (tokenization, La Casa NFTs, Sophia vaults, the Species agents).</li>
              <li className="text-slate-300">• <span className="text-purple-200 font-semibold">ABRAX</span> handles onboarding capital (instant sovereign payments, tips, royalties, in-app commerce).</li>
            </ul>
            <p>
              <span className="text-orange-300 font-semibold">$ABRA</span> is the single native capital token that powers the entire system.
            </p>
            <p>
              We are currently in hybrid devnet/mainnet phase. $ABRA holders and whitelist members receive priority access to every new mainnet feature.
            </p>
          </div>

          {/* The Problem */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wider">The Problem</h3>
            <p>
              Value is eroding in the old system. Assets are illiquid and trapped in paperwork. Capital movement is slow, expensive, and censored. Creators and builders lose control to intermediaries.
            </p>
          </div>

          {/* The Solution */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wider">The Solution</h3>
            <p className="text-slate-300">
              <span className="text-cyan-300 font-semibold">Abraxas brings the assets.</span>
            </p>
            <p className="text-slate-300">
              <span className="text-purple-300 font-semibold">ABRAX brings the capital.</span>
            </p>
            <p>
              Together they create a closed-loop sovereign economy where value is tokenized, protected, grown, and moved on your terms.
            </p>
          </div>

          {/* How Each Layer Works */}
          <div className="space-y-4 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wider">How Each Layer Works</h3>

            {/* Abraxas - Asset Onboarding Engine */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">Abraxas – Asset Onboarding Engine</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Forge hub where any asset becomes a La Casa NFT</li>
                <li>• Sophia vaults with autonomous AI agents (the Species)</li>
                <li>• Circuit defense layer</li>
                <li>• King AI oracle</li>
                <li>• Foundation Market (dApp equity as tokenized RWA)</li>
              </ul>
            </div>

            {/* ABRAX - Capital Onboarding & Payment System */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">ABRAX – Capital Onboarding & Payment System</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Sovereign payment rails built natively on Solana</li>
                <li>• Instant P2P transfers, creator tips, royalties, in-app purchases</li>
                <li>• Built-in Jupiter routing</li>
                <li>• Optional liquidity pools and staking perks for $ABRA holders</li>
                <li>• Designed to feel like the new Cash App / PayPal — but fully on-chain and sovereign</li>
              </ul>
            </div>
          </div>

          {/* $ABRA Token */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-orange-300 uppercase tracking-wider">$ABRA Token — The Lifeblood</h3>
            <p>
              $ABRA is used for all payments, tips, royalties, vault deposits, and staking.
            </p>
            <p>
              <span className="text-orange-300 font-semibold">Fixed supply: 999,000,000. No inflation.</span>
            </p>
          </div>

          {/* Hybrid Devnet / Mainnet Phase */}
          <div className="space-y-3 border-t border-slate-700/50 pt-6">
            <h3 className="text-lg font-bold text-cyan-300 uppercase tracking-wider">Hybrid Devnet / Mainnet Phase</h3>
            <p>
              Full Abraxas vision is live in showcase/devnet mode. $ABRA holders get priority access as features migrate to mainnet.
            </p>
          </div>

          {/* Roadmap */}
          <div className="space-y-4 border-t border-slate-700/50 pt-6 pb-12">
            <h3 className="text-lg font-bold text-purple-300 uppercase tracking-wider">Roadmap</h3>

            {/* Phase 0 */}
            <div className="space-y-2 bg-slate-900/40 border border-slate-700/50 rounded-lg p-4">
              <h4 className="font-bold text-slate-200">Phase 0 — Current (Live Showcase)</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Abraxas core, Cadabra + Pulse, Raido trading engine, Monolith gate, Sharathon</li>
              </ul>
            </div>

            {/* Phase 1 */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">Phase 1 — Mainnet Activation (Q2 2026)</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Full vault migration</li>
                <li>• ABRAX payment rails launch</li>
                <li>• Expanded tokenization flows</li>
                <li>• Academy curriculum + journal</li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">Phase 2 — Full Sovereign Economy (Q3–Q4 2026)</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Complete ABRAX feature set</li>
                <li>• Foundation Market expansion</li>
                <li>• Apex gaming layer</li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="space-y-2 bg-slate-900/40 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-bold text-purple-300">Phase 3 — Global Scale (2027+)</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                <li>• Cross-ecosystem integrations</li>
                <li>• The complete parallel financial system</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-4 border-t border-slate-700/50 pt-6 pb-24 text-center">
            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-orange-300 uppercase tracking-wider">
              Call to Action
            </h3>
            <p className="text-purple-300 font-semibold">
              This is the next degree.
            </p>
            <p>
              <span className="text-cyan-300 font-semibold">Abraxas brings the assets.</span> <span className="text-purple-300 font-semibold">ABRAX brings the capital.</span>
            </p>
            <p className="text-slate-400 italic">
              Claim your whitelist spot + Discord role at: Discord Community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
