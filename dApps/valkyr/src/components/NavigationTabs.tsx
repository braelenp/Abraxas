import React, { useState } from 'react'
import BottomNav from './BottomNav'
import DashboardTab from './tabs/DashboardTab'
import VaultsTab from './tabs/VaultsTab'
import StrategyTab from './tabs/StrategyTab'
import ForgeTab from './tabs/ForgeTab'
import ParticleBackground from './ParticleBackground'
import LightBeams from './LightBeams'
import useScrollToTop from '../hooks/useScrollToTop'

interface NavigationTabsProps {
  onBack: () => void
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Scroll to top when active tab changes
  useScrollToTop([activeTab])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab onBack={onBack} />
      case 'vaults':
        return <VaultsTab />
      case 'strategy':
        return <StrategyTab />
      case 'settings':
        return <ForgeTab />
      default:
        return <DashboardTab onBack={onBack} />
    }
  }

  return (
    <>
      <LightBeams />
      <ParticleBackground />
      <div className="relative w-full min-h-screen pb-32">
        {renderTabContent()}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </>
  )
}

export default NavigationTabs
