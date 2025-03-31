'use client'

import React from 'react'
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@3a.solutions/ui/chart'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'
import { useProjectDataContext } from '../../../data-context/project-data-provider'
import { Card } from '@3a.solutions/ui/card'

export const DomainTaskCountRadar: React.FC = () => {
  const { getDomainTaskCountsByStatus } = useProjectDataContext()

  const data = getDomainTaskCountsByStatus()

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
  }

  const dataKeys = [
    {
      key: 'planned',
      name: 'Planned',
      color: 'var(--color-chart-purple)',
    },
    {
      key: 'inProgress',
      name: 'In Progress',
      color: 'var(--color-chart-blue)',
    },
    {
      key: 'completed',
      name: 'Completed',
      color: 'var(--color-chart-green)',
    },
  ]

  return (
    <Card>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <RadarChart data={data} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
          <PolarGrid stroke={chartConfig.grid.color} />
          <PolarAngleAxis
            dataKey="domain"
            tickLine={false}
            axisLine={false}
            tick={{ fill: chartConfig.label.color, fontSize: 10 }}
            stroke={chartConfig.grid.color}
          />
          <PolarRadiusAxis
            angle={30}
            stroke={chartConfig.grid.color}
            tickLine={false}
            axisLine={false}
            tick={{ fill: chartConfig.tick.color, fontSize: 10 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataKeys.map((dataKey) => (
            <Radar
              key={dataKey.key}
              name={dataKey.name}
              dataKey={dataKey.key}
              stroke={dataKey.color}
              fill={dataKey.color}
              fillOpacity={0.3}
              strokeWidth={0.5}
              dot={{
                fill: dataKey.color,
                radius: 2,
              }}
            />
          ))}
          <Legend iconType="line" wrapperStyle={{ fontSize: 11, color: 'var(--muted-foreground)' }} />
        </RadarChart>
      </ChartContainer>
    </Card>
  )
}

export default DomainTaskCountRadar
