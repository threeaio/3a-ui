'use client'

import React from 'react'
import { Card, CardHeader } from '@3a.solutions/ui/card'
import ProjectPanel from './domain/panels/project-panel'
import TasksPanel from './domain/panels/tasks-panel'
import TeamMembersPanel from './domain/panels/team-members-panel'
import { DataKey, useProjectData } from '../data-context'
import { useMetricsData } from '../data-context'
import {
  taskStatusChart,
  riskSeverityChart,
  teamMemberTasksChart,
  burndownData,
  budgetData,
  domainTaskDistribution,
  domainBudgetDistribution,
  tasks,
  risks,
} from '../data-context/mock-data'
import {
  TaskStatusBar,
  RiskSeverityChart,
  TeamWorkloadChart,
  BurndownChart,
  BudgetChart,
  DomainRadarChart,
  TaskStatusBarCustom,
} from './domain/charts'
import { MetricCard } from './domain/panels/metric-card'
import UnassignedTasksAlert from './domain/alerts/unassigned-tasks-alert'
import ProjectHealthAlert from './domain/alerts/project-health-alert'
import { EpicCostCard } from '@/features/data-dashboard-sketch/components/domain/panels/epic-cost-card'

const Dashboard: React.FC = () => {
  const { project } = useProjectData()
  const { metrics } = useMetricsData()

  const taskDataKeys: DataKey[] = [
    { key: 'tasks', name: 'Total Tasks', color: 'var(--color-chart-violet)' },
    { key: 'completed', name: 'Completed', color: 'var(--color-chart-green)' },
    { key: 'inProgress', name: 'In Progress', color: 'var(--color-chart-blue)' },
  ]

  const hoursDataKeys: DataKey[] = [
    { key: 'estimatedHours', name: 'Estimated Hours', color: 'var(--color-chart-violet)' },
    { key: 'actualHours', name: 'Actual Hours', color: 'var(--color-chart-blue)' },
  ]

  const budgetDataKeys: DataKey[] = [
    { key: 'budget', name: 'Budget', color: 'var(--color-chart-violet)' },
    { key: 'spent', name: 'Spent', color: 'var(--color-chart-blue)' },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 bg-background">
          <div className="flex flex-col h-full p-5">
            {/* Project Health Alerts */}
            <div className="space-y-5 mb-5">
              <ProjectHealthAlert project={project} tasks={tasks} risks={risks} />
              <UnassignedTasksAlert tasks={tasks} />
            </div>

            {/* Metrics Cards & Epic Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-2 mb-2">
              {metrics.map((metric, index) => {
                let metricType: 'progress' | 'tasks' | 'budget' | 'timeRemaining' | undefined

                // Determine metricType based on metric name
                if (metric.name === 'Completion Progress') {
                  metricType = 'progress'
                } else if (metric.name === 'Tasks Completed') {
                  metricType = 'tasks'
                } else if (metric.name === 'Budget Utilization') {
                  metricType = 'budget'
                } else if (metric.name === 'Remaining Days') {
                  metricType = 'timeRemaining'
                }

                return <MetricCard key={index} {...metric} metricType={metricType} />
              })}
            </div>

            <div className="mb-10">
              <EpicCostCard />
            </div>

            {/* Task Status Distribution */}
            <div className="mb-5 h-25">
              <TaskStatusBarCustom data={taskStatusChart} />
            </div>

            {/* Domain Distribution Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <Card>
                <CardHeader>
                  <h3 className="text-sm font-medium mb-2">Task Distribution by Domain</h3>
                </CardHeader>

                <DomainRadarChart data={domainTaskDistribution} dataKeys={taskDataKeys} />
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-sm font-medium mb-2">Hours Distribution by Domain</h3>
                </CardHeader>
                <DomainRadarChart data={domainTaskDistribution} dataKeys={hoursDataKeys} />
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-sm font-medium mb-2">Budget Distribution by Domain</h3>
                </CardHeader>
                <DomainRadarChart data={domainBudgetDistribution} dataKeys={budgetDataKeys} />
              </Card>
            </div>

            {/* Burndown and Budget Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <Card className="">
                <CardHeader>
                  <h3>Burndown Chart</h3>
                </CardHeader>
                <BurndownChart data={burndownData} />
              </Card>

              <Card>
                <CardHeader>
                  <h3>Budget Tracking</h3>
                </CardHeader>
                <BudgetChart data={budgetData} />
              </Card>
            </div>

            {/* Project Details and Team Workload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <ProjectPanel project={project} />
              <TeamWorkloadChart data={teamMemberTasksChart} />
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
