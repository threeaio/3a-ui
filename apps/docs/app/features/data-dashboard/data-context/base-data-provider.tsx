'use client'

import { createContext, useContext, useMemo, ReactNode } from 'react'
import { ExpertiseDomain } from '../types/domain'

// Define the shape of our context
interface BaseDataContextType {
  // Base data
  expertiseDomains: ExpertiseDomain[]

  // Selectors
  getExpertiseDomainByName: (name: string) => ExpertiseDomain | undefined
}

// Create the context with default undefined value
const BaseDataContext = createContext<BaseDataContextType | undefined>(undefined)

// Provider component
export function BaseDataProvider({
  children,
  expertiseDomains,
}: {
  children: ReactNode
  expertiseDomains: ExpertiseDomain[]
}) {
  // Create memoized selectors
  const selectors = useMemo(() => {
    // ExpertiseDomain selectors
    const getExpertiseDomainByName = (name: string) => expertiseDomains.find((domain) => domain === name)

    return {
      getExpertiseDomainByName,
    }
  }, [expertiseDomains])

  // Create the context value
  const contextValue = useMemo(
    () => ({
      // Base data
      expertiseDomains,

      // Selectors
      ...selectors,
    }),
    [expertiseDomains, selectors],
  )

  return <BaseDataContext.Provider value={contextValue}>{children}</BaseDataContext.Provider>
}

// Custom hook to use the context
export function useBaseDataContext() {
  const context = useContext(BaseDataContext)
  if (context === undefined) {
    throw new Error('useBaseDataContext must be used within a BaseDataProvider')
  }
  return context
}
