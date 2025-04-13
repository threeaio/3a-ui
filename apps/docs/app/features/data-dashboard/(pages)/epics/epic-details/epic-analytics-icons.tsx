'use client'

import { Epic } from '@/features/data-dashboard/types/domain'
import { AnalyticsIcon } from '@/features/data-dashboard/analytics'
import { cn } from '@3a.solutions/ui/lib/utils'
import { useAnalyticsContext } from '@/features/data-dashboard/data-context/analytics-provider'
import { Badge } from '@3a.solutions/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@3a.solutions/ui/tooltip'

interface EpicAnalyticsIconsProps {
  epic: Epic
  className?: string
  colorBySeverity?: boolean
}

const INSIGHT_LABELS = {
  EpicBudgetInsight: 'Budget issues',
  EpicTaskIssuesInsight: 'Task issues',
} as const

export function EpicAnalyticsIcons({ epic, className, colorBySeverity = false }: EpicAnalyticsIconsProps) {
  const { getEpicInsights } = useAnalyticsContext()
  const insights = getEpicInsights(epic.id)

  if (!insights.length) return null

  return (
    <div className={cn('flex gap-2', className)}>
      {insights
        .filter((insight) => insight.type !== 'EpicBudgetInsight')
        .map((insight) => (
          <Tooltip key={insight.id}>
            <TooltipTrigger>
              <div key={insight.id}>
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
                  {insight.type === 'EpicTaskIssuesInsight' && (
                    <span className="text-xs">{insight.metadata.issueCount}</span>
                  )}
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">
                {insight.severity === 'critical' && <span className="">Critical </span>}
                {INSIGHT_LABELS[insight.type]}
                {insight.type === 'EpicTaskIssuesInsight' && (
                  <>
                    : {insight.metadata.issueCount} issue{insight.metadata.issueCount !== 1 ? 's' : ''}
                  </>
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
    </div>
  )
}
