'use client'

import React from 'react'
import { ChartData } from '../../types'
import { ChartTooltip, ChartLegend, ChartContainer, ChartTooltipContent } from '@3a.solutions/ui/chart'
import { PieChart, Pie, Cell } from 'recharts'

interface RiskSeverityChartProps {
  data: ChartData[]
}

export const RiskSeverityChart: React.FC<RiskSeverityChartProps> = ({ data }) => {
  const chartConfig = {
    low: { label: 'Low', color: '#4ade80' },
    medium: { label: 'Medium', color: '#fbbf24' },
    high: { label: 'High', color: '#f87171' },
    critical: { label: 'Critical', color: '#ef4444' },
  }

  const colors = ['#4ade80', '#fbbf24', '#f87171', '#ef4444']

  return (
    <ChartContainer config={chartConfig} className="aspect-square md:aspect-video lg:aspect-square h-60 w-full">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend />
      </PieChart>
    </ChartContainer>
  )
}

export default RiskSeverityChart
