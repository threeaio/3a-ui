'use client'

import React, { useState } from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { staffMembers, getWeeklyData } from '../mock-data'
import { TimeUnitToggle, TimeUnit } from './time-unit-toggle'
import { StaffSchedulerTable } from './table/staff-scheduler-table'
import { TableFilterBar } from './filter/table-filter-bar'
import { TableFilterBarMobile } from './filter/table-filter-bar-mobile'
import { FilterProvider, useFilters } from './filter/filter-context'
import { SavedFiltersPanel } from './filter/saved-filters-panel'

interface StaffSchedulerProps {
  /**
   * Optional additional CSS classes
   */
  className?: string
}

const StaffSchedulerContent: React.FC<StaffSchedulerProps> = ({ className = '' }) => {
  // State for time unit (month or week)
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('month')
  const { getFilteredData } = useFilters()

  // Get data based on selected time unit and apply filters
  const rawData = timeUnit === 'month' ? staffMembers : getWeeklyData()
  const filteredData = getFilteredData(rawData)

  return (
    <div className={cn('flex flex-col gap-5 w-full', className)}>
      <div className="px-0 h-40 flex flex-col justify-center">
        <h2 className="font-semibold">Staff Scheduler</h2>
        <p className="mt-1 text-muted-foreground">A tool to help you manage your staff and their workload.</p>
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="flex xl:hidden items-center gap-2">
          <SavedFiltersPanel />
          <TableFilterBarMobile />
        </div>
        <TimeUnitToggle value={timeUnit} onChange={setTimeUnit} />
      </div>

      <TableFilterBar className="hidden xl:block" />

      <div className="w-full">
        <StaffSchedulerTable data={filteredData} timeUnit={timeUnit} className="max-h-[600px]" />
      </div>
    </div>
  )
}

/**
 * Main container component for the staff scheduler feature
 */
export const StaffScheduler: React.FC<StaffSchedulerProps> = (props) => {
  return (
    <FilterProvider>
      <StaffSchedulerContent {...props} />
    </FilterProvider>
  )
}
