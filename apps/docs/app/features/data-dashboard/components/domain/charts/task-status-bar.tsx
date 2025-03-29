'use client'

import React from 'react'
import { ChartData } from '../../../types'
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@3a.solutions/ui/chart'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

const CHART_CONFIG = {
  borderRadius: 9,
} as const

interface TaskStatusBarProps {
  data: ChartData[]
  colors?: string[]
}

export const TaskStatusBar: React.FC<TaskStatusBarProps> = ({
  data,
  colors = [
    'var(--color-chart-neutral)',
    'var(--color-chart-blue)',
    'var(--color-chart-purple)',
    'var(--color-chart-green)',
  ],
}) => {
  // Transform data for stacked bar chart
  const chartData = [
    {
      name: 'Tasks',
      ...data.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {}),
    },
  ]

  // Calculate the max value for domain
  const maxValue = data.reduce((sum, item) => sum + item.value, 0)

  const chartConfig = {
    tasks: { label: 'Tasks', color: 'var(--chart-1)' },
    label: { color: 'var(--background)' },
    XAxis: { color: 'var(--border)', fontSize: 12 },
    grid: { color: 'var(--border)' },
  }

  return (
    <ChartContainer config={chartConfig} className="h-24 w-full">
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 0, left: 0, bottom: 5 }} barSize={40}>
        {/* <CartesianGrid horizontal={false} stroke={chartConfig.grid.color} /> */}
        <XAxis
          type="number"
          stroke={chartConfig.XAxis.color}
          style={{ fontSize: chartConfig.XAxis.fontSize }}
          domain={[0, maxValue]}
        />
        <YAxis type="category" dataKey="name" hide />
        <ChartTooltip content={<ChartTooltipContent />} />
        {data.map((item, index) => (
          <Bar
            key={item.name}
            dataKey={item.name}
            stackId="stack"
            fill={colors[index % colors.length]}
            radius={
              index === 0
                ? [CHART_CONFIG.borderRadius, 0, 0, CHART_CONFIG.borderRadius] // First segment gets both left corners rounded
                : index === data.length - 1
                  ? [0, CHART_CONFIG.borderRadius, CHART_CONFIG.borderRadius, 0] // Last segment gets both right corners rounded
                  : 0 // Middle segments have no rounding
            }
          />
        ))}
      </BarChart>
    </ChartContainer>
    // <div className="w-full">
    //   <ChartContainer config={chartConfig} className="h-24 w-full">
    //     <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }} barSize={50}>
    //       {/* <CartesianGrid horizontal={false} stroke={chartConfig.grid.color} /> */}
    //       <XAxis
    //         type="number"
    //         stroke={chartConfig.XAxis.color}
    //         style={{ fontSize: chartConfig.XAxis.fontSize }}
    //         domain={[0, maxValue]}
    //       />
    //       <YAxis type="category" dataKey="name" hide />
    //       <ChartTooltip content={<ChartTooltipContent />} />
    //       {data.map((item, index) => (
    //         <Bar key={item.name} dataKey={item.name} stackId="stack" fill={colors[index % colors.length]} />
    //       ))}
    //     </BarChart>
    //   </ChartContainer>

    //   {/* Legend */}
    //   <div className="flex flex-wrap items-center justify-center mt-3 gap-4">
    //     {data.map((item, index) => (
    //       <div key={index} className="flex items-center">
    //         <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: colors[index % colors.length] }} />
    //         <span className="text-xs">
    //           {item.name}: {item.value}
    //         </span>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  )
}

export default TaskStatusBar
