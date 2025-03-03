'use client';

import React, { useState } from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { staffMembers, getWeeklyData } from '../mock-data';
import { TimeUnitToggle, TimeUnit } from './time-unit-toggle';
import { StaffSchedulerTable } from './staff-scheduler-table';

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

  // Get data based on selected time unit
  const data = timeUnit === 'month' ? staffMembers : getWeeklyData();

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Staff Scheduler</h2>
        <TimeUnitToggle value={timeUnit} onChange={setTimeUnit} />
      </div>

      <StaffSchedulerTable data={data} timeUnit={timeUnit} className="max-h-[600px]" />
    </div>
  );
};
