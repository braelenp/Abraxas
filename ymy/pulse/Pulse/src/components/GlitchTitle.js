import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
export function GlitchTitle({ text, className = '' }) {
    const [glitch, setGlitch] = useState(false);
    const [scanline, setScanline] = useState(false);
    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 120);
        }, 3500);
        return () => clearInterval(glitchInterval);
    }, []);
    useEffect(() => {
        const scanInterval = setInterval(() => {
            setScanline(true);
            setTimeout(() => setScanline(false), 150);
        }, 3200);
        return () => clearInterval(scanInterval);
    }, []);
    return (_jsxs("div", { className: "relative w-full", children: [scanline && (_jsx("div", { className: "absolute inset-0 pointer-events-none opacity-50 w-full -top-4 -bottom-4", children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent" }) })), _jsxs("div", { className: "relative", children: [glitch && (_jsx("div", { className: `absolute inset-0 font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 pointer-events-none ${className}`, style: {
                            opacity: 0.8,
                            transform: 'translate(3px, -3px)',
                            zIndex: 2,
                        }, children: text })), glitch && (_jsx("div", { className: `absolute inset-0 font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 pointer-events-none ${className}`, style: {
                            opacity: 0.8,
                            transform: 'translate(-3px, 3px)',
                            zIndex: 2,
                        }, children: text })), _jsx("div", { className: "absolute inset-0 blur-3xl opacity-50 pointer-events-none", children: _jsx("div", { className: `font-black text-purple-600 ${className}`, children: text }) }), _jsx("div", { className: "absolute inset-0 blur-2xl opacity-40 pointer-events-none", children: _jsx("div", { className: `font-black text-purple-500 ${className}`, children: text }) }), _jsx("div", { className: `relative font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-400 drop-shadow-[0_0_50px_rgba(168,85,247,0.8)] ${className}`, children: text })] })] }));
}
