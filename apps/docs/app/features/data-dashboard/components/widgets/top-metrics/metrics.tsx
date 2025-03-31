'use client'

import { FC } from 'react'
import { MetricCard } from './metric-card'
import { useProjectDataContext } from '../../../data-context/project-data-provider'

export const Metrics: FC = () => {
  const dataContext = useProjectDataContext()

  // Get current project data
  const { project, tasks } = dataContext

  // Calculate completion progress
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === 'completed').length
  const completionProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Calculate budget utilization
  // Since we don't have direct budget utilization, calculate based on task workloads and hourly rates
  let totalBudgetUsed = 0

  tasks.forEach((task) => {
    const workloadItems = dataContext.getWorkloadsByTask(task.id)
    workloadItems.forEach((item) => {
      // Access the workload property from the workload object in the item
      const workloadHours = item.workload.workload
      const hourlyRate = item.employee.hourlyRate || 0

      // Both workloadHours and hourlyRate are now numbers, so multiplication is safe
      totalBudgetUsed += workloadHours * hourlyRate
    })
  })

  const budgetUtilization = project.budget > 0 ? Math.round((totalBudgetUsed / project.budget) * 100) : 0

  // Calculate remaining days using the data provider
  const today = new Date()
  const projectEndDate = dataContext.getProjectEndDate()

  // Calculate remaining days if there's an end date
  let remainingDays = 0
  if (projectEndDate) {
    remainingDays = Math.max(0, Math.ceil((projectEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  }

  // Format date to DD.M.YYYY format
  const formatDate = (date: Date) => {
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('de-DE')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        name="Completion Progress"
        value={completionProgress}
        change={0}
        trend="neutral"
        suffix="%"
        metricType="progress"
      />

      <MetricCard
        name="Tasks Completed"
        value={completedTasks}
        change={0}
        trend="neutral"
        metricType="tasks"
        subline={`${completedTasks}/${totalTasks} tasks`}
      />

      <MetricCard
        name="Budget Utilization"
        value={budgetUtilization}
        change={0}
        trend="neutral"
        suffix="%"
        metricType="budget"
        subline={`$${formatCurrency(totalBudgetUsed)}/$${formatCurrency(project.budget)}`}
      />

      <MetricCard
        name="Remaining Days"
        value={remainingDays}
        change={0}
        trend="neutral"
        metricType="timeRemaining"
        subline={
          projectEndDate ? `End: ${formatDate(projectEndDate)} (${remainingDays} days total)` : 'Open-ended project'
        }
      />
    </div>
  )
}
