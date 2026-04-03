import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './providers/AppProvider'
import { SolanaProvider } from './providers/SolanaProvider'
import { LoadingProvider, useLoading } from './context/LoadingContext'
import LandingPage from './pages/LandingPage'
import GenesisPage from './pages/GenesisPage'
import MyCreationsPage from './pages/MyCreationsPage'
import TokenizePage from './pages/TokenizePage'
import AccountPage from './pages/AccountPage'
import DappShell from './components/DappShell'
import LoadingScreen from './components/LoadingScreen'

function AppRoutes() {
  const { isLoading } = useLoading()

  return (
    <>
      <LoadingScreen visible={isLoading} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<DappShell />}>
          <Route path="/genesis" element={<GenesisPage />} />
          <Route path="/creations" element={<MyCreationsPage />} />
          <Route path="/tokenize" element={<TokenizePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SolanaProvider>
        <AppProvider>
          <LoadingProvider>
            <AppRoutes />
          </LoadingProvider>
        </AppProvider>
      </SolanaProvider>
    </BrowserRouter>
  )
}

export default App
