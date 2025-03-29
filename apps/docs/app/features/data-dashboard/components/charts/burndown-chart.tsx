'use client'

import React from 'react'
import { ChartContainer, ChartTooltipContent } from '@3a.solutions/ui/chart'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts'
import { burndownData } from '../../data-context/mock-data'
import { format, parseISO } from 'date-fns'

interface BurndownChartProps {
  data?: typeof burndownData
}

export const BurndownChart: React.FC<BurndownChartProps> = ({ data = burndownData }) => {
  const chartConfig = {
    value: { label: 'Tasks Remaining', color: 'var(--default)' },
  }

  // Find closest date in data for reference line
  const currentDate = new Date()
  const currentTimestamp = currentDate.getTime()

  // Find the closest date in the data array to use for the reference line
  let closestDate = ''

  if (data && data.length > 0) {
    closestDate = data[0]!.date
    let minDiff = Math.abs(parseISO(data[0]!.date).getTime() - currentTimestamp)

    data.forEach((item) => {
      const diff = Math.abs(parseISO(item.date).getTime() - currentTimestamp)
      if (diff < minDiff) {
        minDiff = diff
        closestDate = item.date
      }
    })
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-square md:aspect-video h-80 w-full">
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
        {/* <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
          </linearGradient>
        </defs> */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
          tickFormatter={(value: string) => format(parseISO(value), 'MMM dd')}
          tick={{ fontSize: 12 }}
        />
        <YAxis axisLine={{ stroke: '#e2e8f0' }} tickLine={false} tick={{ fontSize: 12 }} />
        <Tooltip
          content={<ChartTooltipContent labelFormatter={(value: string) => format(parseISO(value), 'MMMM d, yyyy')} />}
        />
        <ReferenceLine
          x={closestDate}
          stroke="#64748b"
          strokeDasharray="5 5"
          label={{
            value: 'Today',
            position: 'top',
            fill: '#64748b',
            fontSize: 12,
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--default)"
          strokeWidth={2}
          fill="none"
          name="Remaining Tasks"
          dot={{ r: 2 }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ChartContainer>
  )
}

export default BurndownChart
