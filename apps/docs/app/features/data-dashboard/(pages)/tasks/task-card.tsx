'use client'

import { Task, TaskType } from '@/features/data-dashboard/types/domain'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { Badge } from '@3a.solutions/ui/badge'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { getStatusBadgeColor, getPriorityBadgeColor } from '@/features/data-dashboard/utils/domain-colors'

export function TaskCard({ task }: { task: Task }) {
  const { getWorkloadsByTask, getTotalWorkloadForTask, getTaskCost } = useProjectDataContext()

  // Get workload information for the task
  const workloadEntries = getWorkloadsByTask(task.id)
  const totalWorkload = getTotalWorkloadForTask(task.id)
  const taskCost = getTaskCost(task.id)

  // Format cost as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getTaskTypeVariant = (type: TaskType) => {
    switch (type) {
      case 'bugfix':
        return 'destructive'
      case 'feature':
        return 'default'
      default:
        return 'secondary'
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-start gap-10 items-baseline">
          <CardTitle className="text-base">{task.name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge className={getStatusBadgeColor(task.status)}>{task.status}</Badge>

            {task.type && <Badge variant={getTaskTypeVariant(task.type)}>{task.type}</Badge>}
            {task.priority && <Badge className={getPriorityBadgeColor(task.priority)}>{task.priority}</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {task.description && <p className="text-muted-foreground text-sm mb-4">{task.description}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Task metadata */}
          <div className="space-y-4">
            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Cost:</p>
              <div className="flex gap-2">
                <Badge variant="outline">{totalWorkload}h total</Badge>
                <Badge variant="secondary">{formatCurrency(taskCost)}</Badge>
              </div>
            </div>

            {/* Last active date */}
            {task.lastActive && (
              <div className="text-xs text-muted-foreground">Last updated: {formatDate(task.lastActive)}</div>
            )}
          </div>

          {/* Column 2: Domains */}
          <div className="space-y-4">
            {/* Expertise domains */}
            {task.relatedExpertiseDomains && task.relatedExpertiseDomains.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Domains:</p>
                <div className="flex flex-wrap gap-2">
                  {task.relatedExpertiseDomains.map((domain) => (
                    <Badge key={domain} variant="secondary">
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Workload & Assignees */}
          <div className="space-y-4">
            {/* Workload information */}
            {workloadEntries.length > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">Assignees:</p>
                </div>
                <div className="space-y-2">
                  {workloadEntries.map(({ workload, employee }) => (
                    <div key={`${task.id}-${employee.id}`} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {employee.avatar && (
                          <div className="w-5 h-5 overflow-hidden rounded-full">
                            <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span className="text-sm">{employee.name}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm text-muted-foreground">{workload.workload}h</span>
                        {/* {employee.hourlyRate && (
                          <span className="text-xs text-muted-foreground">
                            {formatCurrency(workload.workload * employee.hourlyRate)}
                          </span>
                        )} */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No assignees</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
