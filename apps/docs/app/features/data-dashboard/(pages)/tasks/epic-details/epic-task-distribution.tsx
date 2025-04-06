import { useMemo } from 'react'
import { Task, TaskType, TaskStatus } from '@/features/data-dashboard/types/domain'
import { STATUS_COLORS, STATUS_ORDER, getTaskTypeIcon } from '@/features/data-dashboard/utils'
import { cn } from '@3a.solutions/ui/lib/utils'

const TASK_TYPES: TaskType[] = ['feature', 'bugfix', 'refactoring', 'maintenance', 'design', 'change-request']
const ALL_STATUSES = Object.keys(STATUS_ORDER) as TaskStatus[]

interface EpicTaskDistributionProps {
  tasks: Task[]
}

type DistributionItem = {
  type: TaskType
  count: number
  percentage: number
}

type StatusDistributionItem = {
  status: TaskStatus
  count: number
  percentage: number
}

type CollapsedItem = {
  items: (TaskType | TaskStatus)[]
  isCollapsed: true
}

function collapseZeroItems<T extends DistributionItem | StatusDistributionItem>(
  items: T[],
  getKey: (item: T) => TaskType | TaskStatus,
): (T | CollapsedItem)[] {
  const result: (T | CollapsedItem)[] = []
  let currentZeroGroup: (TaskType | TaskStatus)[] = []

  items.forEach((item, index) => {
    if (item.count === 0) {
      currentZeroGroup.push(getKey(item))
    } else {
      if (currentZeroGroup.length > 1) {
        result.push({ items: [...currentZeroGroup], isCollapsed: true })
        currentZeroGroup = []
      } else if (currentZeroGroup.length === 1) {
        const previousItem = items[index - 1]
        if (previousItem) {
          result.push(previousItem)
        }
        currentZeroGroup = []
      }
      result.push(item)
    }
  })

  // Handle remaining zero group at the end
  if (currentZeroGroup.length > 1) {
    result.push({ items: [...currentZeroGroup], isCollapsed: true })
  } else if (currentZeroGroup.length === 1) {
    const lastItem = items[items.length - 1]
    if (lastItem) {
      result.push(lastItem)
    }
  }

  return result
}

export function EpicTaskDistribution({ tasks }: EpicTaskDistributionProps) {
  const { typeDistribution, statusDistribution } = useMemo(() => {
    const types = new Map<TaskType, number>()
    const statuses = new Map<TaskStatus, number>()

    tasks.forEach((task) => {
      // Count task types
      types.set(task.type, (types.get(task.type) || 0) + 1)
      // Count task statuses
      statuses.set(task.status, (statuses.get(task.status) || 0) + 1)
    })

    const totalTasks = tasks.length

    return {
      typeDistribution: TASK_TYPES.map((type) => ({
        type,
        count: types.get(type) || 0,
        percentage: totalTasks > 0 ? ((types.get(type) || 0) / totalTasks) * 100 : 0,
      })).filter((item) => item.count > 0),
      statusDistribution: ALL_STATUSES.map((status) => ({
        status,
        count: statuses.get(status) || 0,
        percentage: totalTasks > 0 ? ((statuses.get(status) || 0) / totalTasks) * 100 : 0,
      })),
    }
  }, [tasks])

  const collapsedStatusDistribution = useMemo(
    () => collapseZeroItems(statusDistribution, (item) => item.status),
    [statusDistribution],
  )

  return (
    <div className="grid grid-cols-2 divide-x">
      <div className="px-5">
        <h4 className="text-sm font-semibold mb-3">Task Types</h4>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {typeDistribution.map((item) => {
              const TypeIcon = getTaskTypeIcon(item.type)

              return (
                <div key={item.type} className="relative pl-8">
                  <div
                    className={cn(
                      'absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-border bg-background flex items-center justify-center',
                      TypeIcon.className,
                    )}
                  >
                    <TypeIcon.icon className="size-4" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={cn(
                        item.count === 0
                          ? 'text-base font-medium text-muted-foreground'
                          : 'text-2xl font-semibold text-default',
                      )}
                    >
                      {item.count}
                    </span>
                    <span className="text-sm text-muted-foreground capitalize">{TypeIcon.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.percentage.toFixed(0)}% of tasks</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="px-5">
        <h4 className="text-sm font-semibold mb-3">Task Status</h4>
        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-4">
            {collapsedStatusDistribution.map((item, index) => {
              if ('isCollapsed' in item) {
                return (
                  <div key={`collapsed-${index}`} className="relative pl-6">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-border bg-background opacity-100" />
                    <div className="flex items-baseline gap-2"></div>
                    <p className="text-xs text-muted-foreground italic">
                      {item.items.map((status) => status).join(', ')}
                    </p>
                  </div>
                )
              }

              return (
                <div key={item.status} className="relative pl-6">
                  <div
                    className={cn(
                      'absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2',
                      STATUS_COLORS[item.status],
                      item.count === 0 ? 'opacity-30' : 'opacity-100',
                    )}
                  />
                  <div className="flex items-baseline gap-2">
                    <span
                      className={cn(
                        item.count === 0
                          ? 'text-base font-medium text-muted-foreground'
                          : 'text-2xl font-semibold text-default',
                      )}
                    >
                      {item.count}
                    </span>
                    <span className="text-sm text-muted-foreground capitalize">{item.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.percentage.toFixed(0)}% of tasks</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
