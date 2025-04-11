import { Badge } from '@3a.solutions/ui/badge'
import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'
import { Alert, AlertTitle } from '@3a.solutions/ui/alert'

export function TaskAssignees({ assignedEmployeeIds }: { assignedEmployeeIds: string[] }) {
  const { getEmployeesByIds } = useEmployeeContext()
  const assignees = getEmployeesByIds(assignedEmployeeIds)

  const SHOWN_SKILLS = 3

  if (!assignedEmployeeIds || !assignedEmployeeIds.length || !assignees.length)
    return (
      <Alert variant={'warning'}>
        <AlertTitle className="text-sm opacity-70">No assignees</AlertTitle>
      </Alert>
    )

  return (
    <div className="grid grid-cols-3 gap-5">
      {assignees.map((employee) => (
        <div key={employee.id} className="flex h-20 flex-row items-center gap-5 [&:not(:nth-child(3))]:border-r py-5">
          <div className="size-10 rounded-full overflow-hidden border-2 border-background shrink-0">
            {employee.avatar ? (
              <img src={employee.avatar} alt={employee.name} className="size-full object-cover" />
            ) : (
              <div className="size-full bg-muted flex items-center justify-center text-xs">
                {employee.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start gap-2 min-w-0 w-full">
            <div className="text-sm text-left truncate w-full">{employee.name}</div>
            {employee.skills.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1">
                {employee.skills.slice(0, SHOWN_SKILLS).map((skill) => (
                  <Badge key={skill.id} variant="secondary" className="text-xs">
                    {skill.name}
                  </Badge>
                ))}
                {employee.skills.length > SHOWN_SKILLS && (
                  <Badge variant="outline" className="text-xs">
                    +{employee.skills.length - SHOWN_SKILLS}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
