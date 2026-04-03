import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LandingPage } from './pages/LandingPage'
import { HomePage } from './pages/HomePage'
import { LivePage } from './pages/LivePage'
import { TokenizePage } from './pages/TokenizePage'
import { GamingPage } from './pages/GamingPage'
import { ProfilePage } from './pages/ProfilePage'
import { ProfileViewPage } from './pages/ProfileViewPage'
import { LoadingPage } from './pages/LoadingPage'
import { Navbar } from './components/Navbar'
import { BottomTabBar } from './components/BottomTabBar'
import './App.css'

function AppContent() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user has already seen the loading screen in this session
    const hasSeenLoading = sessionStorage.getItem('pulseLoadingShown')
    
    if (hasSeenLoading) {
      // Skip loading screen on subsequent navigations
      setLoading(false)
    } else {
      // Show loading screen and mark it as shown
      const timer = setTimeout(() => {
        sessionStorage.setItem('pulseLoadingShown', 'true')
        setLoading(false)
      }, 4800) // Let loading screen run for ~5 seconds
      
      return () => clearTimeout(timer)
    }
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/app" 
          element={
            <>
              <Navbar />
              <HomePage />
              <BottomTabBar />
            </>
          } 
        />
        <Route 
          path="/app/gaming" 
          element={
            <>
              <Navbar />
              <GamingPage />
              <BottomTabBar />
            </>
          } 
        />
        <Route 
          path="/app/live" 
          element={
            <>
              <Navbar />
              <LivePage />
              <BottomTabBar />
            </>
          } 
        />
        <Route 
          path="/app/tokenize" 
          element={
            <>
              <Navbar />
              <TokenizePage />
              <BottomTabBar />
            </>
          } 
        />
        <Route 
          path="/app/profile" 
          element={
            <>
              <Navbar />
              <ProfilePage />
              <BottomTabBar />
            </>
          } 
        />
        <Route 
          path="/app/profile/:handle" 
          element={
            <>
              <Navbar />
              <ProfileViewPage />
              <BottomTabBar />
            </>
          } 
        />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}
