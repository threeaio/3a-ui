'use client'

import { createContext, useContext, useState } from 'react'

type ActiveTaskContextType = {
  activeEpicIds: Set<string>
  setEpicActive: (epicId: string, isActive: boolean) => void
}

const ActiveTaskContext = createContext<ActiveTaskContextType | null>(null)

export function ActiveTaskProvider({ children }: { children: React.ReactNode }) {
  const [activeEpicIds, setActiveEpicIds] = useState<Set<string>>(new Set())

  const setEpicActive = (epicId: string, isActive: boolean) => {
    setActiveEpicIds((prev) => {
      const next = new Set(prev)
      if (isActive) {
        next.add(epicId)
      } else {
        next.delete(epicId)
      }
      return next
    })
  }

  return (
    <ActiveTaskContext.Provider
      value={{
        activeEpicIds,
        setEpicActive,
      }}
    >
      {children}
    </ActiveTaskContext.Provider>
  )
}

export function useActiveTask() {
  const context = useContext(ActiveTaskContext)
  if (!context) {
    throw new Error('useActiveTask must be used within an ActiveTaskProvider')
  }
  return context
}
