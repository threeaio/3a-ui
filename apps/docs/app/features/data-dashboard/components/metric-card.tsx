'use client'

import React from 'react'
import { Card } from '@3a.solutions/ui/card'
import { TrendingUp, TrendingDown, ArrowRightCircle, ChevronUp, ChevronDown } from 'lucide-react'

export interface MetricCardProps {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  suffix?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({ name, value, change, trend, suffix = '' }) => {
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

      <div className="flex items-baseline justify-between">
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
