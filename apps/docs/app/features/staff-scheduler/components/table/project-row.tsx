import React from 'react';
import { cn } from '@3a-ui/ui/lib/utils';
import { Project } from '../../mock-data';

interface ProjectRowProps {
  /**
   * Project data
   */
  project: Project;

  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Component for displaying project information in the table
 */
export const ProjectRow: React.FC<ProjectRowProps> = ({ project, className = '' }) => {
  return (
    <div className={cn('flex items-center h-5 pl-10 pr-4 text-sm text-muted-foreground', className)}>
      <span>{project.name}</span>
    </div>
  );
};
