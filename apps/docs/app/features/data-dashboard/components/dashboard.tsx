'use client'

import React from 'react'
import { Card } from '@3a.solutions/ui/card'
import ProjectPanel from './project-panel'
import TasksPanel from './tasks-panel'
import TeamMembersPanel from './team-members-panel'
import { useProjectData } from '../data-context'
import { useMetricsData } from '../data-context'
import {
  taskStatusChart,
  riskSeverityChart,
  teamMemberTasksChart,
  burndownData,
  budgetData,
} from '../data-context/mock-data'
import { TaskStatusBar, RiskSeverityChart, TeamWorkloadChart, BurndownChart, BudgetChart } from './charts'
import { MetricCard } from './metric-card'

const Dashboard: React.FC = () => {
  const { project } = useProjectData()
  const { metrics } = useMetricsData()

  return (
    <div className="flex flex-col">
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 bg-background">
          <div className="flex flex-col h-full p-5">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-2 mb-5">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Task Status Distribution */}
            <TaskStatusBar data={taskStatusChart} />

            {/* Project Panel */}
            {/* <div className="mb-5">
              <ProjectPanel project={project} />
            </div> */}

            {/* Risk Severity and Team Workload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <ProjectPanel project={project} />

              <TeamWorkloadChart data={teamMemberTasksChart} />
            </div>

            {/* Burndown and Budget Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">Burndown Chart</h3>
                <BurndownChart data={burndownData} />
              </Card>

              <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">Budget Tracking</h3>
                <BudgetChart data={budgetData} />
              </Card>
            </div>

            {/* Team Members and Tasks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TeamMembersPanel />
              <TasksPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
