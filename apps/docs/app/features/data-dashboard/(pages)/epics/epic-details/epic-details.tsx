import { Epic } from '@/features/data-dashboard/types/domain'
import { EpicDetailsInProgress } from './epic-details-in-progress'
import { EpicDetailsPlanned } from './epic-details-planned'
export interface EpicDetailsProps {
  epic: Epic
}

export function EpicDetails({ epic }: EpicDetailsProps) {
  return (
    <>
      {epic.status === 'in-progress' ? (
        <EpicDetailsInProgress epic={epic}  />
      ) : epic.status === 'planned' ? (
        <EpicDetailsPlanned epic={epic}  />
      ) : null}
    </>
  )
}
