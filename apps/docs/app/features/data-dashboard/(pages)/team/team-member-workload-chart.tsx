'use client'

import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@3a.solutions/ui/chart'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { NOW } from '@/features/data-dashboard/_MOCK-DATA/NOW_provider'

interface TeamMemberWorkloadChartProps {
  employeeId: string
}

export function TeamMemberWorkloadChart({ employeeId }: TeamMemberWorkloadChartProps) {
  const { tasks, getWorkloadsByTask } = useProjectDataContext()

  // Get all tasks assigned to this employee
  const assignedTasks = tasks.filter((task) => task.assignedEmployeeIds.includes(employeeId))

  // Get all workloads for this employee
  const allWorkloads = assignedTasks
    .flatMap((task) => getWorkloadsByTask(task.id))
    .filter((w) => w.employee.id === employeeId)

  // Get the date range
  const startDate = allWorkloads.reduce((earliest, w) => {
    const date = new Date(w.workload.date)
    return date < earliest ? date : earliest
  }, new Date(NOW()))

  const endDate = new Date(NOW())

  // Create daily workload data
  const dailyWorkloads = new Map<string, number>()

  // Initialize all dates with 0
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateIso = d.toISOString()
    dailyWorkloads.set(dateIso.split('T')[0]!, 0)
  }

  // Sum workloads by date
  allWorkloads.forEach((w) => {
    const date = w.workload.date.toISOString().split('T')[0]!
    dailyWorkloads.set(date, (dailyWorkloads.get(date) || 0) + w.workload.workload)
  })

  // Convert to chart data format
  const chartData = Array.from(dailyWorkloads.entries())
    .map(([date, hours]) => ({
      date,
      hours,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  if (chartData.length === 0) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center text-sm text-muted-foreground">
        No workload data available
      </div>
    )
  }

  // Get min and max values for Y axis
  const maxHours = Math.max(...chartData.map((d) => d.hours))
  const firstDate = chartData[0]!.date
  const lastDate = chartData[chartData.length - 1]!.date

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
    bar: { color: 'var(--default)' },
  }

  const xAxisTicks = [
    { value: firstDate, key: 'start' },
    { value: lastDate, key: 'end' },
  ]

  const yAxisTicks = [
    { value: 0, key: 'min' },
    { value: maxHours, key: 'max' },
  ]

  return (
    <ChartContainer config={chartConfig} className="h-[140px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 0, right: 25, left: 25, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tick={{ fill: chartConfig.tick.color }}
            fontSize={11}
            className="tabular-nums font-mono"
            tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit' })}
            // ticks={xAxisTicks.map((t) => t.value)}
            tickCount={2}
            tickMargin={10}
            minTickGap={100}
            axisLine={true}
          />
          <YAxis
            tick={{ fill: chartConfig.tick.color }}
            fontSize={11}
            width={10}
            className="tabular-nums font-mono"
            tickFormatter={(value) => `${value}h`}
            // ticks={yAxisTicks.map((t) => t.value)}
            tickCount={2}
            axisLine={false}
            tickLine={false}
          />
          <ChartTooltip
            cursor={true}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => `${value}h`}
              />
            }
          />
          <Bar dataKey="hours" fill={chartConfig.bar.color} maxBarSize={2} name="Hours" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
