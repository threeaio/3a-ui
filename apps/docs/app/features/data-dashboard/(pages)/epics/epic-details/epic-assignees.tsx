import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@3a.solutions/ui/tooltip'
import { cn } from '@3a.solutions/ui/lib/utils'

export function EpicAssignees({ epicId, className }: { epicId: string; className?: string }) {
  const { getEpicAssignees } = useTasksData()
  const assignees = getEpicAssignees(epicId)

  if (!assignees.length) return null

  return (
    <div className={cn('flex -space-x-2', className)}>
      {assignees.map((employee) => (
        <Tooltip key={employee.id}>
          <TooltipTrigger>
            <div className="size-9 rounded-full overflow-hidden border-2 border-background">
              {employee.avatar ? (
                <img src={employee.avatar} alt={employee.name} className="size-full object-cover" />
              ) : (
                <div className="size-full bg-muted flex items-center justify-center text-xs">
                  {employee.name.charAt(0)}
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>{employee.name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
