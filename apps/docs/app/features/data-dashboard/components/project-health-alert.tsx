'use client'

import React from 'react'
import { Card } from '@3a.solutions/ui/card'
import { AlertTriangle, TrendingDown, Bug, Layers, DollarSign } from 'lucide-react'
import { Project, Task, Risk } from '../types'
import { domainTaskDistribution, domainBudgetDistribution } from '../data-context/mock-data'

interface ProjectHealthAlertProps {
  project: Project
  tasks: Task[]
  risks: Risk[]
}

export const ProjectHealthAlert: React.FC<ProjectHealthAlertProps> = ({ project, tasks, risks }) => {
  // Calculate health metrics
  const activeEpics = domainTaskDistribution.filter((d) => d.inProgress > 0).length
  const activeBugs = tasks.filter((t) => t.tags.includes('bug') && t.status === 'in-progress').length
  const criticalRisks = risks.filter((r) => r.severity === 'high' && r.status !== 'resolved').length

  // Calculate budget health
  const totalBudgetSpent = domainBudgetDistribution.reduce((acc, curr) => acc + curr.spent, 0)
  const totalBudget = domainBudgetDistribution.reduce((acc, curr) => acc + curr.budget, 0)
  const budgetProgress = (totalBudgetSpent / totalBudget) * 100
  const projectProgress = project.progress
  const budgetToProgressRatio = budgetProgress / projectProgress

  // Calculate velocity drop (mocked for example)
  const velocityDrop = 25 // This would normally be calculated from sprint metrics

  // Determine if we should show the alert
  const shouldShowAlert =
    activeEpics > 2 || // Too many epics in progress
    activeBugs > 3 || // Too many active bugs
    criticalRisks > 1 || // Multiple critical risks
    budgetToProgressRatio > 1.2 || // Spending more than progress
    velocityDrop > 20 // Significant velocity drop

  if (!shouldShowAlert) {
    return null
  }

  return (
    <Card className="mb-5 p-5 border-destructive bg-destructive/10">
      <div className="flex items-center gap-2 text-destructive">
        <AlertTriangle className="size-5" />
        <h3 className="font-medium">Project Health Warnings</h3>
      </div>
      <div className="mt-3 space-y-3">
        <ul className="grid gap-2">
          {activeEpics > 2 && (
            <li className="flex items-center gap-2 text-sm">
              <Layers className="size-4 text-destructive" />
              <span>
                <strong>{activeEpics} epics in progress</strong> - Too many concurrent epics may lead to context
                switching and reduced focus
              </span>
            </li>
          )}

          {activeBugs > 3 && (
            <li className="flex items-center gap-2 text-sm">
              <Bug className="size-4 text-destructive" />
              <span>
                <strong>{activeBugs} active bugs</strong> - High number of unresolved bugs may impact project stability
              </span>
            </li>
          )}

          {criticalRisks > 1 && (
            <li className="flex items-center gap-2 text-sm">
              <AlertTriangle className="size-4 text-destructive" />
              <span>
                <strong>{criticalRisks} critical risks active</strong> - Multiple high-severity risks require immediate
                attention
              </span>
            </li>
          )}

          {budgetToProgressRatio > 1.2 && (
            <li className="flex items-center gap-2 text-sm">
              <DollarSign className="size-4 text-destructive" />
              <span>
                <strong>Budget utilization outpacing progress</strong> - {Math.round(budgetProgress)}% of budget spent
                vs {projectProgress}% project completion
              </span>
            </li>
          )}

          {velocityDrop > 20 && (
            <li className="flex items-center gap-2 text-sm">
              <TrendingDown className="size-4 text-destructive" />
              <span>
                <strong>{velocityDrop}% drop in velocity</strong> - Team productivity has decreased significantly in
                recent sprints
              </span>
            </li>
          )}
        </ul>

        <p className="text-xs text-muted-foreground mt-4">
          These issues may impact project delivery. Consider reviewing with the team during the next sprint planning.
        </p>
      </div>
    </Card>
  )
}

export default ProjectHealthAlert
