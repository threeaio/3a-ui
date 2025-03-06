'use client'

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import {
  FilterState,
  defaultFilterState,
  Tag,
  companies,
  managingDirectors,
  tribes,
  tags,
  mockSavedFilters,
} from './filter-mock-data'
import { StaffMember } from '../../mock-data'

interface FilterContextType {
  filters: FilterState
  isFavorite: boolean
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
  handleFilterChange: (newFilters: Partial<FilterState>) => void
  handleTagSelect: (tagId: string) => void
  handleTagRemove: (tagId: string) => void
  handleCompanySelect: (companyId: string) => void
  handleDirectorSelect: (directorId: string) => void
  handleTribeSelect: (tribeId: string) => void
  handleReset: () => void
  handleToggleFavorite: () => void
  handleApplySavedFilter: (filterId: string) => void
  getFilteredData: <T extends StaffMember>(data: T[]) => T[]
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const useFilters = () => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}

interface FilterProviderProps {
  children: React.ReactNode
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({ ...defaultFilterState })
  const [isFavorite, setIsFavorite] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const handleTagSelect = useCallback(
    (tagId: string) => {
      const tag = tags.find((t) => t.id === tagId)
      if (tag && !filters.selectedTags.some((t) => t.id === tagId)) {
        handleFilterChange({
          selectedTags: [...filters.selectedTags, tag],
        })
      }
    },
    [filters.selectedTags, handleFilterChange],
  )

  const handleTagRemove = useCallback(
    (tagId: string) => {
      handleFilterChange({
        selectedTags: filters.selectedTags.filter((tag) => tag.id !== tagId),
      })
    },
    [filters.selectedTags, handleFilterChange],
  )

  const handleCompanySelect = useCallback(
    (companyId: string) => {
      const company = companyId === 'all' ? null : companies.find((c) => c.id === companyId) || null
      handleFilterChange({ company })
    },
    [handleFilterChange],
  )

  const handleDirectorSelect = useCallback(
    (directorId: string) => {
      const director = directorId === 'all' ? null : managingDirectors.find((d) => d.id === directorId) || null
      handleFilterChange({ managingDirector: director })
    },
    [handleFilterChange],
  )

  const handleTribeSelect = useCallback(
    (tribeId: string) => {
      const tribe = tribeId === 'all' ? null : tribes.find((t) => t.id === tribeId) || null
      handleFilterChange({ tribe })
    },
    [handleFilterChange],
  )

  const handleReset = useCallback(() => {
    setFilters({ ...defaultFilterState })
    setIsFavorite(false)
  }, [])

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite((prev) => !prev)
  }, [])

  const handleApplySavedFilter = useCallback((filterId: string) => {
    const savedFilter = mockSavedFilters.find((f) => f.id === filterId)
    if (savedFilter) {
      const { id, name, ...filterState } = savedFilter
      setFilters(filterState)
    }
  }, [])

  const getFilteredData = useCallback(
    <T extends StaffMember>(data: T[]): T[] => {
      return data.filter((item) => {
        // Person name filter
        if (filters.personName && !item.name.toLowerCase().includes(filters.personName.toLowerCase())) {
          return false
        }

        // Project filter
        if (
          filters.project &&
          !item.projects.some((p) => p.name.toLowerCase().includes(filters.project.toLowerCase()))
        ) {
          return false
        }

        // Company filter
        if (filters.company && item.companyId !== filters.company.id) {
          return false
        }

        // Managing Director filter
        if (filters.managingDirector && item.managingDirectorId !== filters.managingDirector.id) {
          return false
        }

        // Tribe filter
        if (filters.tribe && item.tribeId !== filters.tribe.id) {
          return false
        }

        // Tags filter
        if (filters.selectedTags.length > 0) {
          const hasAllTags = filters.selectedTags.every((tag) => item.tags.includes(tag.id))
          if (!hasAllTags) {
            return false
          }
        }

        return true
      })
    },
    [filters],
  )

  const value = {
    filters,
    isFavorite,
    isExpanded,
    setIsExpanded,
    handleFilterChange,
    handleTagSelect,
    handleTagRemove,
    handleCompanySelect,
    handleDirectorSelect,
    handleTribeSelect,
    handleReset,
    handleToggleFavorite,
    handleApplySavedFilter,
    getFilteredData,
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
