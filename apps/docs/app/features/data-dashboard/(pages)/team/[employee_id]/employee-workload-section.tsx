'use client'

import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@3a-ui/ui/card'
import { ChartContainer, ChartLegend } from '@3a-ui/ui/chart'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Badge } from '@3a.solutions/ui/badge'
import { useState } from 'react'
import { LabelProps } from 'recharts'

interface EmployeeWorkloadSectionProps {
  employeeId: string
}

export function EmployeeWorkloadSection({ employeeId }: EmployeeWorkloadSectionProps) {
  const { tasks, getWorkloadsByTask } = useProjectDataContext()
  const [chartWidth, setChartWidth] = useState(0)

  // Get all tasks assigned to this employee
  const assignedTasks = tasks.filter((task) => {
    return task.assignedEmployeeIds.includes(employeeId)
  })

  // Calculate workload data by task status
  const workloadData = assignedTasks
    .map((task) => {
      const workloads = getWorkloadsByTask(task.id)
      const employeeWorkload = workloads
        .filter((w) => w.employee.id === employeeId)
        .reduce((total, w) => total + w.workload.workload, 0)

      return {
        name: task.name,
        hours: employeeWorkload,
        status: task.status,
      }
    })
    .filter((task) => task.hours > 0)
    .sort((a, b) => b.hours - a.hours)

  // Calculate total workload
  const totalWorkload = workloadData.reduce((total, data) => total + data.hours, 0)

  const CustomLabel = (props: LabelProps) => {
    const { x, y, width, value, index } = props
    if (!value || width === undefined) return null

    return (
      <g>
        <text x={(x as number) + 5} y={y} dy={-10} textAnchor="start" fill={'var(--foreground)'}>
          {workloadData[index!]!.name}
        </text>
        <text
          className="tabular-nums font-mono"
          x={chartWidth - 50}
          y={y}
          dy={-10}
          textAnchor="end"
          fill={'var(--muted-foreground)'}
        >
          {`${workloadData[index!]!.hours}h`}
        </text>
      </g>
    )
  }

  const chartConfig = {
    label: { color: 'var(--foreground)' },
    tick: { color: 'var(--muted-foreground)' },
    grid: { color: 'var(--border)' },
    bar: {
      color: 'var(--primary)',
    },
  }

  console.log(workloadData)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Workloads by Task</CardTitle>
          <Badge variant="secondary">Total: {totalWorkload}h</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-end flex-1">
        <ChartContainer
          config={chartConfig}
          className="w-full"
          style={{ height: Math.max(200, workloadData.length * 60) + 'px' }}
        >
          <ResponsiveContainer
            width="100%"
            onResize={(width) => {
              setChartWidth(width)
            }}
          >
            <BarChart
              data={workloadData}
              layout="vertical"
              margin={{ top: 0, right: 20, left: 10, bottom: 20 }}
              barCategoryGap={10}
            >
              <XAxis
                type="number"
                tick={{ fill: chartConfig.tick.color }}
                fontSize={11}
                tickMargin={10}
                className="tabular-nums font-mono"
                tickFormatter={(value) => `${value}h`}
                tickLine={{ stroke: chartConfig.tick.color }}
                axisLine={true}
              />
              <YAxis type="category" dataKey="name" tick={false} width={1} />
              <Bar
                dataKey="hours"
                barSize={5}
                name="Hours"
                fill={chartConfig.bar.color}
                radius={[0, 4, 4, 0]}
                label={({ x, y, width, value, index }) => (
                  <CustomLabel x={x} y={y} width={width} value={value} index={index} />
                )}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
