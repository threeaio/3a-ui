'use client'

import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@3a-ui/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@3a-ui/ui/chart'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Badge } from '@3a.solutions/ui/badge'
import { NOW } from '@/features/data-dashboard/_MOCK-DATA/NOW_provider'

interface EmployeeWorkloadOverTimeSectionProps {
  employeeId: string
}

export function EmployeeWorkloadOverTimeSection({ employeeId }: EmployeeWorkloadOverTimeSectionProps) {
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

  // Calculate total workload
  const totalWorkload = chartData.reduce((total, data) => total + data.hours, 0)

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
    bar: { color: 'var(--default)' },
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Workload Over Time</CardTitle>
          <Badge variant="secondary">Total: {totalWorkload}h</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <ChartContainer config={chartConfig} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 20, left: 20, bottom: 20 }}>
              <XAxis
                dataKey="date"
                tick={{ fill: chartConfig.tick.color }}
                minTickGap={40}
                tickMargin={10}
                fontSize={11}
                className="tabular-nums font-mono"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString('de-DE', { month: '2-digit', day: '2-digit' })
                }
              />
              <YAxis
                tick={{ fill: chartConfig.tick.color }}
                fontSize={11}
                width={10}
                tickMargin={10}
                className="tabular-nums font-mono"
                tickFormatter={(value) => `${value}h`}
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
              <Bar dataKey="hours" fill={chartConfig.bar.color} maxBarSize={4} name="Hours" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
