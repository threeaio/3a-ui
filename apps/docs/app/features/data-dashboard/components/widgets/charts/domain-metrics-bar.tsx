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

interface DomainMetricsBarProps {
  className?: string
}

export const DomainMetricsBar: React.FC<DomainMetricsBarProps> = ({ className }) => {
  const { getDomainCostAnalysis } = useProjectDataContext()

  const data = getDomainCostAnalysis()
    .map((cost) => ({
      domain: cost.domain,
      cost: Math.round(cost.cost),
    }))
    .sort((a, b) => a.cost - b.cost)

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
    cost: { label: 'Cost (€)', color: 'var(--default)' },
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Cost per Domain</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart maxBarSize={10} data={data} margin={{ top: 20, right: 0, left: 0, bottom: 30 }}>
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
            <Bar dataKey="cost" name="Cost" fill={chartConfig.cost.color} radius={[4, 4, 0, 0]} />
            {/* <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" className="h-20 pt-5" /> */}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DomainMetricsBar
