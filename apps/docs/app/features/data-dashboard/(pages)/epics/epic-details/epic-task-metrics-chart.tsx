'use client'

import { SyntheticEvent, useMemo, useState } from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@3a.solutions/ui/chart'
import { BarChart, Bar, XAxis, YAxis, LabelProps, ResponsiveContainer } from 'recharts'
import { Task } from '@/features/data-dashboard/types/domain'

interface EpicTaskMetricsChartProps {
  tasks: Task[]
  getTaskCost: (taskId: string) => number
  getTotalWorkloadForTask: (taskId: string) => number
}

export function EpicTaskMetricsChart({ tasks, getTaskCost }: EpicTaskMetricsChartProps) {
  const [chartWidth, setChartWidth] = useState(0)

  const chartData = useMemo(() => {
    return tasks
      .map((task) => ({
        name: task.name,
        cost: getTaskCost(task.id),
      }))
      .filter((task) => task.cost > 0)
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

  const CustomLabel = (props: LabelProps) => {
    const { x, y, width, value, index } = props
    if (!value || width === undefined) return null


    return (
      <g>
        <text x={(x as number) + 5} y={y} dy={-10} textAnchor="start" fill={chartConfig.label.color}>
          {chartData[index!]!.name}
        </text>
        <text
          className="tabular-nums font-mono"
          x={chartWidth - 50}
          y={y}
          dy={-10}
          textAnchor="end"
          fill={chartConfig.tick.color}
        >
          {chartData[index!]!.cost.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
        </text>
      </g>
    )
  }

  return (
    <div className="h-auto">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer
          width="100%"
          onResize={(width) => {
            setChartWidth(width)
          }}
        >
          <BarChart
            barCategoryGap={20}
            data={chartData}
            margin={{
              top: 20,
              right: 40,
              left: 20,
              bottom: 20,
            }}
            layout="vertical"
          >
            <ChartTooltip
              cursor={true}
              content={
                <ChartTooltipContent
                  formatter={(value) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                />
              }
            />
            <XAxis
              type="number"
              tick={{ fill: chartConfig.tick.color }}
              fontSize={11}
              className="tabular-nums font-mono"
              tickFormatter={(value) => value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              tickLine={{ stroke: chartConfig.tick.color }}
              axisLine={true}
            />
            <YAxis type="category" dataKey="name" tick={false} width={1} />
            <Bar
              dataKey="cost"
              maxBarSize={5}
              name="Cost"
              fill={chartConfig.bar.color}
              radius={[0, 4, 4, 0]}
              label={({ x, y, width, value, index }) => (
                <CustomLabel x={x} y={y} width={width} value={value} index={index} />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
