'use client'

import React from 'react'
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from '@3a.solutions/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts'
import { useProjectDataContext } from '../../../data-context/project-data-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { TaskType } from '../../../types/domain'
import { cn } from '@3a.solutions/ui/lib/utils'

type DataEntry = {
  type: TaskType
  cost: number
}

interface TaskTypeCostBarProps {
  className?: string
}

export const TaskTypeCostBar: React.FC<TaskTypeCostBarProps> = ({ className }) => {
  const { tasks, getTaskCost } = useProjectDataContext()

  // Calculate cost per task type
  const data: DataEntry[] = React.useMemo(() => {
    const taskTypeCosts = new Map<TaskType, number>()

    tasks.forEach((task) => {
      const cost = getTaskCost(task.id)
      taskTypeCosts.set(task.type, (taskTypeCosts.get(task.type) || 0) + cost)
    })

    return Array.from(taskTypeCosts.entries())
      .map(([type, cost]) => ({
        type,
        cost: Math.round(cost),
      }))
      .sort((a, b) => a.cost - b.cost)
  }, [tasks, getTaskCost])

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
    cost: { label: 'Cost (€)', color: 'var(--default)' },
    destructive: { color: 'var(--destructive)' },
  }

  const getBarColor = (entry: DataEntry) => {
    return entry.type === 'bugfix' ? chartConfig.destructive.color : chartConfig.cost.color
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Cost by Task Type</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart maxBarSize={10} data={data} margin={{ top: 20, right: 0, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.grid.color} />
            <XAxis
              dataKey="type"
              stroke={chartConfig.grid.color}
              tick={{ fill: chartConfig.tick.color, fontSize: 10 }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis stroke={chartConfig.grid.color} tick={{ fill: chartConfig.tick.color }} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="cost" name="Cost" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
              ))}
            </Bar>
            {/* <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" className="h-20 pt-5" /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TaskTypeCostBar
