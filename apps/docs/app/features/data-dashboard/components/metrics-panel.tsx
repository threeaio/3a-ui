'use client'

import React from 'react'
import { Card } from './ui/card'
import { ChartContainer } from './ui/chart-container'
import { SimpleBarChart } from './ui/simple-bar-chart'
import { TrendingUp, TrendingDown, ArrowRightCircle, ChevronUp, ChevronDown } from 'lucide-react'
import { useMetricsData } from '../data-context'
import { taskStatusChart, riskSeverityChart } from '../data-context/mock-data'

const MetricsPanel: React.FC = () => {
  const { metrics } = useMetricsData()

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-2 mb-2">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <ChartContainer title="Task Status Distribution">
          <SimpleBarChart data={taskStatusChart} colors={['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d']} />
        </ChartContainer>

        <ChartContainer title="Risk Severity Distribution">
          <SimpleBarChart data={riskSeverityChart} colors={['#82ca9d', '#ffc658', '#ff8042', '#ff3d00']} />
        </ChartContainer>

        <ChartContainer title="Team Workload">
          <div className="flex h-full items-center justify-center text-center text-muted-foreground">
            Team workload chart will go here
          </div>
        </ChartContainer>
      </div>
    </div>
  )
}

interface MetricCardProps {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  suffix?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ name, value, change, trend, suffix = '' }) => {
  return (
    <Card className="p-5 h-40 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm">{name}</span>
        {trend === 'up' ? (
          <TrendingUp className="size-4 text-green-500" />
        ) : trend === 'down' ? (
          <TrendingDown className="size-4 text-red-500" />
        ) : (
          <ArrowRightCircle className="size-4 text-muted-foreground" />
        )}
      </div>

      <div className="flex items-baseline justify-between ">
        <span className="text-4xl font-extralight font-mono mt-5">
          {value}
          {suffix}
        </span>
        <div className="flex items-center">
          {trend === 'up' ? (
            <div className="flex items-center text-green-500 text-xs">
              <ChevronUp className="size-3" />
              {Math.abs(change)}%
            </div>
          ) : trend === 'down' ? (
            <div className="flex items-center text-red-500 text-xs">
              <ChevronDown className="size-3" />
              {Math.abs(change)}%
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

export default MetricsPanel
