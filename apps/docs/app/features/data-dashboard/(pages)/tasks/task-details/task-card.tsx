'use client'

import { Task } from '@/features/data-dashboard/types/domain'
import { Badge } from '@3a.solutions/ui/badge'
import { useTasksData } from '../data-context/tasks-data-provider'
import { Timer, CreditCard } from 'lucide-react'

export function TaskCard({ task }: { task: Task }) {
  const { getWorkloadsByTask, getTotalWorkloadForTask, getTaskCost } = useTasksData()

  // Get workload information for the task
  const workloadEntries = getWorkloadsByTask(task.id)
  const totalWorkload = getTotalWorkloadForTask(task.id)
  const taskCost = getTaskCost(task.id)

  // Aggregate workload by employee
  const aggregatedWorkloads = workloadEntries.reduce(
    (acc, { workload, employee }) => {
      const employeeId = employee.id
      acc[employeeId] = acc[employeeId] || { employee, totalWorkload: 0 }
      acc[employeeId].totalWorkload += workload.workload
      return acc
    },
    {} as Record<string, { employee: (typeof workloadEntries)[0]['employee']; totalWorkload: number }>,
  )

  // Format cost as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
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
    <div className="flex flex-col gap-10 p-5">
      {task.description && <p className="text-muted-foreground text-sm">{task.description}</p>}

      <div className="grid grid-cols-3 gap-5 border-t ">
        <div className="grid grid-cols-2 col-span-2 gap-5 border-r pt-5">
          {/* Column 1: Task metadata */}
          <div className="">
            {/* Expertise domains */}
            {task.relatedExpertiseDomains && task.relatedExpertiseDomains.length > 0 && (
              <div className="space-y-5">
                <p className="text-xs text-muted-foreground">Domains:</p>
                <div className="flex flex-wrap gap-2">
                  {task.relatedExpertiseDomains.map((domain) => (
                    <Badge key={domain} variant="default">
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-10">
            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="space-y-5">
                <p className="text-xs text-muted-foreground">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2 space-y-5">
            <p className="text-xs text-muted-foreground">Cost:</p>
            <div className="grid grid-cols-2 gap-5">
              <span className="text-xl font-extralight flex items-center gap-2">
                <Timer className="size-4" />
                {totalWorkload}h total
              </span>
              <span className="text-xl font-extralight flex items-center gap-2">
                <CreditCard className="size-4" />
                {formatCurrency(taskCost)}
              </span>
            </div>
          </div>
        </div>
        {/* Workload information */}
        {workloadEntries.length > 0 ? (
          <div className="space-y-5  pt-5">
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">Assignees:</p>
            </div>
            <div className="space-y-5">
              {Object.values(aggregatedWorkloads).map(({ employee, totalWorkload }) => (
                <div key={`${task.id}-${employee.id}`} className="flex justify-between items-center pr-2">
                  <div className="flex items-center gap-2 ">
                    {employee.avatar && (
                      <div className="size-10 overflow-hidden rounded-full">
                        <img src={employee.avatar} alt={employee.name} className="size-full object-cover" />
                      </div>
                    )}
                    <span className="text-sm">{employee.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground">{totalWorkload}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground ">No assignees</div>
        )}

        {/* Last active date */}
        {task.lastActive && (
          <div className="text-xs text-muted-foreground mt-5">Last updated: {formatDate(task.lastActive)}</div>
        )}
      </div>
    </div>
  )
}
