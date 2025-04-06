'use client'

import React from 'react'
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from '@3a.solutions/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useProjectDataContext } from '../../../data-context/project-data-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { cn } from '@3a.solutions/ui/lib/utils'

type CustomBarData = {
  domain: string
  planned: number
  inProgress: number
  completed: number
  plannedRounded: boolean
  inProgressRounded: boolean
  completedRounded: boolean
}

interface DomainTaskStatusStackedProps {
  className?: string
}

export const DomainTaskStatusStacked: React.FC<DomainTaskStatusStackedProps> = ({ className }) => {
  const { getDomainTaskCountsByStatus } = useProjectDataContext()

  const data = getDomainTaskCountsByStatus()

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
    planned: { label: 'Planned', color: 'var(--color-chart-purple)' },
    inProgress: { label: 'In Progress', color: 'var(--color-chart-blue)' },
    completed: { label: 'Completed', color: 'var(--color-chart-green)' },
  }

  // Process data to determine which segments should have rounded corners
  const processedData = data
    .map((item) => ({
      ...item,
      // Add flags to determine which segment should be rounded
      plannedRounded: item.inProgress === 0 && item.completed === 0,
      inProgressRounded: item.inProgress > 0 && item.completed === 0,
      completedRounded: item.completed > 0,
    }))
    .sort((a, b) => a.planned + a.inProgress + a.completed - (b.planned + b.inProgress + b.completed))

  const RenderBar = (color: string, roundedKey: keyof CustomBarData) => (props: any) => {
    const { x, y, width, height } = props
    const rounded = props[roundedKey] as boolean

    // Return empty path for zero height bars
    if (height === 0) {
      return <path d="" fill={color} />
    }

    const radius = rounded ? [4, 4, 0, 0] : [0, 0, 0, 0]
    return (
      <path
        d={`
          M ${x},${y + height}
          L ${x},${y + (radius[0] || 0)}
          Q ${x},${y} ${x + (radius[0] || 0)},${y}
          L ${x + width - (radius[1] || 0)},${y}
          Q ${x + width},${y} ${x + width},${y + (radius[1] || 0)}
          L ${x + width},${y + height}
          Z
        `}
        fill={color}
      />
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Tasks by Status per Domain</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart maxBarSize={10} data={processedData} margin={{ top: 20, right: 0, left: 0, bottom: -30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.grid.color} />
            <XAxis
              dataKey="domain"
              stroke={chartConfig.grid.color}
              tick={{ fill: chartConfig.tick.color, fontSize: 11 }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis stroke={chartConfig.grid.color} tick={{ fill: chartConfig.tick.color }} />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Bar
              dataKey="planned"
              name="Planned"
              stackId="status"
              fill={chartConfig.planned.color}
              shape={RenderBar(chartConfig.planned.color, 'plannedRounded')}
            />
            <Bar
              dataKey="inProgress"
              name="In Progress"
              stackId="status"
              fill={chartConfig.inProgress.color}
              shape={RenderBar('var(--color-chart-blue)', 'inProgressRounded')}
            />
            <Bar
              dataKey="completed"
              name="Completed"
              stackId="status"
              fill={chartConfig.completed.color}
              shape={RenderBar(chartConfig.completed.color, 'completedRounded')}
            />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" className="h-20 pt-5" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DomainTaskStatusStacked
