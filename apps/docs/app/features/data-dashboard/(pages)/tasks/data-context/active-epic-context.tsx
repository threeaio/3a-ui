'use client'

import { createContext, useContext, useState } from 'react'

type ActiveEpicContextType = {
  activeEpicIds: Set<string>
  setEpicActive: (epicId: string, isActive: boolean) => void
}

const ActiveEpicContext = createContext<ActiveEpicContextType | null>(null)

export function ActiveEpicProvider({ children }: { children: React.ReactNode }) {
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
    <ActiveEpicContext.Provider
      value={{
        activeEpicIds,
        setEpicActive,
      }}
    >
      {children}
    </ActiveEpicContext.Provider>
  )
}

export function useActiveEpic() {
  const context = useContext(ActiveEpicContext)
  if (!context) {
    throw new Error('useActiveEpic must be used within an ActiveEpicProvider')
  }
  return context
}
