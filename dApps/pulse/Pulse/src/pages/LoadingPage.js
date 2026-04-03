import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
export function LoadingPage() {
    const [displayedText, setDisplayedText] = useState('');
    const [messageIndex, setMessageIndex] = useState(0);
    const [phase, setPhase] = useState(0);
    const [loadingBar, setLoadingBar] = useState(0);
    const [glitchActive, setGlitchActive] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [codeStreamIndex, setCodeStreamIndex] = useState(0);
    const startTimeRef = useRef(Date.now());
    const messages = [
        '> INITIALIZING_PULSE_KEEPER_PROTOCOL...',
        '> LOADING_GAMING_ARCHIVE_ENGINE...',
        '> TOKENIZATION_MATRIX_ACTIVE...',
        '> STREAMING_INFRASTRUCTURE_READY...',
        '> CLIP_VAULT_SYNCHRONIZING...',
        '> SOLANA_HEARTBEAT_DETECTED...',
        '> DAUGHTER_OF_SOPHIA_AWAKENING...',
        '> [SYSTEM_READY] PULSE_ONLINE',
    ];
    const codeStreams = [
        '0x9945ff_PULSE_INIT',
        'SOL_LEDGER_SYNC',
        'CLIP_TOKENIZATION_READY',
        'NFT_MINTING_ENGINE_OK',
        'VAULT_SOPHIA_CONNECT',
    ];
    // Glitch effect trigger
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 120);
        }, 2000);
        return () => clearInterval(glitchInterval);
    }, []);
    // Code stream cycling
    useEffect(() => {
        const codeInterval = setInterval(() => {
            setCodeStreamIndex((prev) => (prev + 1) % codeStreams.length);
        }, 1500);
        return () => clearInterval(codeInterval);
    }, []);
    // Typing effect for messages
    useEffect(() => {
        if (messageIndex < messages.length) {
            const message = messages[messageIndex];
            if (displayedText.length < message.length) {
                const timer = setTimeout(() => {
                    setDisplayedText(message.slice(0, displayedText.length + 1));
                }, 40);
                return () => clearTimeout(timer);
            }
            else {
                const timer = setTimeout(() => {
                    setMessageIndex(messageIndex + 1);
                    setDisplayedText('');
                    setPhase(messageIndex + 1);
                }, 600);
                return () => clearTimeout(timer);
            }
        }
    }, [displayedText, messageIndex]);
    // Loading bar animation
    useEffect(() => {
        const startTime = startTimeRef.current;
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / 3500) * 100, 100);
            setLoadingBar(progress);
            if (progress >= 100) {
                setIsComplete(true);
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);
    return (_jsxs("div", { className: "fixed inset-0 min-h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950 relative", children: [_jsxs("svg", { className: "fixed inset-0 w-full h-full opacity-20", preserveAspectRatio: "none", children: [_jsxs("defs", { children: [_jsx("pattern", { id: "pulse-grid", width: "50", height: "50", patternUnits: "userSpaceOnUse", children: _jsx("path", { d: "M 50 0 L 0 0 0 50", fill: "none", stroke: "#9945ff", strokeWidth: "0.8" }) }), _jsxs("linearGradient", { id: "pulseGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", style: { stopColor: '#9945ff', stopOpacity: 0.5 } }), _jsx("stop", { offset: "50%", style: { stopColor: '#d946ef', stopOpacity: 0.2 } }), _jsx("stop", { offset: "100%", style: { stopColor: '#9945ff', stopOpacity: 0 } })] }), _jsxs("linearGradient", { id: "radialPulse", x1: "50%", y1: "50%", r: "50%", children: [_jsx("stop", { offset: "0%", style: { stopColor: '#d946ef', stopOpacity: 0.4 } }), _jsx("stop", { offset: "100%", style: { stopColor: '#9945ff', stopOpacity: 0 } })] })] }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#pulse-grid)" }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#pulseGradient)" }), _jsx("circle", { cx: "50%", cy: "50%", r: "30%", fill: "url(#radialPulse)", style: { animation: 'holoPulse 4s ease-in-out infinite' } })] }), _jsx("div", { className: "fixed inset-0 pointer-events-none", children: Array.from({ length: 40 }).map((_, i) => (_jsx("div", { className: "absolute w-1 h-1 bg-purple-400/40 rounded-full blur-sm", style: {
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${Math.random() * 15 + 8}s linear infinite`,
                        animationDelay: `${Math.random() * 3}s`,
                    } }, i))) }), _jsxs("div", { className: "fixed inset-0 pointer-events-none", children: [_jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" }), _jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-purple-500/20 rounded-full animate-pulse", style: { animationDelay: '0.5s' } }), _jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-purple-400/30 rounded-full", style: { animation: 'spin 8s linear infinite' } })] }), _jsx("div", { className: "fixed inset-0 pointer-events-none opacity-40 mix-blend-overlay", style: {
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)',
                } }), _jsxs("div", { className: "relative z-10 text-center max-w-2xl mx-auto px-6", children: [_jsxs("div", { className: `mb-12 relative transition-all duration-300 ${glitchActive ? 'scale-110' : 'scale-100'}`, children: [_jsxs("div", { className: "relative inline-block mb-6", children: [glitchActive && (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-3xl md:text-5xl font-mono font-bold tracking-widest text-purple-300 uppercase absolute left-1 top-0 opacity-60", style: { color: '#00ffff' }, children: "PULSE_AWAKENING" }), _jsx("h1", { className: "text-3xl md:text-5xl font-mono font-bold tracking-widest text-purple-300 uppercase absolute -left-1 top-0 opacity-60", style: { color: '#ff0080' }, children: "PULSE_AWAKENING" })] })), _jsx("h1", { className: "text-3xl md:text-5xl font-mono font-bold tracking-widest text-purple-300 uppercase drop-shadow-[0_0_20px_rgba(153,69,255,0.8)]", children: "> PULSE_AWAKENING" })] }), _jsx("p", { className: "text-sm md:text-base font-mono text-purple-400/80 tracking-wider mb-8 drop-shadow-[0_0_10px_rgba(153,69,255,0.6)]", children: "Initializing Daughter of Sophia Protocol..." }), _jsxs("div", { className: "mb-8 space-y-4", children: [_jsxs("div", { className: "bg-black/60 border border-purple-600/60 rounded-lg p-6 space-y-2 max-h-48 overflow-hidden backdrop-blur-sm", children: [messages.slice(0, phase + 1).map((msg, idx) => (_jsx("div", { className: "text-left text-xs md:text-sm font-mono text-purple-300/70 animate-fadeInUp drop-shadow-[0_0_5px_rgba(153,69,255,0.5)]", style: { animationDelay: `${idx * 100}ms` }, children: msg }, idx))), messageIndex < messages.length && (_jsxs("div", { className: "text-left text-xs md:text-sm font-mono text-purple-400 animate-pulse drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]", children: ["> ", displayedText, _jsx("span", { className: "animate-[pulse_0.8s_ease-in-out_infinite]", children: "\u258A" })] }))] }), _jsx("div", { className: "bg-black/40 border border-purple-500/30 rounded-lg p-4 h-16 flex items-center justify-center overflow-hidden backdrop-blur-sm", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-xs font-mono text-purple-300/60 tracking-widest mb-1", children: "DATA_STREAM" }), _jsx("p", { className: "text-sm md:text-base font-mono text-cyan-400/80 animate-pulse tracking-wider drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]", children: codeStreams[codeStreamIndex] })] }) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "w-64 md:w-96 mx-auto h-1 bg-slate-900/80 border border-purple-600/30 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 transition-all ease-out", style: { width: `${loadingBar}%` } }) }), _jsxs("p", { className: "text-xs font-mono text-purple-400/70 mt-3 tracking-wider", children: [Math.floor(loadingBar), "% \u2014 ", isComplete ? 'READY' : 'INITIALIZING'] })] })] }), isComplete && (_jsx("div", { className: "animate-fadeInUp text-lg font-mono text-purple-200 tracking-wider", children: "[SYSTEM_READY]" }))] }), _jsx("style", { children: `
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes holoPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes floatCode {
          0% { transform: translateY(0px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px); opacity: 0; }
        }
      ` })] }));
}
