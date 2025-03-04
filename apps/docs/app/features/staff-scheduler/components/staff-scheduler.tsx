'use client';

import React, { useState } from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { staffMembers, getWeeklyData } from '../mock-data';
import { TimeUnitToggle, TimeUnit } from './time-unit-toggle';
import { StaffSchedulerTable } from './table/staff-scheduler-table';
import { TableFilterBar, FilterState } from './filter';

interface StaffSchedulerProps {
  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Main container component for the staff scheduler feature
 */
export const StaffScheduler: React.FC<StaffSchedulerProps> = ({ className = '' }) => {
  // State for time unit (month or week)
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('month');
  // State for filters
  const [filters, setFilters] = useState<FilterState | null>(null);

  // Get data based on selected time unit
  const data = timeUnit === 'month' ? staffMembers : getWeeklyData();

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Here you would typically filter the data based on the filters
    // For now, we're just storing the filters in state
  };

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Staff Scheduler</h2>
        <TimeUnitToggle value={timeUnit} onChange={setTimeUnit} />
      </div>

      <TableFilterBar onFilterChange={handleFilterChange} />

      <StaffSchedulerTable data={data} timeUnit={timeUnit} className="max-h-[600px]" />
    </div>
  );
};
