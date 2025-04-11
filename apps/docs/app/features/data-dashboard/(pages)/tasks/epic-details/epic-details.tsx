import { Epic } from '@/features/data-dashboard/types/domain'
import { EpicDetailsInProgress } from './epic-details-in-progress'
import { EpicDetailsPlanned } from './epic-details-planned'
import { EpicAnalyticsInsights } from '@/features/data-dashboard/(pages)/tasks/epic-details/epic-analytics-insights'

export interface EpicDetailsProps {
  epic: Epic
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function EpicDetails({ epic, isOpen, onOpenChange }: EpicDetailsProps) {
  return (
    <>
      {/* <EpicAnalyticsInsights epic={epic} /> */}
      {epic.status === 'in-progress' ? (
        <EpicDetailsInProgress epic={epic} isOpen={isOpen} onOpenChange={onOpenChange} />
      ) : epic.status === 'planned' ? (
        <EpicDetailsPlanned epic={epic} isOpen={isOpen} onOpenChange={onOpenChange} />
      ) : null}
    </>
  )
}
