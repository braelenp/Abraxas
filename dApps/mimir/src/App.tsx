import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoadingPage from './pages/LoadingPage'
import LandingPage from './pages/LandingPage'
import OraclePage from './pages/OraclePage'
import VerifyPage from './pages/VerifyPage'
import AnalyticsPage from './pages/AnalyticsPage'

function DappShell() {
  return (
    <Routes>
      <Route path="/" element={<OraclePage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingPage onComplete={handleLoadingComplete} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<DappShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
