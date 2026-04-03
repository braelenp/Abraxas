import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import { Heart, MessageCircle, Share2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlitchTitle } from '../components/GlitchTitle';
import { PULSE_LOGO_URI } from '../utils/logoPlaceholder';
export function SocialPage() {
    const [userProfile, setUserProfile] = useState(null);
    const [posts, setPosts] = useState([
        {
            id: '1',
            author: { name: 'streamer_xyz', handle: '@streamer_xyz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=streamer_xyz' },
            content: 'just hit a 360 no-scope clutch in ranked. minted it as an NFT on Pulse. LA CASA gonna moon 🚀',
            timestamp: '2h ago',
            likes: 234,
            comments: 18,
            shares: 56,
            image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=300&fit=crop',
            liked: false,
        },
        {
            id: '2',
            author: { name: 'esports_pro', handle: '@esports_pro', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=esports_pro' },
            content: 'Pulse > YouTube clips. Zero delays. Revenue split. Community owns. This is the future of streaming.',
            timestamp: '4h ago',
            likes: 1205,
            comments: 89,
            shares: 423,
            liked: false,
        },
        {
            id: '3',
            author: { name: 'defi_trader', handle: '@defi_trader', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=defi_trader' },
            content: 'captured my +$50k trade execution. now it\'s a tokenized moment forever. this is the new collectible 📊',
            timestamp: '6h ago',
            likes: 567,
            comments: 42,
            shares: 145,
            image: 'https://images.unsplash.com/photo-1611974789882-a6c03bf63ecb?w=500&h=300&fit=crop',
            liked: false,
        },
    ]);
    const [showPostModal, setShowPostModal] = useState(false);
    const [postText, setPostText] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState({
        '1': [
            {
                id: 'c1',
                author: { name: 'gaming_fan', handle: '@gaming_fan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gaming_fan' },
                content: 'bro that was insane!! gonna grab this NFT for sure',
                timestamp: '1h ago',
                likes: 42,
            },
        ],
        '2': [],
        '3': [],
    });
    useEffect(() => {
        const savedProfile = localStorage.getItem('pulseUserProfile');
        if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile));
        }
    }, []);
    const toggleLike = useCallback((postId) => {
        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1,
                };
            }
            return post;
        }));
    }, [posts]);
    const handleShare = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            alert(`🎬 Shared: "${post.content.substring(0, 50)}..."\n\nSimulating share to Solana network...\n✓ Share broadcast successful!`);
            setPosts(posts.map(p => {
                if (p.id === postId) {
                    return { ...p, shares: p.shares + 1 };
                }
                return p;
            }));
        }
    };
    const handlePost = () => {
        if (postText.trim()) {
            const newPost = {
                id: Date.now().toString(),
                author: {
                    name: userProfile?.name || 'you',
                    handle: userProfile?.handle || '@yourhandle',
                    avatar: userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you',
                },
                content: postText,
                timestamp: 'now',
                likes: 0,
                comments: 0,
                shares: 0,
                liked: false,
            };
            setPosts([newPost, ...posts]);
            setPostText('');
            setShowPostModal(false);
            alert('✓ Post created!\n\nYour moment is now live on the Pulse feed.');
        }
    };
    const openComments = (post) => {
        setSelectedPost(post);
        setShowComments(true);
    };
    return (_jsxs("div", { className: "pb-28 pt-20", children: [_jsx("div", { className: "sticky top-16 z-30 border-b border-purple-900/30 bg-slate-950/95 backdrop-blur-xl px-4 py-4", children: _jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsx(GlitchTitle, { text: "Pulse Community", className: "text-2xl md:text-3xl mb-0" }), _jsx("p", { className: "text-slate-400 text-sm font-mono mt-1", children: "Share your moments. Comment. Like. Own the culture." })] }) }), _jsx("div", { className: "max-w-2xl mx-auto px-4 mt-6", children: _jsx("div", { className: "mb-8 p-6 bg-gradient-to-br from-pink-950/60 to-slate-950/40 border border-pink-700/40 rounded-lg backdrop-blur", children: _jsxs("div", { children: [_jsx("p", { className: "text-xs font-mono text-pink-400 uppercase tracking-wide mb-2", children: "Social Tokenization" }), _jsx("h3", { className: "text-lg font-bold text-pink-200 mb-2 font-mono", children: "Your Moments. Your Community. Your Revenue." }), _jsx("p", { className: "text-sm text-slate-300 leading-relaxed", children: "Share clips, trades, and highlights. Comment on the culture. Like what matters. Every interaction tokenizes your network. This is community ownership on-chain." })] }) }) }), !userProfile && (_jsx("div", { className: "max-w-2xl mx-auto px-4 mb-8", children: _jsx(Link, { to: "/app/profile", className: "block border border-purple-700/30 rounded-lg p-6 bg-gradient-to-r from-purple-950/40 to-purple-900/20 hover:border-purple-600/50 transition", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-purple-300 mb-1 font-mono", children: "Create Your Profile" }), _jsx("p", { className: "text-sm text-slate-400", children: "Set up your profile to interact with the community and share your moments." })] }), _jsx("div", { className: "text-purple-300 font-mono text-lg", children: "\u2192" })] }) }) })), _jsx("div", { className: "max-w-2xl mx-auto px-4 mb-6", children: _jsx("div", { className: "border border-purple-700/30 rounded-lg p-4 bg-purple-950/10 hover:border-purple-600/50 transition cursor-pointer", onClick: () => setShowPostModal(true), children: _jsxs("div", { className: "flex gap-4", children: [_jsx("img", { src: userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you', alt: "Your avatar", className: "w-10 h-10 rounded-full", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }), _jsxs("div", { className: "flex-1", children: [_jsx("input", { type: "text", placeholder: userProfile ? "Share your moment..." : "Create a profile first...", className: "w-full bg-transparent text-purple-300 placeholder-slate-400 font-mono text-sm outline-none cursor-pointer", readOnly: true, onClick: () => setShowPostModal(true) }), _jsx("div", { className: "mt-3 flex gap-2", children: _jsx("button", { className: "px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono text-xs uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition", onClick: () => setShowPostModal(true), children: "Post" }) })] })] }) }) }), _jsx("div", { className: "max-w-2xl mx-auto px-4 space-y-6", children: posts.map((post) => (_jsxs("div", { className: "border border-purple-700/30 rounded-lg p-6 bg-purple-950/10 hover:border-purple-600/50 transition", children: [_jsxs("div", { className: "flex gap-4 mb-4", children: [_jsx(Link, { to: `/app/profile/${post.author.handle.replace('@', '')}`, children: _jsx("img", { src: post.author.avatar, alt: post.author.name, className: "w-12 h-12 rounded-full hover:opacity-80 transition cursor-pointer", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }) }), _jsx("div", { className: "flex-1", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { to: `/app/profile/${post.author.handle.replace('@', '')}`, className: "font-bold text-purple-300 hover:text-purple-200 transition", children: post.author.name }), _jsx("span", { className: "text-slate-400", children: post.author.handle }), _jsx("span", { className: "text-slate-500 text-sm", children: "\u00B7" }), _jsx("span", { className: "text-slate-500 text-sm", children: post.timestamp })] }) })] }), _jsx("p", { className: "text-slate-300 mb-4 leading-relaxed", children: post.content }), post.image && (_jsx("img", { src: post.image, alt: "Post media", className: "w-full rounded-lg mb-4 max-h-80 object-cover", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } })), _jsxs("div", { className: "text-slate-400 text-sm mb-4 space-x-4 px-4 py-3 border-t border-b border-purple-900/20", children: [_jsxs("span", { children: [post.likes, " likes"] }), _jsxs("span", { children: [post.comments, " comments"] }), _jsxs("span", { children: [post.shares, " shares"] })] }), _jsxs("div", { className: "flex items-center justify-between px-4 text-slate-400", children: [_jsxs("button", { onClick: () => openComments(post), className: "flex items-center gap-2 hover:text-pink-400 transition group flex-1 justify-center py-2 rounded hover:bg-pink-500/10", children: [_jsx(MessageCircle, { size: 18, className: "group-hover:scale-110 transition" }), _jsx("span", { className: "text-xs font-mono uppercase tracking-wider hidden sm:inline", children: "Comment" })] }), _jsxs("button", { onClick: () => toggleLike(post.id), className: `flex items-center gap-2 transition group flex-1 justify-center py-2 rounded ${post.liked ? 'text-red-400 bg-red-500/10' : 'hover:text-red-400 hover:bg-red-500/10'}`, children: [_jsx(Heart, { size: 18, className: `transition ${post.liked ? 'fill-current' : ''} group-hover:scale-110`, fill: post.liked ? 'currentColor' : 'none' }), _jsx("span", { className: "text-xs font-mono uppercase tracking-wider hidden sm:inline", children: post.liked ? 'Liked' : 'Like' })] }), _jsxs("button", { onClick: () => handleShare(post.id), className: "flex items-center gap-2 hover:text-blue-400 transition group flex-1 justify-center py-2 rounded hover:bg-blue-500/10", children: [_jsx(Share2, { size: 18, className: "group-hover:scale-110 transition" }), _jsx("span", { className: "text-xs font-mono uppercase tracking-wider hidden sm:inline", children: "Share" })] })] })] }, post.id))) }), showPostModal && (_jsx("div", { className: "fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-end sm:items-center justify-center p-4", children: _jsxs("div", { className: "bg-slate-900 border border-purple-700/50 rounded-lg w-full max-w-lg shadow-2xl", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-purple-900/30", children: [_jsx("h2", { className: "text-lg font-bold text-purple-300 font-mono", children: "Share Your Moment" }), _jsx("button", { onClick: () => setShowPostModal(false), className: "text-slate-400 hover:text-purple-300 transition p-1", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "flex gap-4", children: [_jsx("img", { src: userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you', alt: "Your avatar", className: "w-12 h-12 rounded-full", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-bold text-purple-300 font-mono", children: userProfile?.name || 'Your Account' }), _jsx("p", { className: "text-sm text-slate-400", children: userProfile?.handle || '@yourhandle' })] })] }), _jsx("textarea", { value: postText, onChange: (e) => setPostText(e.target.value), placeholder: "What's happening?!", className: "w-full bg-transparent text-purple-300 placeholder-slate-400 font-mono text-lg outline-none resize-none", rows: 6 }), _jsxs("div", { className: "text-xs text-slate-400 font-mono", children: [postText.length, " characters"] })] }), _jsxs("div", { className: "flex gap-3 p-4 border-t border-purple-900/30", children: [_jsx("button", { onClick: () => setShowPostModal(false), className: "flex-1 px-4 py-2 rounded-lg border border-purple-400/50 text-purple-300 font-mono font-bold text-sm uppercase tracking-wider hover:bg-purple-500/10 transition", children: "Cancel" }), _jsx("button", { onClick: handlePost, disabled: !postText.trim(), className: "flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono font-bold text-sm uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition disabled:opacity-50 disabled:cursor-not-allowed", children: "Post" })] })] }) })), showComments && selectedPost && (_jsx("div", { className: "fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex items-end sm:items-center justify-center p-4", children: _jsxs("div", { className: "bg-slate-900 border border-purple-700/50 rounded-lg w-full max-w-lg shadow-2xl max-h-[80vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-purple-900/30 sticky top-0 bg-slate-900/95", children: [_jsx("h2", { className: "text-lg font-bold text-purple-300 font-mono", children: "Comments" }), _jsx("button", { onClick: () => setShowComments(false), className: "text-slate-400 hover:text-purple-300 transition p-1", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", { className: "p-4 border-b border-purple-900/20 bg-purple-950/20", children: [_jsxs("div", { className: "flex gap-3 mb-3", children: [_jsx("img", { src: selectedPost.author.avatar, alt: selectedPost.author.name, className: "w-10 h-10 rounded-full", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-purple-300 text-sm", children: selectedPost.author.name }), _jsx("p", { className: "text-xs text-slate-400", children: selectedPost.author.handle })] })] }), _jsx("p", { className: "text-sm text-slate-300", children: selectedPost.content })] }), _jsx("div", { className: "p-4 space-y-4", children: comments[selectedPost.id]?.map((comment) => (_jsxs("div", { className: "flex gap-3", children: [_jsx("img", { src: comment.author.avatar, alt: comment.author.name, className: "w-10 h-10 rounded-full", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-bold text-purple-300 text-sm", children: comment.author.name }), _jsx("span", { className: "text-slate-400 text-xs", children: comment.author.handle }), _jsx("span", { className: "text-slate-500 text-xs", children: "\u00B7" }), _jsx("span", { className: "text-slate-500 text-xs", children: comment.timestamp })] }), _jsx("p", { className: "text-sm text-slate-300 mt-1", children: comment.content }), _jsxs("p", { className: "text-xs text-slate-500 mt-2", children: [comment.likes, " likes"] })] })] }, comment.id))) }), _jsx("div", { className: "p-4 border-t border-purple-900/30 sticky bottom-0 bg-slate-900/95", children: _jsxs("div", { className: "flex gap-3", children: [_jsx("img", { src: userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you', alt: "Your avatar", className: "w-10 h-10 rounded-full", onError: (e) => { e.currentTarget.src = PULSE_LOGO_URI; } }), _jsxs("div", { className: "flex-1 flex gap-2", children: [_jsx("input", { type: "text", placeholder: "Reply...", className: "flex-1 bg-purple-950/30 border border-purple-700/30 rounded-full px-4 py-2 text-purple-300 placeholder-slate-400 font-mono text-sm outline-none focus:border-purple-600/50", onKeyDown: (e) => {
                                                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                                        const newComment = {
                                                            id: `c${Date.now()}`,
                                                            author: { name: userProfile?.name || 'you', handle: userProfile?.handle || '@yourhandle', avatar: userProfile?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=you' },
                                                            content: e.currentTarget.value,
                                                            timestamp: 'now',
                                                            likes: 0,
                                                        };
                                                        setComments({
                                                            ...comments,
                                                            [selectedPost.id]: [...(comments[selectedPost.id] || []), newComment],
                                                        });
                                                        e.currentTarget.value = '';
                                                    }
                                                } }), _jsx("button", { className: "px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-mono text-xs uppercase tracking-wider hover:from-purple-500 hover:to-purple-400 transition", children: "Reply" })] })] }) })] }) }))] }));
}
