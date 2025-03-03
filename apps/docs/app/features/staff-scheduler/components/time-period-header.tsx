import React from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { formatTimePeriod } from '../mock-data';

interface TimePeriodHeaderProps {
  /**
   * Time period key (e.g., '2025-01' or '2025-01-W1')
   */
  period: string;

  /**
   * Relative index (-2, -1, 0, 1, 2, etc.)
   */
  relativeIndex: number;

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Component for displaying time period headers with relative indices
 */
export const TimePeriodHeader: React.FC<TimePeriodHeaderProps> = ({ period, relativeIndex, className = '' }) => {
  const formattedPeriod = formatTimePeriod(period);

  return (
    <div
      className={cn('flex text-sm flex-col items-center justify-center h-10 px-5 text-center', className)}
      title={formattedPeriod}
    >
      <span className="font-semibold text-muted-foreground">
        {relativeIndex === 0 ? '0' : relativeIndex > 0 ? `+${relativeIndex}` : relativeIndex}
      </span>
      {/* <span className="text-xs text-muted-foreground truncate max-w-full">{formattedPeriod}</span> */}
    </div>
  );
};
