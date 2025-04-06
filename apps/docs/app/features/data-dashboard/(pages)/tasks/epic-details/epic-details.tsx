import { useMemo } from 'react'
import { Epic, ProjectMilestone } from '@/features/data-dashboard/types/domain'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3a.solutions/ui/accordion'
import { Button } from '@3a.solutions/ui/button'
import { ActivityMatrix } from '@/features/data-dashboard/components/widgets/activity-matrix'
import { useTasksData } from '../data-context/tasks-data-provider'
import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { EpicTaskMetricsChart } from './epic-task-metrics-chart'
import { EpicRuntimeMetrics } from './epic-runtime-metrics'
import { EpicDomainMetrics } from './epic-domain-metrics'
import { EpicTaskDistribution } from './epic-task-distribution'

interface EpicDetailsProps {
  epic: Epic
  onExpandChange: (isExpanded: boolean) => void
}

export function EpicDetails({ epic, onExpandChange }: EpicDetailsProps) {
  const { getTasksByEpic, getWorkloadsByTask } = useTasksData()
  const { employees } = useEmployeeContext()
  const { milestones, getTaskCost, getTotalWorkloadForTask } = useProjectDataContext()

  // Get project start date from milestone
  const projectStartDate = useMemo(() => {
    const startMilestone = milestones.find((m: ProjectMilestone) => m.type === 'ProjectStart')
    return startMilestone ? new Date(startMilestone.dueDate) : new Date()
  }, [milestones])

  // Get tasks for this epic
  const epicTasks = useMemo(() => getTasksByEpic(epic.id), [epic.id, getTasksByEpic])

  // Transform task workloads into the format needed by ActivityMatrix
  const workloads = useMemo(() => {
    return epicTasks.flatMap((task) =>
      getWorkloadsByTask(task.id).map(({ workload, employee }) => ({
        taskId: task.id,
        workload: workload.workload,
        userId: employee.id,
        date: workload.date,
      })),
    )
  }, [epicTasks, getWorkloadsByTask])

  return (
    <Accordion type="single" collapsible onValueChange={(value) => onExpandChange(!!value)}>
      <AccordionItem value="details">
        <div className="flex py-5">
          <AccordionTrigger>Epic Details</AccordionTrigger>
        </div>
        <AccordionContent>
          <div className="pb-5">
            <div className="grid grid-cols-4 gap-5 mt-10 mb-30">
              <div className="col-span-1">
                <EpicRuntimeMetrics tasks={epicTasks} getWorkloadsByTask={getWorkloadsByTask} />
              </div>
              <div className="col-span-2 ">
                <EpicDomainMetrics tasks={epicTasks} getWorkloadsByTask={getWorkloadsByTask} employees={employees} />
              </div>
              <div className="col-span-1">
                <EpicTaskDistribution tasks={epicTasks} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 px-5">
              <div className="col-span-1">
                <h4 className="mb-5 font-semibold">Activity</h4>
                <ActivityMatrix
                  workloads={workloads}
                  employees={employees}
                  startDate={projectStartDate}
                  onDayClick={(day) => {
                    console.log('Day clicked:', day)
                  }}
                />
              </div>
              <div className="col-span-1">
                <EpicTaskMetricsChart
                  tasks={epicTasks}
                  getTaskCost={getTaskCost}
                  getTotalWorkloadForTask={getTotalWorkloadForTask}
                />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
