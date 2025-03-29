'use client'

import React from 'react'
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@3a.solutions/ui/chart'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'

interface DomainRadarChartProps {
  data: Array<{
    domain: string
    [key: string]: any
  }>
  dataKeys: Array<{
    key: string
    name: string
    color?: string
  }>
}

export const DomainRadarChart: React.FC<DomainRadarChartProps> = ({ data, dataKeys }) => {
  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
  }

  return (
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
  )
}

export default DomainRadarChart
