import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@3a-ui/ui/tooltip'

export function EpicAssignees({ epicId }: { epicId: string }) {
  const { getEpicAssignees } = useTasksData()
  const assignees = getEpicAssignees(epicId)

  if (!assignees.length) return null

  return (
    <div className="flex -space-x-2">
      {assignees.map((employee) => (
        <Tooltip key={employee.id}>
          <TooltipTrigger>
            <div className="size-8 rounded-full overflow-hidden border-2 border-background">
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
