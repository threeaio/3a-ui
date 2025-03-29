'use client'

import React from 'react'
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@3a.solutions/ui/chart'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts'

const DOMAIN_COLORS = {
  Frontend: 'var(--color-chart-blue)',
  'UX/Design': 'var(--color-chart-purple)',
  Backend: 'var(--color-chart-green)',
  'Dev-Ops': 'var(--color-chart-neutral)',
  QA: 'var(--color-chart-orange)',
  Management: 'var(--color-chart-red)',
} as const

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
  useDomainColors?: boolean
}

export const DomainRadarChart: React.FC<DomainRadarChartProps> = ({ data, dataKeys, useDomainColors = false }) => {
  const chartConfig = {
    label: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
  }

  const getDomainColor = (domain: string | undefined) => {
    if (!domain) return 'var(--muted-foreground)'
    return DOMAIN_COLORS[domain as keyof typeof DOMAIN_COLORS] || 'var(--muted-foreground)'
  }

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <RadarChart data={data} margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
        <PolarGrid stroke={chartConfig.grid.color} strokeDasharray="3 3" />
        <PolarAngleAxis
          dataKey="domain"
          tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
          stroke={chartConfig.grid.color}
        />
        <PolarRadiusAxis
          angle={30}
          stroke={chartConfig.grid.color}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {dataKeys.map((dataKey, index) => (
          <Radar
            key={dataKey.key}
            name={dataKey.name}
            dataKey={dataKey.key}
            stroke={useDomainColors ? getDomainColor(data[index]?.domain) : dataKey.color}
            fill="none"
            strokeWidth={1.5}
            dot={{
              fill: useDomainColors ? getDomainColor(data[index]?.domain) : dataKey.color,
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
