import { cn } from '@3a.solutions/ui/lib/utils'
import { Users, Clock, DollarSign, ListTodo, Layers, LucideIcon, ListX, ArrowUp, ArrowUpRight } from 'lucide-react'
import { AnalyticsInsightType, AnalyticsSeverity } from './types/insights'

interface AnalyticsIconProps {
  type: AnalyticsInsightType
  severity?: AnalyticsSeverity
  colorBySeverity?: boolean
  className?: string
}

export function AnalyticsIcon({ type, severity = 'info', colorBySeverity = false, className }: AnalyticsIconProps) {
  const Icon: LucideIcon = (() => {
    switch (type) {
      // Task insights
      case 'NoAssigneeTaskInsight':
        return ArrowUpRight
      case 'HighPriorityNoAssigneeTaskInsight':
        return ArrowUp
      case 'StaleTaskInsight':
        return Clock

      // Epic insights
      case 'EpicBudgetInsight':
        return DollarSign
      case 'EpicTaskIssuesInsight':
        return ListX

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
    info: colorBySeverity ? 'text-foreground' : 'text-foreground',
    warning: colorBySeverity ? 'text-warning' : 'text-foreground',
    critical: colorBySeverity ? 'text-destructive' : 'text-foreground',
  }[severity]

  return <Icon className={cn(severityClassName, className)} />
}
