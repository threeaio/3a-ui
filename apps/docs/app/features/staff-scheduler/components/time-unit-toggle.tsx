import React from 'react'
import { Button } from '@3a.solutions/ui/button'
export type TimeUnit = 'month' | 'week'

interface TimeUnitToggleProps {
  /**
   * Current selected time unit
   */
  value: TimeUnit

  /**
   * Callback when time unit changes
   */
  onChange: (value: TimeUnit) => void

  /**
   * Optional additional CSS classes
   */
  className?: string
}

/**
 * Toggle component for switching between month and week views
 */
export const TimeUnitToggle: React.FC<TimeUnitToggleProps> = ({ value, onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 py-5 ${className}`}>
      <div className="flex rounded-md overflow-hidden border border-border">
        <Button
          type="button"
          variant={value === 'month' ? 'default' : 'outline'}
          className="rounded-none border-0"
          onClick={() => onChange('month')}
        >
          Months
        </Button>
        <Button
          type="button"
          variant={value === 'week' ? 'default' : 'outline'}
          className="rounded-none border-0"
          onClick={() => onChange('week')}
        >
          Weeks
        </Button>
      </div>
    </div>
  )
}
