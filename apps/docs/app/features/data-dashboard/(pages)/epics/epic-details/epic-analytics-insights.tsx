import { Epic } from '@/features/data-dashboard/types/domain'
import { Alert, AlertDescription, AlertTitle } from '@3a.solutions/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { EpicBudgetInsight, renderEpicMessage } from '@/features/data-dashboard/analytics'
import { useAnalyticsContext } from '@/features/data-dashboard/data-context/analytics-provider'
import { AIButton } from 'node_modules/@3a.solutions/ui/src/ui/button'
import { CardFooter, CardTitle } from '@3a.solutions/ui/card'
import { CardHeader } from '@3a.solutions/ui/card'
import { CardContent } from '@3a.solutions/ui/card'
import { Card } from '@3a.solutions/ui/card'

function isBudgetInsight(insight: EpicBudgetInsight | any): insight is EpicBudgetInsight {
  return insight.type === 'EpicBudgetInsight'
}

export function EpicAnalyticsInsights({ epic }: { epic: Epic }) {
  const { allTasks } = useTasksData()
  const { getEpicInsights } = useAnalyticsContext()

  const insights = getEpicInsights(epic.id)

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Epic Analytics Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex flex-col gap-2">
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
                  <AlertTitle>{insight.severity === 'critical' ? 'Critical Issue' : 'Warning'}</AlertTitle>
                  <AlertDescription>{renderEpicMessage(insight.type, data)}</AlertDescription>
                </Alert>
              )
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-center border-t">
        <AIButton>Generate AI Insights</AIButton>
      </CardFooter>
    </Card>
  )
}
