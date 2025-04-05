import { useMemo } from 'react'
import { Epic } from '@/features/data-dashboard/types/domain'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3a.solutions/ui/accordion'
import { Button } from '@3a.solutions/ui/button'
import { ActivityMatrix } from '@/features/data-dashboard/components/widgets/activity-matrix'
import { useTasksData } from './data-context/tasks-data-provider'
import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'

interface EpicDetailsProps {
  epic: Epic
  onExpandChange: (isExpanded: boolean) => void
}

export function EpicDetails({ epic, onExpandChange }: EpicDetailsProps) {
  const { getTasksByEpic, getWorkloadsByTask } = useTasksData()
  const { employees } = useEmployeeContext()

  // Transform task workloads into the format needed by ActivityMatrix
  const workloads = useMemo(() => {
    const tasks = getTasksByEpic(epic.id)
    return tasks.flatMap((task) =>
      getWorkloadsByTask(task.id).map(({ workload, employee }) => ({
        taskId: task.id,
        workload: workload.workload,
        userId: employee.id,
        date: workload.date,
      })),
    )
  }, [epic.id, getTasksByEpic, getWorkloadsByTask])

  return (
    <Accordion type="single" collapsible onValueChange={(value) => onExpandChange(!!value)}>
      <AccordionItem value="details">
        <div className="flex py-5">
          <Button variant="link" size="sm" asChild>
            <AccordionTrigger>Epic Details</AccordionTrigger>
          </Button>
        </div>
        <AccordionContent>
          <div className="space-y-10">
            <div className="grid grid-cols-3 gap-5">
              <div>
                <h4 className="mb-5">Description</h4>
                <p className="text-sm text-muted-foreground">{epic.description}</p>
              </div>
              <div className="col-span-2">
                <h4 className="mb-5">Activity</h4>
                <ActivityMatrix
                  workloads={workloads}
                  employees={employees}
                  onDayClick={(day) => {
                    console.log('Day clicked:', day)
                  }}
                />
              </div>
              <div></div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
