import { Task } from '@/features/data-dashboard/types/domain'
import { Alert, AlertDescription, AlertTitle } from '@3a.solutions/ui/alert'
import { AlertCircle } from 'lucide-react'
import { renderTaskContextMessage, TaskInsight } from '@/features/data-dashboard/analytics'
import { useAnalyticsContext } from '@/features/data-dashboard/data-context/analytics-provider'

export function TaskAnalytics({ task }: { task: Task }) {
  const { getTaskInsights } = useAnalyticsContext()
  const insights = getTaskInsights(task.id)

  if (insights.length === 0) {
    return null
  }

  return (
    <div className="space-y-2.5">
      {insights.map((insight) => {
        const data = {
          priority: task.priority === 'high' || task.priority === 'critical' ? task.priority : undefined,
          daysSinceLastActive: insight.type === 'StaleTaskInsight' ? insight.metadata?.daysSinceLastActive : undefined,
        }

        return (
          <Alert key={insight.id} variant={insight.severity === 'critical' ? 'destructive' : 'warning'}>
            <AlertCircle className="size-4" />
            <AlertTitle>{renderTaskContextMessage(insight.type, data)}</AlertTitle>
            {/* <AlertDescription></AlertDescription> */}
          </Alert>
        )
      })}
    </div>
  )
}
