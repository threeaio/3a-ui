'use client'

import { Task } from '@/features/data-dashboard/types/domain'
import { Tooltip, TooltipContent, TooltipTrigger } from '@3a.solutions/ui/tooltip'
import { AnalyticsIcon } from './analytics-icon'
import { cn } from '@3a.solutions/ui/lib/utils'
import { useAnalyticsContext } from '../data-context/analytics-provider'
import { Badge } from '@3a.solutions/ui/badge'

interface TaskAnalyticsIconsProps {
  task: Task
  className?: string
  colorBySeverity?: boolean
}

const INSIGHT_LABELS = {
  NoAssigneeTaskInsight: 'Task in progress',
  HighPriorityNoAssigneeTaskInsight: 'High priority',
  StaleTaskInsight: 'No activity in 7+ days',
} as const

const INSIGHT_LABELS_LONG = {
  NoAssigneeTaskInsight: 'Task in progress without assignee',
  HighPriorityNoAssigneeTaskInsight: 'High priority task without assignee',
  StaleTaskInsight: 'Task without activity in 7+ days',
} as const

export function TaskAnalyticsIcons({ task, className, colorBySeverity = false }: TaskAnalyticsIconsProps) {
  const { getTaskInsights } = useAnalyticsContext()
  const insights = getTaskInsights(task.id)

  if (!insights.length) return null

  return (
    <div className={cn('flex gap-2', className)}>
      {insights.map((insight) => (
        <Tooltip key={insight.id}>
          <TooltipTrigger>
            <Badge
              variant="outline"
              className={cn(
                insight.severity === 'critical' && 'border-destructive',
                insight.severity === 'warning' && 'border-warning',
              )}
            >
              <AnalyticsIcon
                type={insight.type}
                severity={insight.severity}
                colorBySeverity={colorBySeverity}
                className="size-4"
              />
              {INSIGHT_LABELS[insight.type]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{INSIGHT_LABELS_LONG[insight.type]}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
