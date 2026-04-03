import React, { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import LandingPage from './components/LandingPage'
import FenrirPage from './components/FenrirPage'
import Dashboard from './components/Dashboard'
import Hunt from './components/Hunt'
import Flow from './components/Flow'
import Market from './components/Market'
import Terrain from './components/Terrain'
import BottomNav from './components/BottomNav'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('landing')

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  const handleExplore = () => {
    setCurrentPage('dashboard')
  }

  const handleBack = () => {
    setCurrentPage('landing')
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />
  }

  // Render main content with optional BottomNav
  const renderContent = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onExplore={handleExplore} />
      case 'fenrir':
        return (
          <>
            <FenrirPage onBack={handleBack} />
            <BottomNav activePage={currentPage} onPageChange={handlePageChange} />
          </>
        )
      case 'dashboard':
        return (
          <>
            <Dashboard />
            <BottomNav activePage={currentPage} onPageChange={handlePageChange} />
          </>
        )
      case 'hunt':
        return (
          <>
            <Hunt />
            <BottomNav activePage={currentPage} onPageChange={handlePageChange} />
          </>
        )
      case 'flow':
        return (
          <>
            <Flow />
            <BottomNav activePage={currentPage} onPageChange={handlePageChange} />
          </>
        )
      case 'market':
        return (
          <>
            <Market />
            <BottomNav activePage={currentPage} onPageChange={handlePageChange} />
          </>
        )
      case 'terrain':
        return (
          <>
            <Terrain />
            <BottomNav activePage={currentPage} onPageChange={handlePageChange} />
          </>
        )
      default:
        return <LandingPage onExplore={handleExplore} />
    }
  }

  return (
    <div className="w-full min-h-screen bg-deep-black">
      {renderContent()}
    </div>
  )
}

export default App
