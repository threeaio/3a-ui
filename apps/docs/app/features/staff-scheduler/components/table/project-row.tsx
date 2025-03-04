import React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Project } from '../../mock-data'

interface ProjectRowProps {
  project: Project
  className?: string
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ project, className = '' }) => {
  return (
    <div className={cn('flex items-center h-5 pl-10 pr-4 text-sm text-muted-foreground', className)}>
      <span>{project.name}</span>
    </div>
  )
}
