import { cn } from '@3a.solutions/ui/lib/utils'
import { Users, Clock, DollarSign, ListTodo, Layers, LucideIcon } from 'lucide-react'
import { AnalyticsInsightType, AnalyticsSeverity } from './types/insights'

interface AnalyticsIconProps {
  type: AnalyticsInsightType
  severity?: AnalyticsSeverity
  className?: string
}

export function AnalyticsIcon({ type, severity = 'info', className }: AnalyticsIconProps) {
  const Icon: LucideIcon = (() => {
    switch (type) {
      // Task insights
      case 'NoAssigneeTaskInsight':
      case 'HighPriorityNoAssigneeTaskInsight':
        return Users
      case 'StaleTaskInsight':
        return Clock

      // Epic insights
      case 'EpicBudgetInsight':
        return DollarSign
      case 'EpicTaskIssuesInsight':
        return ListTodo

      // Project insights
      case 'TooManyEpicsInsight':
        return Layers
      case 'ProjectBudgetInsight':
        return DollarSign
      case 'EmployeeLoadInsight':
        return Users
      case 'ProjectEpicIssuesInsight':
        return ListTodo
    }
  })()

  const severityClassName = {
    info: 'text-foreground',
    warning: 'text-foreground',
    critical: 'text-foreground',
  }[severity]

  return <Icon className={cn(severityClassName, className)} />
}
