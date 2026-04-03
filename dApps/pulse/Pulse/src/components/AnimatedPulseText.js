import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export function AnimatedPulseText() {
    const [glitch, setGlitch] = useState(false);
    const [scanline, setScanline] = useState(false);
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 120);
        }, 4000);
        return () => clearInterval(glitchInterval);
    }, []);
    useEffect(() => {
        const scanInterval = setInterval(() => {
            setScanline(true);
            setTimeout(() => setScanline(false), 150);
        }, 3500);
        return () => clearInterval(scanInterval);
    }, []);
    return (_jsxs("div", { className: "relative w-full flex flex-col items-center justify-center", children: [scanline && (_jsx("div", { className: "absolute inset-0 pointer-events-none opacity-50 w-full", children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" }) })), _jsxs("div", { className: "relative w-full text-center", children: [glitch && (_jsx("div", { className: "absolute inset-0 font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter pointer-events-none", style: {
                            opacity: 0.8,
                            transform: 'translate(4px, -4px)',
                            zIndex: 2,
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                        }, children: "PULSE" })), glitch && (_jsx("div", { className: "absolute inset-0 font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter pointer-events-none", style: {
                            opacity: 0.8,
                            transform: 'translate(-4px, 4px)',
                            zIndex: 2,
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                        }, children: "PULSE" })), _jsx("div", { className: "absolute inset-0 blur-3xl opacity-50 pointer-events-none", children: _jsx("div", { className: "text-center font-black text-purple-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter", children: "PULSE" }) }), _jsx("div", { className: "absolute inset-0 blur-2xl opacity-40 pointer-events-none", children: _jsx("div", { className: "text-center font-black text-purple-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter", children: "PULSE" }) }), _jsx("div", { className: "relative text-center font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter drop-shadow-[0_0_50px_rgba(168,85,247,0.8)]", children: "PULSE" })] }), _jsxs("div", { className: "absolute inset-0 pointer-events-none w-full", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-60" })] }), _jsx("style", { children: `
        @keyframes glitch-shift {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
      ` })] }));
}
