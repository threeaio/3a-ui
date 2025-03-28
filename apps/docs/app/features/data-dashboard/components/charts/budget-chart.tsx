'use client'

import React from 'react'
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@3a.solutions/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts'
import { budgetData } from '../../data-context/mock-data'
import { format, parseISO } from 'date-fns'

interface BudgetChartProps {
  data?: typeof budgetData
  totalBudget?: number
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ data = budgetData, totalBudget = 85000 }) => {
  const chartConfig = {
    value: { label: 'Spend', color: '#10b981' },
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
      <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(value: string) => format(parseISO(value), 'MMM dd')}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value: number) => `$${value / 1000}k`}
        />
        <ChartTooltip
          content={<ChartTooltipContent labelFormatter={(value: string) => format(parseISO(value), 'MMMM d, yyyy')} />}
        />
        <ReferenceLine
          y={totalBudget}
          stroke="#ef4444"
          strokeDasharray="5 5"
          label={{
            value: 'Budget Limit',
            position: 'right',
            fill: '#ef4444',
            fontSize: 12,
          }}
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
        <Line
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 6 }}
          name="Budget Spent"
          unit="$"
        />
      </LineChart>
    </ChartContainer>
  )
}

export default BudgetChart
