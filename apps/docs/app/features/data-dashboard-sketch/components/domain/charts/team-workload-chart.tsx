'use client'

import React from 'react'
import { TrendingUp } from 'lucide-react'
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@3a.solutions/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, LabelProps } from 'recharts'
import { teamMemberTasksChart } from '../../../data-context/mock-data'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@3a.solutions/ui/card'

interface TeamWorkloadChartProps {
  data?: typeof teamMemberTasksChart
}

export const TeamWorkloadChart: React.FC<TeamWorkloadChartProps> = ({ data = teamMemberTasksChart }) => {
  const chartConfig = {
    tasks: { label: 'Tasks', color: 'var(--chart-1)' },
    label: { color: 'hsl(var(--background))' },
    grid: { color: 'var(--border)' },
  }

  const renderCustomLabel = (props: LabelProps) => {
    const { y = 0, value } = props
    const yPos = typeof y === 'number' ? y : 0

    return (
      <text x={0} y={yPos - 10} fill={'var(--foreground)'} textAnchor="start" fontSize={11}>
        {value}
      </text>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Workload Distribution</CardTitle>
        <CardDescription>Current task assignments per team member</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-square md:aspect-video h-80 w-full">
          <BarChart accessibilityLayer data={data} layout="vertical" margin={{ right: 48 }}>
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} hide />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey="tasks" fill="var(--default)" radius={5} barSize={5} name="Assigned Tasks">
              <LabelList dataKey="name" content={renderCustomLabel} className="fill-default-foreground" />
              <LabelList dataKey="tasks" position="right" offset={8} className="fill-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none">
          Task distribution efficiency up by 8.3% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing current workload distribution across team members
        </div>
      </CardFooter>
    </Card>
  )
}

export default TeamWorkloadChart
