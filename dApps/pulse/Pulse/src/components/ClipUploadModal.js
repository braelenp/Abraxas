import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Upload, X, Zap } from 'lucide-react';
export function ClipUploadModal({ onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('gaming');
    const [isTokenizing, setIsTokenizing] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileSelect = (file) => {
        if (file.type.startsWith('video/')) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
        else {
            alert('Please select a video file (MP4, WebM, etc.)');
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };
    const handleTokenize = async () => {
        if (!selectedFile || !title) {
            alert('Please select a file and enter a title');
            return;
        }
        setIsTokenizing(true);
        // Simulate tokenization
        setTimeout(() => {
            console.log('Tokenized:', { title, file: selectedFile.name, category });
            alert(`✓ Clip "${title}" tokenized as BlackBox NFT!`);
            setIsTokenizing(false);
            onClose();
        }, 2000);
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-slate-900 border border-purple-700/50 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "sticky top-0 flex items-center justify-between p-6 border-b border-purple-700/30 bg-slate-900/95 backdrop-blur", children: [_jsx("h2", { className: "text-xl font-bold text-purple-300 font-mono tracking-wider", children: "> [TOKENIZE_CLIP]" }), _jsx("button", { onClick: onClose, className: "text-slate-400 hover:text-slate-100 transition", children: _jsx(X, { size: 24 }) })] }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { onDrop: handleDrop, onDragOver: (e) => e.preventDefault(), onClick: () => fileInputRef.current?.click(), className: "border-2 border-dashed border-purple-600/40 rounded-lg p-12 text-center cursor-pointer hover:border-purple-500/60 hover:bg-purple-500/5 transition", children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "video/*", onChange: (e) => e.target.files && handleFileSelect(e.target.files[0]), className: "hidden" }), preview ? (_jsxs("div", { className: "space-y-3", children: [_jsx("video", { src: preview, className: "w-full h-48 object-cover rounded-lg", controls: true }), _jsx("p", { className: "text-sm text-purple-300", children: selectedFile?.name })] })) : (_jsxs("div", { className: "space-y-3", children: [_jsx(Upload, { className: "w-12 h-12 text-purple-400 mx-auto opacity-60" }), _jsxs("div", { children: [_jsx("p", { className: "text-lg font-semibold text-slate-200", children: "Drop your clip here" }), _jsx("p", { className: "text-sm text-slate-400", children: "or click to select (MP4, WebM, etc.)" })] })] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-mono text-purple-300 uppercase tracking-wider mb-2", children: "Clip Title" }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Enter clip title...", className: "w-full rounded-lg bg-slate-800/50 border border-purple-700/30 text-white px-4 py-3 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 outline-none transition" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-mono text-purple-300 uppercase tracking-wider mb-2", children: "Category" }), _jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full rounded-lg bg-slate-800/50 border border-purple-700/30 text-white px-4 py-3 focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 outline-none transition", children: [_jsx("option", { value: "gaming", children: "Gaming" }), _jsx("option", { value: "sports", children: "Sports" }), _jsx("option", { value: "streaming", children: "Streaming" })] })] }), _jsx("div", { className: "rounded-lg bg-purple-950/30 border border-purple-700/20 p-4", children: _jsxs("p", { className: "text-xs text-purple-200/80", children: [_jsx("span", { className: "font-bold", children: "What happens next:" }), " Your clip will be minted as a La Casa NFT on Solana, deposited into a vault, and ready for revenue sharing. You'll receive 70% of all trading fees."] }) }), _jsxs("div", { className: "flex gap-3 pt-4 border-t border-purple-700/20", children: [_jsx("button", { onClick: onClose, className: "flex-1 px-4 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition font-mono font-semibold text-sm uppercase active:scale-95", children: "Cancel" }), _jsxs("button", { onClick: handleTokenize, disabled: isTokenizing || !selectedFile || !title, className: "flex-1 px-4 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-mono font-semibold text-sm uppercase active:scale-95 flex items-center justify-center gap-2", children: [_jsx(Zap, { size: 16 }), isTokenizing ? 'Tokenizing...' : 'Tokenize & Mint'] })] })] })] }) }));
}
