import React from 'react'
import NavigationTabs from './NavigationTabs'
import DAppHeader from './DAppHeader'

interface DashboardProps {
  onBack: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  return (
    <>
      <DAppHeader onBack={onBack} />
      <div className="pt-20">
        <NavigationTabs onBack={onBack} />
      </div>
    </>
  )
}

export default Dashboard
