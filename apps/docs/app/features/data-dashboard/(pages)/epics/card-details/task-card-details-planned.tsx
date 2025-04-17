import { Epic } from '@/features/data-dashboard/types/domain'
import { cn } from '@3a.solutions/ui/lib/utils'
import { sectionLabelClassName } from '@/ui/core-layout/section-label'
import { EpicAnalyticsIcons } from '../epic-details/epic-analytics-icons'
import { EpicAssignees } from '../epic-details/epic-assignees'

interface TaskCardDetailsPlannedProps {
  epic: Epic
  currentCost: number
  domainExpertiseNeeded: Array<{ domain: string; count: number }>
  className?: string
}

export function TaskCardDetailsPlanned({ epic, currentCost, className }: TaskCardDetailsPlannedProps) {
  const percentage = epic.budget ? Math.round((currentCost / epic.budget) * 100) : 0

  return (
    <div className={cn('flex-1', className)}>
      <div className="self-start flex flex-col gap-5">
        <div className="flex items-center justify-between ">
          <EpicAssignees epicId={epic.id} />
          <div>
            <EpicAnalyticsIcons epic={epic} colorBySeverity={false} />
          </div>
        </div>
        {/* Budget and Task Count */}
        <div className="flex items-center justify-between gap-5">
          <span className={cn(sectionLabelClassName)}>Budget</span>
          {epic.budget ? (
            <div className={cn('font-mono tabular-nums border-default text-sm flex items-center')}>
              {percentage > 100 && <span className="size-2 rounded-full bg-destructive inline-block mr-2"></span>}
              {currentCost > 0 && <span>{currentCost.toLocaleString('de-DE')} € |&nbsp;</span>}
              {epic.budget.toLocaleString('de-DE')} €
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  )
}
