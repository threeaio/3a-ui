import React from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { Cctv } from 'lucide-react';

interface WorkloadCellProps {
  /**
   * Workload value (0-100) or null if not applicable
   */
  value: number | null;

  /**
   * Optional additional CSS classes
   */
  className?: string;

  /**
   * Whether the next cell is empty (null)
   * Used to add rounded corners on the right side
   */
  nextCellEmpty?: boolean;

  /**
   * Whether the previous cell is empty (null)
   * Used to add rounded corners on the left side
   */
  prevCellEmpty?: boolean;
}

/**
 * Cell component for displaying workload with a visual indicator
 */
export const WorkloadCell: React.FC<WorkloadCellProps> = ({
  value,
  className = '',
  nextCellEmpty = false,
  prevCellEmpty = false,
}) => {
  // Log the props to verify they're being passed correctly (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log(`WorkloadCell: value=${value}, prevCellEmpty=${prevCellEmpty}, nextCellEmpty=${nextCellEmpty}`);
  }

  if (value === null) {
    return (
      <div className={cn('flex items-center justify-center h-full', className)}>
        <span className="text-sm text-muted-foreground">—</span>
      </div>
    );
  }

  // Determine color based on workload value
  const getColorClass = (value: number) => {
    if (value <= 50) return 'bg-destructive/70';
    if (value <= 70) return 'bg-warning/70';
    return 'bg-success/70';
  };

  // Determine border radius based on adjacent cells
  const getBorderRadiusClass = () => {
    console.log(prevCellEmpty, nextCellEmpty);
    if (prevCellEmpty && nextCellEmpty) return 'rounded-full';
    if (prevCellEmpty) return 'rounded-l-full';
    if (nextCellEmpty) return 'rounded-r-full';
    return '';
  };

  return (
    <div className={cn('flex flex-col items-center justify-center h-full py-2', className)}>
      <div className="w-full flex items-center gap-2">
        <div className="w-full flex gap-2 items-center justify-center">
          <div
            className={cn('h-5 w-full flex justify-center items-center', getColorClass(value), getBorderRadiusClass())}
          >
            <span className="text-xs font-semibold text-black/60">{value}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
