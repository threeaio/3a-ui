import { Epic } from '@/features/data-dashboard/types/domain'
import { Alert, AlertDescription, AlertTitle } from '@3a.solutions/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { EpicBudgetInsight, renderEpicMessage } from '@/features/data-dashboard/analytics'
import { useAnalyticsContext } from '@/features/data-dashboard/data-context/analytics-provider'

function isBudgetInsight(insight: EpicBudgetInsight | any): insight is EpicBudgetInsight {
  return insight.type === 'EpicBudgetInsight'
}

export function EpicAnalyticsInsights({ epic }: { epic: Epic }) {
  const { allTasks } = useTasksData()
  const { getEpicInsights } = useAnalyticsContext()

  const insights = getEpicInsights(epic.id)

  if (insights.length === 0) {
    return null
  }

  return (
    <div className="space-y-3 mb-5 -mx-1.5 py-5">
      {insights.map((insight) => {
        const data = isBudgetInsight(insight)
          ? {
              percentageUsed: insight.metadata.percentageUsed,
              remainingBudget: insight.metadata.remaining,
            }
          : {
              unassignedInProgress: allTasks.filter((t) =>
                insight.metadata.affectedTasks.some(
                  (taskInsight) => taskInsight.entityId === t.id && taskInsight.type === 'NoAssigneeTaskInsight',
                ),
              ),
              highPriorityUnassigned: allTasks.filter((t) =>
                insight.metadata.affectedTasks.some(
                  (taskInsight) =>
                    taskInsight.entityId === t.id && taskInsight.type === 'HighPriorityNoAssigneeTaskInsight',
                ),
              ),
              staleTasks: allTasks.filter((t) =>
                insight.metadata.affectedTasks.some(
                  (taskInsight) => taskInsight.entityId === t.id && taskInsight.type === 'StaleTaskInsight',
                ),
              ),
            }

        return (
          <Alert key={insight.id} variant={insight.severity === 'critical' ? 'destructive' : 'warning'}>
            <AlertCircle className="size-4" />
            <AlertTitle>
              {insight.severity === 'critical' ? 'Critical Issue' : 'Warning'}
            </AlertTitle>
            <AlertDescription>{renderEpicMessage(insight.type, data)}</AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}
