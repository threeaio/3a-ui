import { useMemo } from 'react'
import { Epic, ProjectMilestone } from '@/features/data-dashboard/types/domain'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3a.solutions/ui/accordion'
import { ActivityMatrix } from '@/features/data-dashboard/components/widgets/activity-matrix'
import { useTasksData } from '../../../data-context/tasks-data-provider'
import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { EpicTaskMetricsChart } from './epic-task-metrics-chart'
import { EpicRuntimeMetrics } from './epic-runtime-metrics'
import { EpicDomainMetrics } from './epic-domain-metrics'
import { EpicTaskDistribution } from './epic-task-distribution'
import { EpicDetailsProps } from './epic-details'
import { EpicAnalyticsInsights } from '@/features/data-dashboard/(pages)/tasks/epic-details/epic-analytics-insights'
import { EpicWorkloadByType } from '@/features/data-dashboard/(pages)/tasks/epic-details/epic-workload-by-type'

export function EpicDetailsInProgress({ epic, isOpen, onOpenChange }: EpicDetailsProps) {
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
    <Accordion
      type="single"
      value={isOpen ? 'details' : ''}
      onValueChange={(value) => onOpenChange(value === 'details')}
    >
      <AccordionItem value="details" className="border-none mt-5">
        <AccordionContent>
          <div className="pt-5 pb-5">
            <div className="grid grid-cols-12 gap-5 mt-5 mb-20">
              <div className="col-span-2">
                <EpicRuntimeMetrics tasks={epicTasks} getWorkloadsByTask={getWorkloadsByTask} />
              </div>
              <div className="col-span-5 col-start-4 border-x">
                <EpicDomainMetrics tasks={epicTasks} getWorkloadsByTask={getWorkloadsByTask} employees={employees} />
              </div>
              <div className="col-span-3 col-start-10">
                <EpicTaskDistribution tasks={epicTasks} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-20 px-5">
              <div className="col-span-1 h-full">
                <h4 className="mb-5 font-semibold">Workload by type</h4>
                {/* <ActivityMatrix
                  workloads={workloads}
                  employees={employees}
                  startDate={projectStartDate}
                  onDayClick={(day) => {
                    console.log('Day clicked:', day)
                  }}
                /> */}
                <EpicWorkloadByType epicId={epic.id} />
              </div>
              <div className="col-span-1">
                <h4 className="mb-5 font-semibold">Cost by task</h4>
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
