'use client'

import { useMemo } from 'react'
import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@3a.solutions/ui/card'
import { Button } from '@3a.solutions/ui/button'
import { getDomainBadgeColor, getStatusBadgeColor } from '@/features/data-dashboard/utils'
import { useTasksData } from '../../data-context/tasks-data-provider'
import { cn } from '@3a.solutions/ui/lib/utils'
import { ExternalLinkIcon, ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { TaskCardDetailsPlanned } from './card-details/task-card-details-planned'
import { TaskCardDetailsInProgress } from './card-details/task-card-details-in-progress'

export function EpicTaskGroupCard({ epic, tasks, className }: { epic: Epic; tasks: Task[]; className?: string }) {
  const { getEpicCost } = useTasksData()
  const currentCost = getEpicCost(epic.id)
  const SHOW_DOMAIN_COUNT = 4
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

      <CardContent className="flex-1 flex flex-col justify-between">
        {epic.status === 'planned' ? (
          <TaskCardDetailsPlanned epic={epic} currentCost={currentCost} domainExpertiseNeeded={domainExpertiseNeeded} />
        ) : (
          <TaskCardDetailsInProgress
            epic={epic}
            currentCost={currentCost}
            domainExpertiseNeeded={domainExpertiseNeeded}
          />
        )}
        <div className="self-end">
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
          <Button variant="outline" size="sm">
            <ArrowRightIcon className="size-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
