import { useMemo } from 'react'
import { useTasksData } from '../../../data-context/tasks-data-provider'
import { EpicDetailsProps } from './epic-details'
import { Badge } from '@3a.solutions/ui/badge'
import { getDomainBadgeColor } from '@/features/data-dashboard/utils/domain-to-ui'
import { Card, CardContent } from '@3a.solutions/ui/card'

export function EpicDetailsPlanned({ epic }: EpicDetailsProps) {
  const { getTasksByEpic } = useTasksData()

  // Get tasks for this epic
  const epicTasks = useMemo(() => getTasksByEpic(epic.id), [epic.id, getTasksByEpic])

  // Calculate domain expertise requirements
  const domainExpertiseNeeded = useMemo(() => {
    const domains = new Map<string, number>()
    epicTasks.forEach((task) => {
      task.relatedExpertiseDomains.forEach((domain) => {
        domains.set(domain, (domains.get(domain) || 0) + 1)
      })
    })
    return Array.from(domains.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([domain, count]) => ({ domain, count }))
  }, [epicTasks])

  // Get task tags using the provider function

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-12 gap-0">
          {/* Budget Overview */}
          <div className="col-span-6 pr-10 border-r">
            <h3 className="font-medium mb-4">Budget Overview</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Budget:</span>
                <span className="font-mono">{epic.budget.toLocaleString('de-DE')} €</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tasks Planned:</span>
                <span>{epicTasks.length}</span>
              </div>
            </div>
          </div>

          {/* Domain Expertise Requirements */}
          <div className="col-span-6 pl-5">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Required Expertise</h3>
                <div className="flex flex-wrap gap-2.5">
                  {domainExpertiseNeeded.map(({ domain, count }) => (
                    <Badge key={domain} variant="default" className={getDomainBadgeColor(domain)}>
                      {domain} ({count})
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Task Distribution */}
          {/* <div className="col-span-4">
          <EpicTaskDistribution tasks={epicTasks} />
        </div> */}
        </div>
      </CardContent>
    </Card>
  )
}
