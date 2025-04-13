'use client'

import React from 'react'
import { cn } from '@3a.solutions/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@3a.solutions/ui/tooltip'
import { TaskStatus } from '../../../types/domain'
import { ChartData } from '../../../types/ui'
import { STATUS_COLORS } from '@/features/data-dashboard/utils/domain-to-ui'
import { useProjectDataContext } from '../../../data-context/project-data-provider'
import { sectionLabelClassName } from '@/ui/core-layout/section-label'
interface TaskStatusWidgetProps {
  className?: string
  size?: 'sm' | 'lg'
  showLegend?: boolean
  legendClassName?: string
  barClassName?: string
  mode?: 'global' | 'epic'
  epicId?: string
}

export const TaskStatusWidget: React.FC<TaskStatusWidgetProps> = ({
  className,
  showLegend = true,
  size = 'lg',
  legendClassName = 'mt-3',
  barClassName,
  mode = 'global',
  epicId,
}) => {
  const { getTasksByStatus, getTasksByStatusForEpic } = useProjectDataContext()
  const titleId = React.useId()

  const data: ChartData[] = React.useMemo(() => {
    const statuses: TaskStatus[] = ['planned', 'in-progress', 'completed', 'cancelled']
    return statuses.map((status) => ({
      name: status,
      value:
        mode === 'epic' && epicId ? getTasksByStatusForEpic(epicId, status).length : getTasksByStatus(status).length,
    }))
  }, [mode, epicId, getTasksByStatus, getTasksByStatusForEpic])

  const totalValue = data.reduce((sum, item) => sum + item.value, 0)

  const barHeight = size === 'sm' ? 'h-6.5' : 'h-10'

  if (totalValue === 0) {
    // Handle case with no data or all zero values
    return (
      <div className={cn('w-full', className)}>
        <h2 id={titleId} className={cn(sectionLabelClassName, 'mb-2')}>
          Task Status
        </h2>
        <div
          className={cn('w-full bg-muted rounded-lg', barHeight, barClassName)}
          role="progressbar"
          aria-labelledby={titleId}
        >
          <span className="text-xs text-muted-foreground pl-2">No data</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full flex flex-col justify-center', className)}>
      <h2 id={titleId} className={cn(sectionLabelClassName, 'mb-2')}>
        Task Status ({totalValue})
      </h2>
      <TooltipProvider>
        <div
          className={cn('flex w-full overflow-hidden rounded-full', barHeight, barClassName)}
          role="progressbar"
          aria-labelledby={titleId}
        >
          {data.map((item) => {
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
                      'h-full transition-all duration-300 ease-in-out flex items-center justify-start overflow-hidden cursor-default text-xs',
                      STATUS_COLORS[item.name as TaskStatus],
                    )}
                    aria-label={labelText}
                  >
                    {percentage > (size === 'sm' ? 15 : 5) && (
                      <span
                        className={cn(
                          'text-xs text-white truncate  pointer-events-none',
                          size === 'sm' && 'px-3',
                          size === 'lg' && 'px-5',
                        )}
                      >
                        {item.name}
                      </span>
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
      {showLegend && (
        <div className={cn('flex flex-wrap items-center justify-center gap-x-4 gap-y-2', legendClassName)}>
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={cn('size-2 rounded-[2px] mr-2 flex-shrink-0', STATUS_COLORS[item.name as TaskStatus])} />
              <span className="text-xs">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskStatusWidget
