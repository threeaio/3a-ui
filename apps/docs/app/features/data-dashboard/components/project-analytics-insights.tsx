'use client'
import { Alert, AlertDescription, AlertTitle } from '@3a.solutions/ui/alert'
import { AlertCircle } from 'lucide-react'
import { ProjectInsight, renderProjectMessage } from '@/features/data-dashboard/analytics'
import { useAnalyticsContext } from '@/features/data-dashboard/data-context/analytics-provider'

function getInsightTitle(type: ProjectInsight['type'], severity: ProjectInsight['severity']): string {
  switch (type) {
    case 'TooManyEpicsInsight':
      return 'Epic Workload Alert'
    case 'ProjectBudgetInsight':
      return 'Budget Status Alert'
    case 'EmployeeLoadInsight':
      return 'Resource Allocation Alert'
    case 'ProjectEpicIssuesInsight':
      return severity === 'critical' ? 'Critical Epic Issues' : 'Epic Warnings'
    default:
      return severity === 'critical' ? 'Critical Issue' : 'Warning'
  }
}

export function ProjectAnalyticsInsights() {
  const { projectInsights } = useAnalyticsContext()

  if (projectInsights.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {projectInsights.map((insight: ProjectInsight) => {
        // Extract data based on insight type
        let data = {}

        if (insight.type === 'TooManyEpicsInsight') {
          data = {
            activeEpicsCount: insight.metadata.activeEpicsCount,
            maxRecommended: insight.metadata.maxRecommended,
          }
        } else if (insight.type === 'ProjectBudgetInsight') {
          data = {
            projectName: insight.metadata.projectName,
            percentageUsed: insight.metadata.percentageUsed,
          }
        } else if (insight.type === 'EmployeeLoadInsight') {
          data = {
            employeeTaskCount: insight.metadata.taskCount,
            threshold: insight.metadata.threshold,
            employeeName: insight.metadata.employeeName,
          }
        } else if (insight.type === 'ProjectEpicIssuesInsight') {
          data = {
            affectedEpics: insight.metadata.affectedEpics,
          }
        }

        return (
          <Alert key={insight.id} variant={insight.severity === 'critical' ? 'destructive' : 'warning'}>
            <AlertCircle className="size-4" />
            <AlertTitle className="capitalize">{getInsightTitle(insight.type, insight.severity)}</AlertTitle>
            <AlertDescription>{renderProjectMessage(insight.type, data)}</AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}
