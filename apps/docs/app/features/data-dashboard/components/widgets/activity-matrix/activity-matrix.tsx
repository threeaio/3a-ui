import { useMemo } from 'react'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from '@3a.solutions/ui/popover'
import { cn } from '@3a.solutions/ui/lib/utils'
import { ActivityMatrixProps } from './types'
import { getMaxWorkload, getWorkloadIntensity, transformWorkloads } from './utils'

const DAYS = ['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon']

export function ActivityMatrix({ workloads, employees, startDate, onDayClick }: ActivityMatrixProps) {
  const weeks = useMemo(() => transformWorkloads(workloads, employees, startDate), [workloads, employees, startDate])
  const maxWorkload = useMemo(() => getMaxWorkload(weeks), [weeks])

  if (weeks.length === 0) {
    return <div className="text-sm text-muted-foreground">No activity data available</div>
  }

  return (
    <div className="space-y-5">
      <div className="relative">
        {/* Day labels column */}
        <div className="absolute left-0 top-0 flex flex-col gap-2 pr-4">
          {DAYS.map((day, i) => (
            <div
              key={day}
              className={cn(
                'h-5 flex items-center justify-end text-xs text-muted-foreground w-12',
                (i === 0 || i === 1) && 'opacity-50',
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Main grid container */}
        <div className="ml-16">
          {/* Activity grid */}
          <div className="inline-grid auto-cols-[1.5rem] grid-flow-col gap-1">
            {weeks.map((week) => (
              <div key={week.weekStart.toISOString()} className="flex flex-col gap-1">
                {DAYS.map((_, dayIndex) => {
                  const adjustedIndex = 6 - dayIndex
                  const day = week.days[adjustedIndex]
                  if (!day) return <div key={dayIndex} className="size-6" />

                  const intensity = getWorkloadIntensity(day.totalHours, maxWorkload)

                  return (
                    <Popover key={day.date.toISOString()} modal={false}>
                      <PopoverTrigger asChild>
                        <button
                          className={cn(
                            'size-6 rounded transition-colors',
                            intensity === 0 ? cn('bg-muted') : 'bg-green-500',
                          )}
                          style={{
                            opacity: intensity > 0 ? intensity : undefined,
                          }}
                          onClick={() => onDayClick?.(day)}
                        />
                      </PopoverTrigger>

                      <PopoverContent className="w-64">
                        <div className="space-y-2">
                          <div className="font-medium">{format(day.date, 'MMMM d, yyyy')}</div>
                          <div className="text-sm text-muted-foreground">Total: {day.totalHours.toFixed(1)}h</div>
                          {day.details.length > 0 && (
                            <div className="space-y-1">
                              {day.details.map((detail) => (
                                <div key={detail.employee.id} className="flex justify-between text-sm">
                                  <span>{detail.employee.name}</span>
                                  <span className="text-muted-foreground">{detail.hours.toFixed(1)}h</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Week labels */}
          <div className="flex gap-1 mt-2">
            {weeks.map((week) => (
              <div key={week.weekStart.toISOString()} className="w-6 text-center">
                <div className="text-xs text-muted-foreground">{format(week.weekStart, 'w')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workload legend */}
      <div className="flex items-center gap-5 pt-2">
        <div className="text-xs text-muted-foreground">Workload:</div>
        <div className="flex items-center gap-5">
          {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
            <div key={intensity} className="flex items-center gap-1">
              <div
                className={cn('size-3 rounded-[3px]', intensity === 0 ? 'bg-muted' : 'bg-green-500')}
                style={{
                  opacity: intensity,
                }}
              />
              <span className="text-xs text-muted-foreground">{Math.round(intensity * maxWorkload)}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
