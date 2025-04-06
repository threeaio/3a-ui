'use client'

import { useMemo } from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@3a.solutions/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Task } from '@/features/data-dashboard/types/domain'

interface EpicTaskMetricsChartProps {
  tasks: Task[]
  getTaskCost: (taskId: string) => number
  getTotalWorkloadForTask: (taskId: string) => number
}

export function EpicTaskMetricsChart({ tasks, getTaskCost }: EpicTaskMetricsChartProps) {
  const chartData = useMemo(() => {
    return tasks
      .map((task) => ({
        name: task.name,
        cost: getTaskCost(task.id),
      }))
      .sort((a, b) => b.cost - a.cost)
  }, [tasks, getTaskCost])

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
    bar: {
      color: 'var(--default)',
    },
  }

  if (tasks.length === 0) {
    return <div className="text-sm text-muted-foreground">No tasks available</div>
  }

  return (
    <div className="space-y-5 ">
      <h4 className="font-semibold">Task Costs</h4>
      <ChartContainer config={chartConfig} className="w-full" style={{ height: Math.max(100, tasks.length * 70) }}>
        <ResponsiveContainer width="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.grid.color} />
            <XAxis
              type="number"
              tick={{ fill: chartConfig.tick.color }}
              tickLine={{ stroke: chartConfig.tick.color }}
              label={{
                value: 'Cost',
                position: 'insideBottom',
                offset: -5,
                style: { fill: chartConfig.label.color },
              }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={210}
              tick={{ fill: chartConfig.tick.color }}
              tickLine={{ stroke: chartConfig.tick.color }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="cost" maxBarSize={10} name="Cost" fill={chartConfig.bar.color} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
