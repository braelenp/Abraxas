import { createContext, useContext, useState, FC, ReactNode } from 'react'
import type { AppState, Transaction } from '../lib/types'

interface AppContextValue {
  state: AppState
  transactions: Transaction[]
  addTransaction: (tx: Transaction) => void
  setInitialized: (value: boolean) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const initialState: AppState = {
  isInitialized: false,
  userAccount: null,
  vault: null,
}

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev].slice(0, 100))
  }

  const setInitialized = (value: boolean) => {
    setState(prev => ({ ...prev, isInitialized: value }))
  }

  return (
    <AppContext.Provider value={{ state, transactions, addTransaction, setInitialized }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
