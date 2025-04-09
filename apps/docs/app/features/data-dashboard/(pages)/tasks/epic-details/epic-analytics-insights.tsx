import { useMemo } from 'react'
import { Epic } from '@/features/data-dashboard/types/domain'
import { Alert, AlertDescription, AlertTitle } from '@3a.solutions/ui/alert'
import { AlertCircle } from 'lucide-react'
import { analyzeEpic } from '../analytics/epic-analytics'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { useTasksData } from '@/features/data-dashboard/(pages)/tasks/data-context/tasks-data-provider'
import { renderEpicMessage } from '../shared-components/analytics-message-renderer'
import { EpicBudgetInsight, EpicTaskIssuesInsight } from '../analytics/types/insights'
import { analyzeTask } from '../analytics/task-analytics'

function isBudgetInsight(insight: EpicBudgetInsight | EpicTaskIssuesInsight): insight is EpicBudgetInsight {
  return insight.type === 'EpicBudgetInsight'
}

export function EpicAnalyticsInsights({ epic }: { epic: Epic }) {
  const { getTasksByEpic } = useTasksData()
  const { getTaskCost } = useProjectDataContext()

  const tasks = useMemo(() => getTasksByEpic(epic.id), [epic.id, getTasksByEpic])
  const totalCost = useMemo(() => tasks.reduce((sum, task) => sum + getTaskCost(task.id), 0), [tasks, getTaskCost])

  // First analyze individual tasks to get task insights
  const taskInsights = useMemo(() => {
    return tasks.flatMap((task) => analyzeTask(task))
  }, [tasks])

  const insights = useMemo(() => {
    return analyzeEpic(epic, tasks, totalCost, taskInsights)
  }, [epic, tasks, totalCost, taskInsights])

  if (insights.length === 0) {
    return null
  }

  return (
    <div className="space-y-3 mb-5">
      {insights.map((insight) => {
        const data = isBudgetInsight(insight)
          ? {
              percentageUsed: insight.metadata.percentageUsed,
              remainingBudget: insight.metadata.remaining,
            }
          : {
              unassignedInProgress: tasks.filter((t) =>
                insight.metadata.affectedTasks.some(
                  (taskInsight) => taskInsight.entityId === t.id && taskInsight.type === 'NoAssigneeTaskInsight',
                ),
              ),
              highPriorityUnassigned: tasks.filter((t) =>
                insight.metadata.affectedTasks.some(
                  (taskInsight) =>
                    taskInsight.entityId === t.id && taskInsight.type === 'HighPriorityNoAssigneeTaskInsight',
                ),
              ),
              staleTasks: tasks.filter((t) =>
                insight.metadata.affectedTasks.some(
                  (taskInsight) => taskInsight.entityId === t.id && taskInsight.type === 'StaleTaskInsight',
                ),
              ),
            }

        return (
          <Alert key={insight.id} variant={insight.severity === 'critical' ? 'destructive' : 'warning'}>
            <AlertCircle className="size-4" />
            <AlertTitle className="capitalize">
              {insight.severity === 'critical' ? 'Critical Issue' : 'Warning'}
            </AlertTitle>
            <AlertDescription>{renderEpicMessage(insight.type, data)}</AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}
