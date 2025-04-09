import { useMemo } from 'react'
import { Task } from '@/features/data-dashboard/types/domain'
import { Alert, AlertDescription, AlertTitle } from '@3a.solutions/ui/alert'
import { AlertCircle } from 'lucide-react'
import { analyzeTask } from '../analytics/task-analytics'
import { TaskInsight } from '../analytics/types/insights'
import { renderTaskContextMessage } from '../shared-components/analytics-message-renderer'

export function TaskAnalytics({ task }: { task: Task }) {
  const insights = useMemo(() => {
    return analyzeTask(task)
  }, [task])

  if (insights.length === 0) {
    return null
  }

  return (
    <div className="space-y-3 mb-5">
      {insights.map((insight: TaskInsight) => {
        const data = {
          priority: task.priority === 'high' || task.priority === 'critical' ? task.priority : undefined,
          daysSinceLastActive: insight.type === 'StaleTaskInsight' ? insight.metadata?.daysSinceLastActive : undefined,
        }

        return (
          <Alert key={insight.id} variant={insight.severity === 'critical' ? 'destructive' : 'warning'}>
            <AlertCircle className="size-4" />
            <AlertTitle className="capitalize">
              {insight.severity === 'critical' ? 'Critical Issue' : 'Warning'}
            </AlertTitle>
            <AlertDescription>{renderTaskContextMessage(insight.type, data)}</AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}
