'use client'

import React, { useState } from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { staffMembers, getWeeklyData } from '../mock-data'
import { TimeUnitToggle, TimeUnit } from './time-unit-toggle'
import { StaffSchedulerTable } from './table/staff-scheduler-table'
import { TableFilterBar, FilterState } from './filter'
import { TableFilterBarMobile } from './filter/table-filter-bar-mobile'

interface StaffSchedulerProps {
  /**
   * Optional additional CSS classes
   */
  className?: string
}

/**
 * Main container component for the staff scheduler feature
 */
export const StaffScheduler: React.FC<StaffSchedulerProps> = ({ className = '' }) => {
  // State for time unit (month or week)
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('month')
  // State for filters
  const [filters, setFilters] = useState<FilterState | null>(null)

  // Get data based on selected time unit
  const data = timeUnit === 'month' ? staffMembers : getWeeklyData()

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    // Here you would typically filter the data based on the filters
    // For now, we're just storing the filters in state
  }

  return (
    <div className={cn('flex flex-col gap-5 w-full', className)}>
      <div className="px-0 h-40 flex flex-col justify-center">
        <h2 className="font-semibold">Staff Scheduler</h2>
        <p className="mt-1 text-muted-foreground">A tool to help you manage your staff and their workload.</p>
      </div>
      <div className="flex justify-end items-center gap-2">
        <div className="flex xl:hidden  items-center gap-2">
          <TableFilterBarMobile />
        </div>
        <TimeUnitToggle value={timeUnit} onChange={setTimeUnit} />
      </div>

      <TableFilterBar onFilterChange={handleFilterChange} className="hidden xl:block" />

      <div className="w-full">
        <StaffSchedulerTable data={data} timeUnit={timeUnit} className="max-h-[600px]" />
      </div>
    </div>
  )
}
