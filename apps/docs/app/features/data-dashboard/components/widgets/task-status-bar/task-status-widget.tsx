'use client'

import React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@3a.solutions/ui/tooltip'
import { useProjectDataContext } from '../../../data-context/project-data-provider'
import { TaskStatus } from '../../../types/domain'
import { ChartData } from '../../../types/ui'
import { STATUS_COLORS } from '@/features/data-dashboard/utils/domain-to-ui'


interface TaskStatusWidgetProps {
  className?: string
  barHeight?: string // e.g., 'h-4', 'h-6'
}

export const TaskStatusWidget: React.FC<TaskStatusWidgetProps> = ({
  className,
  barHeight = 'h-10', // Default height for the bar
}) => {
  const { getTasksByStatus } = useProjectDataContext()

  const data: ChartData[] = React.useMemo(() => {
    const statuses: TaskStatus[] = ['planned', 'in-progress', 'completed', 'cancelled']
    return statuses.map((status) => ({
      name: status,
      value: getTasksByStatus(status).length,
    }))
  }, [getTasksByStatus])

  const totalValue = data.reduce((sum, item) => sum + item.value, 0)
  const titleId = React.useId()

  if (totalValue === 0) {
    // Handle case with no data or all zero values
    return (
      <div className={cn('w-full', className)}>
        <h2 id={titleId} className="text-sm mb-2">
          Task Status
        </h2>
        <div className={cn('w-full bg-muted rounded-lg', barHeight)} role="progressbar" aria-labelledby={titleId}>
          <span className="text-xs text-muted-foreground pl-2">No data</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full flex flex-col justify-center ', className)}>
      <h2 id={titleId} className="text-sm mb-2">
        Task Status
      </h2>
      <TooltipProvider>
        <div
          className={cn('flex w-full overflow-hidden rounded-lg', barHeight)}
          role="progressbar"
          aria-labelledby={titleId}
        >
          {data.map((item, index) => {
            const percentage = (item.value / totalValue) * 100
            const style = {
              width: `${percentage}%`,
            }
            const labelText = `${item.name}: ${item.value}`

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <div
                    style={style}
                    className={cn(
                      'h-full transition-all duration-300 ease-in-out flex items-center justify-start overflow-hidden cursor-default',
                      STATUS_COLORS[item.name as TaskStatus],
                    )}
                    aria-label={labelText}
                  >
                    {percentage > 5 && (
                      <span className="text-xs text-white truncate px-5 pointer-events-none">{item.name}</span>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{labelText}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
      <div className="flex flex-wrap items-center justify-center mt-3 gap-x-4 gap-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className={cn(
                'size-2 rounded-[2px] mr-2 flex-shrink-0',
                STATUS_COLORS[item.name as TaskStatus],
              )}
            />
            <span className="text-xs">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskStatusWidget
