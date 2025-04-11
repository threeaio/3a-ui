import { Tooltip, TooltipTrigger, TooltipContent } from '@3a.solutions/ui/tooltip'

import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'

export function TaskAssignees({ assignedEmployeeIds }: { assignedEmployeeIds: string[] }) {
  const { getEmployeesByIds } = useEmployeeContext()
  const assignees = getEmployeesByIds(assignedEmployeeIds)

  if (!assignedEmployeeIds || !assignedEmployeeIds.length || !assignees.length) return <div></div>

  return (
    <div className="flex -space-x-2">
      {assignees.map((employee) => (
        <Tooltip key={employee.id}>
          <TooltipTrigger>
            <div className="size-10 rounded-full overflow-hidden border-2 border-background">
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
