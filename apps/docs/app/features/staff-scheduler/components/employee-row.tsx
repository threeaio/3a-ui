import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@3a-ui/ui/lib/utils';
import { StaffMember } from '../mock-data';

interface EmployeeRowProps {
  /**
   * Staff member data
   */
  employee: StaffMember;

  /**
   * Whether the row is expanded
   */
  isExpanded: boolean;

  /**
   * Callback when expand/collapse is toggled
   */
  onToggleExpand: () => void;

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Component for displaying employee information in the table
 */
export const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, isExpanded, onToggleExpand, className = '' }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 h-10 px-2 font-medium cursor-pointer hover:bg-muted/30 transition-colors text-sm min-w-72',
        className,
      )}
      onClick={onToggleExpand}
    >
      <button
        type="button"
        className="p-1 rounded-sm hover:bg-muted"
        onClick={(e) => {
          e.stopPropagation();
          onToggleExpand();
        }}
        aria-label={isExpanded ? 'Collapse' : 'Expand'}
      >
        {isExpanded ? (
          <ChevronDown className="size-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="size-4 text-muted-foreground" />
        )}
      </button>
      <span>{employee.name}</span>
    </div>
  );
};
