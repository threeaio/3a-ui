import { useMemo } from 'react'
import { useTasksData } from '../../../data-context/tasks-data-provider'
import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { EpicTaskMetricsChart } from './epic-task-metrics-chart'
import { EpicRuntimeMetrics } from './epic-runtime-metrics'
import { EpicDomainMetrics } from './epic-domain-metrics'
import { EpicTaskDistribution } from './epic-task-distribution'
import { EpicDetailsProps } from './epic-details'
import { EpicWorkloadByType } from '@/features/data-dashboard/(pages)/epics/epic-details/epic-workload-by-type'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { TaskStatusWidget } from '@/features/data-dashboard/components/widgets/task-status-bar/task-status-widget'

export function EpicDetailsInProgress({ epic }: EpicDetailsProps) {
  const { getTasksByEpic, getWorkloadsByTask } = useTasksData()
  const { employees } = useEmployeeContext()
  const { getTaskCost, getTotalWorkloadForTask } = useProjectDataContext()

  // Get tasks for this epic
  const epicTasks = useMemo(() => getTasksByEpic(epic.id), [epic.id, getTasksByEpic])

  return (
    <div className="space-y-5">
      <Card>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-2">
            <EpicRuntimeMetrics tasks={epicTasks} getWorkloadsByTask={getWorkloadsByTask} />
          </div>
          <div className="col-span-10  border-l">
            <EpicDomainMetrics tasks={epicTasks} getWorkloadsByTask={getWorkloadsByTask} employees={employees} />
          </div>
          {/* <div className="col-span-3 col-start-10">
            <EpicTaskDistribution tasks={epicTasks} />
          </div> */}
        </div>
      </Card>

      {/* Task Status Distribution */}
      <div className="py-10">
        <TaskStatusWidget size="lg" mode="epic" epicId={epic.id} showLegend={true} />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Card className="col-span-1 h-full">
          <CardHeader>
            <CardTitle className="">Workload by type</CardTitle>
          </CardHeader>
          <CardContent>
            <EpicWorkloadByType epicId={epic.id} />
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="">Cost by task</CardTitle>
          </CardHeader>
          <CardContent>
            <EpicTaskMetricsChart
              tasks={epicTasks}
              getTaskCost={getTaskCost}
              getTotalWorkloadForTask={getTotalWorkloadForTask}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
