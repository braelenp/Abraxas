import { useEffect, useState } from 'react'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import LoadingScreen from './components/LoadingScreen'
import { PortfolioProvider } from './contexts/PortfolioContext'
import './App.css'

type Page = 'landing' | 'dashboard'

function App() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>('landing')

  useEffect(() => {
    // Show loading screen for 2 seconds
    const loadingTimer = setTimeout(() => {
      setMounted(true)
    }, 2000)

    return () => clearTimeout(loadingTimer)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (!mounted) {
    return <LoadingScreen isVisible={true} onComplete={handleLoadingComplete} />
  }

  const handleNavigate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage('dashboard')
  }

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage('landing')
  }

  return (
    <PortfolioProvider>
      <LoadingScreen isVisible={isLoading} onComplete={handleLoadingComplete} />
      <div className="min-h-screen bg-dark-bg text-white overflow-hidden">
        {currentPage === 'landing' ? (
          <LandingPage onNavigate={handleNavigate} />
        ) : (
          <Dashboard onBack={handleBack} />
        )}
      </div>
    </PortfolioProvider>
  )
}

export default App
