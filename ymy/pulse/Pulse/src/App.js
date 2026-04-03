import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { LivePage } from './pages/LivePage';
import { TokenizePage } from './pages/TokenizePage';
import { GamingPage } from './pages/GamingPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProfileViewPage } from './pages/ProfileViewPage';
import { LoadingPage } from './pages/LoadingPage';
import { Navbar } from './components/Navbar';
import { BottomTabBar } from './components/BottomTabBar';
import './App.css';
function AppContent() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Check if user has already seen the loading screen in this session
        const hasSeenLoading = sessionStorage.getItem('pulseLoadingShown');
        if (hasSeenLoading) {
            // Skip loading screen on subsequent navigations
            setLoading(false);
        }
        else {
            // Show loading screen and mark it as shown
            const timer = setTimeout(() => {
                sessionStorage.setItem('pulseLoadingShown', 'true');
                setLoading(false);
            }, 4800); // Let loading screen run for ~5 seconds
            return () => clearTimeout(timer);
        }
    }, []);
    if (loading) {
        return _jsx(LoadingPage, {});
    }
    return (_jsx("div", { className: "min-h-screen bg-slate-950 overflow-x-hidden", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/app", element: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(HomePage, {}), _jsx(BottomTabBar, {})] }) }), _jsx(Route, { path: "/app/gaming", element: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(GamingPage, {}), _jsx(BottomTabBar, {})] }) }), _jsx(Route, { path: "/app/live", element: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(LivePage, {}), _jsx(BottomTabBar, {})] }) }), _jsx(Route, { path: "/app/tokenize", element: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(TokenizePage, {}), _jsx(BottomTabBar, {})] }) }), _jsx(Route, { path: "/app/profile", element: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(ProfilePage, {}), _jsx(BottomTabBar, {})] }) }), _jsx(Route, { path: "/app/profile/:handle", element: _jsxs(_Fragment, { children: [_jsx(Navbar, {}), _jsx(ProfileViewPage, {}), _jsx(BottomTabBar, {})] }) })] }) }));
}
export default function App() {
    return (_jsx(Router, { children: _jsx(AppContent, {}) }));
}
