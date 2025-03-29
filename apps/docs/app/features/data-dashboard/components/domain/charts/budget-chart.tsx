'use client'

import React from 'react'
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@3a.solutions/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts'
import { budgetData } from '../../../data-context'
import { format, parseISO } from 'date-fns'

interface BudgetChartProps {
  data?: typeof budgetData
  totalBudget?: number
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ data = budgetData, totalBudget = 85000 }) => {
  const chartConfig = {
    value: { label: 'Spend', color: 'var(--default)' },
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
      <LineChart data={data} margin={{ top: 20, right: 100, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
          tickFormatter={(value: string) => format(parseISO(value), 'MMM dd')}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value: number) => `$${value / 1000}k`}
        />
        <ChartTooltip
          content={<ChartTooltipContent labelFormatter={(value: string) => format(parseISO(value), 'MMMM d, yyyy')} />}
        />
        <ReferenceLine
          y={totalBudget}
          stroke="#64748b"
          strokeDasharray="5 5"
          label={{
            value: 'Budget Limit',
            position: 'right',
            fill: '#64748b',
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
          stroke="var(--default)"
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
