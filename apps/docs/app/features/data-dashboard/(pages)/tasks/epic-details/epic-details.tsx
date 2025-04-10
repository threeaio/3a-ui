import { Epic } from '@/features/data-dashboard/types/domain'
import { EpicDetailsInProgress } from './epic-details-in-progress'
import { EpicDetailsPlanned } from './epic-details-planned'
import { EpicAnalyticsInsights } from './epic-analytics-insights'
import { useTasksData } from '../../../data-context/tasks-data-provider'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { useMemo } from 'react'

export interface EpicDetailsProps {
  epic: Epic
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function EpicDetails({ epic, isOpen, onOpenChange }: EpicDetailsProps) {
  return (
    <>
      {epic.status === 'in-progress' ? (
        <EpicDetailsInProgress epic={epic} isOpen={isOpen} onOpenChange={onOpenChange} />
      ) : epic.status === 'planned' ? (
        <EpicDetailsPlanned epic={epic} isOpen={isOpen} onOpenChange={onOpenChange} />
      ) : null}
    </>
  )
}
