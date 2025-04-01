'use client'

import React from 'react'
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from '@3a.solutions/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import { useProjectDataContext } from '../../../data-context/project-data-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'

export const DomainMetricsBar: React.FC = () => {
  const { getDomainWorkloadAnalysis, getDomainCostAnalysis } = useProjectDataContext()

  const workloadData = getDomainWorkloadAnalysis()
  const costData = getDomainCostAnalysis()

  const data = workloadData.map((workload) => {
    const costEntry = costData.find((cost) => cost.domain === workload.domain)
    return {
      domain: workload.domain,
      hours: Math.round(workload.hours * 10) / 10,
      cost: costEntry ? Math.round(costEntry.cost) : 0,
    }
  })

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
    hours: { label: 'Hours', color: 'var(--default)' },
    cost: { label: 'Cost (€)', color: 'var(--color-chart-neutral)' },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost and Workload per Domain</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart maxBarSize={20} data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartConfig.grid.color} />
            <XAxis
              dataKey="domain"
              stroke={chartConfig.grid.color}
              tick={{ fill: chartConfig.tick.color, fontSize: 10 }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis
              yAxisId="hours"
              stroke={chartConfig.grid.color}
              tick={{ fill: chartConfig.tick.color }}
              // label={{ value: chartConfig.hours.label, angle: -90, position: 'insideLeft', fill: chartConfig.label.color }}
            />
            <YAxis
              yAxisId="cost"
              orientation="right"
              stroke={chartConfig.grid.color}
              tick={{ fill: chartConfig.tick.color }}
              // label={{ value: chartConfig.cost.label, angle: 90, position: 'insideRight', fill: chartConfig.label.color }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar yAxisId="hours" dataKey="hours" name="Hours" fill={chartConfig.hours.color} radius={[4, 4, 0, 0]} />
            <Bar yAxisId="cost" dataKey="cost" name="Cost" fill={chartConfig.cost.color} radius={[4, 4, 0, 0]} />
            <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" className="h-20 pt-5" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default DomainMetricsBar
