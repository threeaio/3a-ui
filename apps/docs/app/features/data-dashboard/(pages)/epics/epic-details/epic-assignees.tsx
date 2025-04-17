import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@3a.solutions/ui/tooltip'
import { cn } from '@3a.solutions/ui/lib/utils'
import { AvatarFallback, AvatarImage } from '@3a.solutions/ui/avatar'
import { Avatar } from '@3a.solutions/ui/avatar'

export function EpicAssignees({
  epicId,
  className,
  avatarClassName,
}: {
  epicId: string
  className?: string
  avatarClassName?: string
}) {
  const { getEpicAssignees } = useTasksData()
  const assignees = getEpicAssignees(epicId)

  if (!assignees.length) return null

  return (
    <div className="flex items-center gap-2">
      <div className={cn('flex -space-x-2', className)}>
        {assignees.map((employee) => (
          <Tooltip key={employee.id}>
            <TooltipTrigger>
              <Avatar className={cn('size-9', avatarClassName)}>
                {employee.avatar ? (
                  <AvatarImage src={employee.avatar} alt={employee.name} />
                ) : (
                  <AvatarFallback>{employee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                )}
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{employee.name}</TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="text-sm ml-2">{assignees.map((e) => e.name).join(', ')}</div>
    </div>
  )
}
