'use client'

import { useMemo } from 'react'
import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@3a.solutions/ui/card'
import { Button } from '@3a.solutions/ui/button'
import { getStatusBadgeColor, getDomainBadgeColor } from '@/features/data-dashboard/utils'
import { useTasksData } from '../../data-context/tasks-data-provider'
import { cn } from '@3a.solutions/ui/lib/utils'
import { ExternalLinkIcon, ArrowRightIcon } from 'lucide-react'
import { EpicAnalyticsIcons } from '@/features/data-dashboard/(pages)/epics/epic-details/epic-analytics-icons'
import { EpicAssignees } from '@/features/data-dashboard/(pages)/epics/epic-details/epic-assignees'
import { TaskStatusWidget } from '@/features/data-dashboard/components/widgets/task-status-bar/task-status-widget'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import Link from 'next/link'
import { sectionLabelClassName } from '@/ui/core-layout/section-label'

export function EpicTaskGroupCards({ epic, tasks, className }: { epic: Epic; tasks: Task[]; className?: string }) {
  const { getEpicCost } = useTasksData()
  const { getTotalWorkloadForTask } = useProjectDataContext()

  const currentCost = getEpicCost(epic.id)
  const percentage = epic.budget ? Math.round((currentCost / epic.budget) * 100) : 0

  const SHOW_DOMAIN_COUNT = 6

  // Calculate domain expertise requirements
  const domainExpertiseNeeded = useMemo(() => {
    const domains = new Map<string, number>()
    tasks.forEach((task) => {
      task.relatedExpertiseDomains.forEach((domain) => {
        domains.set(domain, (domains.get(domain) || 0) + 1)
      })
    })
    return Array.from(domains.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([domain, count]) => ({ domain, count }))
  }, [tasks])

  // Calculate total workload for in-progress epics
  const totalWorkload = useMemo(() => {
    if (epic.status !== 'in-progress') return null
    return tasks.reduce((acc, task) => acc + getTotalWorkloadForTask(task.id), 0)
  }, [tasks, getTotalWorkloadForTask, epic.status])

  return (
    <Card className={cn('', className)}>
      <CardHeader className="border-b h-20">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="flex items-start flex-col gap-2">
              <h2 className="font-semibold leading-none">{epic.name}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">{epic.description}</p>
            </div>
            <Badge className={getStatusBadgeColor(epic.status)}>{epic.status}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-5 flex-1">
        <div className="self-start flex flex-col gap-5">
          <div className="flex items-center justify-between ">
            <EpicAssignees epicId={epic.id} />
            <div>
              <EpicAnalyticsIcons epic={epic} colorBySeverity={false} />
            </div>
          </div>
          {/* Budget and Task Count */}
          <div className="flex  items-center justify-between gap-5 ">
            <span className={cn(sectionLabelClassName)}>Budget</span>
            {epic.budget ? (
              <div
                className={cn(
                  'font-mono tabular-nums border-default text-sm ',
                  percentage > 100 && 'border-destructive text-destructive',
                  percentage > 80 && percentage <= 100 && 'border-warning text-warning',
                )}
              >
                {currentCost > 0 && <span>{currentCost.toLocaleString('de-DE')} € | </span>}
                {epic.budget.toLocaleString('de-DE')} €
              </div>
            ) : (
              <span></span>
            )}
          </div>
        </div>

        {/* Task Status Distribution */}
        {epic.status !== 'planned' && (
          <div className="space-y-2">
            <TaskStatusWidget size="sm" mode="epic" epicId={epic.id} showLegend={false} />
          </div>
        )}

        <div className="border-t pt-5 self-end">
          <div className="flex justify-end flex-wrap gap-2">
            {domainExpertiseNeeded.slice(0, SHOW_DOMAIN_COUNT).map(({ domain }) => (
              <Badge key={domain} variant="outline">
                <span className={cn(getDomainBadgeColor(domain), 'size-2 rounded-full inline-block -ml-0.5')}></span>
                {domain}
              </Badge>
            ))}
            {domainExpertiseNeeded.length > SHOW_DOMAIN_COUNT && (
              <Badge variant="secondary">+{domainExpertiseNeeded.length - SHOW_DOMAIN_COUNT}</Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t justify-between">
        <Button variant="ghost" className="text-sm">
          <ExternalLinkIcon className="size-4" />
          Open in Jira
        </Button>
        <Link href={`/features/data-dashboard/epics/${epic.id}`}>
          <Button variant="secondary" size="sm">
            <ArrowRightIcon className="size-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
