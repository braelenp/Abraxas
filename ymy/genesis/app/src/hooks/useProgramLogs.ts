import { useState, useCallback } from 'react'

export interface ProgramLog {
  signature: string
  type: string
  timestamp: number
  status: 'confirmed' | 'pending' | 'failed'
  message: string
}

export function useProgramLogs() {
  const [logs, setLogs] = useState<ProgramLog[]>([])

  const addLog = useCallback((log: Omit<ProgramLog, 'timestamp'>) => {
    setLogs(prev => [
      { ...log, timestamp: Date.now() },
      ...prev,
    ].slice(0, 50))
  }, [])

  const clearLogs = useCallback(() => setLogs([]), [])

  return { logs, addLog, clearLogs }
}
