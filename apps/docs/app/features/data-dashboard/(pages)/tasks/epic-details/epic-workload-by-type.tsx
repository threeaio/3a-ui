'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { getTaskTypeIcon } from '@/features/data-dashboard/utils/domain-to-ui'
import { Task } from '@/features/data-dashboard/types/domain'

interface WorkloadDataPoint {
  date: string
  [key: string]: number | string // For dynamic task types
}

interface Props {
  epicId: string
}

export function EpicWorkloadByType({ epicId }: Props) {
  const { getTasksByEpic, getWorkloadsByTask } = useTasksData()

  const chartData = useMemo(() => {
    const tasks = getTasksByEpic(epicId, true) // Get all tasks regardless of status
    const workloadsByType = new Map<string, { date: Date; hours: number }[]>()
    const taskTypes = new Set<string>()

    // Collect all workloads and organize by task type
    tasks.forEach((task: Task) => {
      const taskType = task.type
      taskTypes.add(taskType)

      const workloads = getWorkloadsByTask(task.id)
      workloads.forEach(({ workload }) => {
        const date = new Date(workload.date)
        const typeWorkloads = workloadsByType.get(taskType) || []
        typeWorkloads.push({ date, hours: workload.workload })
        workloadsByType.set(taskType, typeWorkloads)
      })
    })

    // Sort all workloads by date and accumulate
    const allDates = Array.from(workloadsByType.values())
      .flat()
      .map((w) => w.date)
      .sort((a, b) => a.getTime() - b.getTime())

    if (allDates.length === 0) return []

    const startDate = allDates[0]
    const endDate = allDates[allDates.length - 1]

    if (!startDate || !endDate) return []

    const dateRange: Date[] = []

    // Create date range array
    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      dateRange.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Create accumulated data points
    return dateRange.map((date): WorkloadDataPoint => {
      const formattedDate = date.toISOString().split('T')[0]
      if (!formattedDate) throw new Error('Invalid date format')

      const dataPoint: WorkloadDataPoint = {
        date: formattedDate,
      }

      // For each task type, calculate accumulated hours up to this date
      taskTypes.forEach((type) => {
        const typeWorkloads = workloadsByType.get(type) || []
        const accumulatedHours = typeWorkloads.filter((w) => w.date <= date).reduce((sum, w) => sum + w.hours, 0)

        dataPoint[type] = accumulatedHours
      })

      return dataPoint
    })
  }, [epicId, getTasksByEpic, getWorkloadsByTask])

  const colors = {
    feature: 'var(--color-chart-blue)',
    bugfix: 'var(--destructive)',
    design: 'var(--color-chart-purple)',
    refactoring: 'var(--color-chart-green)',
    'change-request': 'var(--color-chart-orange)',
    maintenance: 'var(--color-chart-gray)',
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {/* <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /> */}
          <XAxis
            dataKey="date"
            stroke="var(--muted-foreground)"
            tick={{ fill: 'var(--muted-foreground)' }}
            minTickGap={40}
            fontSize={11}
            tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE')}
          />
          <YAxis
            stroke="var(--muted-foreground)"
            fontSize={11}
            tick={{ fill: 'var(--muted-foreground)' }}
            tickFormatter={(value) => `${value}h`}
            label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: 'var(--muted-foreground)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
            }}
            labelStyle={{ color: 'var(--foreground)' }}
          />
          {Object.entries(colors).map(([type, color]) => (
            <Area
              key={type}
              type="monotone"
              dataKey={type}
              stackId="1"
              stroke={color}
              fill={color}
              fillOpacity={0.1}
              name={getTaskTypeIcon(type as Task['type']).label}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
