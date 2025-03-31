'use client'

import React from 'react'
import { Card } from '@3a.solutions/ui/card'
import {
  TrendingUp,
  TrendingDown,
  ArrowRightCircle,
  ChevronUp,
  ChevronDown,
  Clock,
  Target,
  DollarSign,
  CheckSquare,
} from 'lucide-react'

export type MetricType = 'progress' | 'tasks' | 'budget' | 'timeRemaining'

export interface MetricCardProps {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  suffix?: string
  metricType?: MetricType
  subline?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  name,
  value,
  change,
  trend,
  suffix = '',
  metricType,
  subline,
}) => {
  // Helper function to get icon based on metric type
  const getMetricIcon = () => {
    switch (metricType) {
      case 'progress':
        return <Target className="size-4" />
      case 'tasks':
        return <CheckSquare className="size-4" />
      case 'budget':
        return <DollarSign className="size-4" />
      case 'timeRemaining':
        return <Clock className="size-4" />
      default:
        return trend === 'up' ? (
          <TrendingUp className="size-4 text-green-500" />
        ) : trend === 'down' ? (
          <TrendingDown className="size-4 text-red-500" />
        ) : (
          <ArrowRightCircle className="size-4 text-muted-foreground" />
        )
    }
  }

  // Determine whether trend should be shown based on metric type
  const shouldShowTrend = () => {
    return false
  }

  return (
    <Card className="p-5 h-40 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {getMetricIcon()}
          <span className="text-sm font-medium">{name}</span>
        </div>

        {subline && <div className="text-xs text-muted-foreground mt-1">{subline}</div>}
      </div>

      <div className="flex flex-col mt-auto">
        <div className="flex items-end justify-between">
          <span className="text-4xl font-extralight font-mono tabular-nums">
            {value}
            {suffix}
          </span>

          {shouldShowTrend() && (
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
          )}
        </div>
      </div>
    </Card>
  )
}
