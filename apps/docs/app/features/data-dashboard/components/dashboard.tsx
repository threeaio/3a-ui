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
} from './charts'
import { MetricCard } from './metric-card'
import UnassignedTasksAlert from './unassigned-tasks-alert'
import ProjectHealthAlert from './project-health-alert'

const Dashboard: React.FC = () => {
  const { project } = useProjectData()
  const { metrics } = useMetricsData()

  const taskDataKeys = [
    { key: 'tasks', name: 'Total Tasks' },
    { key: 'completed', name: 'Completed' },
    { key: 'inProgress', name: 'In Progress' },
    { key: 'todo', name: 'To Do' },
  ]

  const hoursDataKeys = [
    { key: 'estimatedHours', name: 'Estimated Hours' },
    { key: 'actualHours', name: 'Actual Hours' },
  ]

  const budgetDataKeys = [
    { key: 'budget', name: 'Budget' },
    { key: 'spent', name: 'Spent' },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 bg-background">
          <div className="flex flex-col h-full p-5">
            {/* Project Health Alerts */}
            <div className="space-y-2">
              <ProjectHealthAlert project={project} tasks={tasks} risks={risks} />
              <UnassignedTasksAlert tasks={tasks} />
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-2 mb-5">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Task Status Distribution */}
            <TaskStatusBar data={taskStatusChart} />

            {/* Domain Distribution Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">Task Distribution by Domain</h3>
                <DomainRadarChart data={domainTaskDistribution} dataKeys={taskDataKeys} useDomainColors />
              </Card>

              <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">Hours Distribution by Domain</h3>
                <DomainRadarChart data={domainTaskDistribution} dataKeys={hoursDataKeys} useDomainColors />
              </Card>

              <Card className="p-4">
                <h3 className="text-sm font-medium mb-2">Budget Distribution by Domain</h3>
                <DomainRadarChart data={domainBudgetDistribution} dataKeys={budgetDataKeys} useDomainColors />
              </Card>
            </div>

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
