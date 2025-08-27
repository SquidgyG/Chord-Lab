import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface HighContrastModeContextValue {
  highContrastMode: boolean
  setHighContrastMode: (v: boolean) => void
  toggleHighContrastMode: () => void
}

const HighContrastModeContext = createContext<
  HighContrastModeContextValue | undefined
>(undefined)

export function HighContrastModeProvider({ children }: { children: React.ReactNode }) {
  const [highContrastMode, setHighContrastMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('highContrastMode')
      const parsed = saved ? (JSON.parse(saved) as unknown) : false
      return typeof parsed === 'boolean' ? parsed : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('highContrastMode', JSON.stringify(highContrastMode))
    } catch {
      /* ignore */
    }
  }, [highContrastMode])

  const value = useMemo(
    () => ({
      highContrastMode,
      setHighContrastMode,
      toggleHighContrastMode: () => setHighContrastMode(v => !v),
    }),
    [highContrastMode],
  )

  return (
    <HighContrastModeContext.Provider value={value}>
      {children}
    </HighContrastModeContext.Provider>
  )
}

export function useHighContrastMode() {
  const ctx = useContext(HighContrastModeContext)
  if (!ctx) {
    throw new Error(
      'useHighContrastMode must be used within HighContrastModeProvider',
    )
  }
  return ctx
}

