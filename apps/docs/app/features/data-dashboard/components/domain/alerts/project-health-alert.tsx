'use client'

import React, { useState } from 'react'
import { Card } from '@3a.solutions/ui/card'
import { AlertTriangle, TrendingDown, Bug, Layers, DollarSign, XCircle } from 'lucide-react'
import { Project, Task, Risk } from '../../../types'
import { domainTaskDistribution, domainBudgetDistribution } from '../../../data-context/mock-data'
import { cn } from '@3a.solutions/ui/lib/utils'

interface ProjectHealthAlertProps {
  project: Project
  tasks: Task[]
  risks: Risk[]
  className?: string
}

type AlertType = 'epics' | 'bugs' | 'risks' | 'budget' | 'velocity'

export const ProjectHealthAlert: React.FC<ProjectHealthAlertProps> = ({ project, tasks, risks, className }) => {
  const [mutedAlerts, setMutedAlerts] = useState<AlertType[]>([])

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

  const handleMuteAlert = (type: AlertType) => {
    setMutedAlerts((prev) => [...prev, type])
  }

  const alerts = [
    {
      type: 'epics' as const,
      show: activeEpics > 2 && !mutedAlerts.includes('epics'),
      icon: <Layers className="size-4 text-destructive" />,
      content: (
        <>
          <strong>{activeEpics} epics in progress</strong> - Too many concurrent epics may lead to context switching and
          reduced focus
        </>
      ),
    },
    {
      type: 'bugs' as const,
      show: activeBugs > 3 && !mutedAlerts.includes('bugs'),
      icon: <Bug className="size-4 text-destructive" />,
      content: (
        <>
          <strong>{activeBugs} active bugs</strong> - High number of unresolved bugs may impact project stability
        </>
      ),
    },
    {
      type: 'risks' as const,
      show: criticalRisks > 1 && !mutedAlerts.includes('risks'),
      icon: <AlertTriangle className="size-4 text-destructive" />,
      content: (
        <>
          <strong>{criticalRisks} critical risks active</strong> - Multiple high-severity risks require immediate
          attention
        </>
      ),
    },
    {
      type: 'budget' as const,
      show: budgetToProgressRatio > 1.2 && !mutedAlerts.includes('budget'),
      icon: <DollarSign className="size-4 text-destructive" />,
      content: (
        <>
          <strong>Budget utilization outpacing progress</strong> - {Math.round(budgetProgress)}% of budget spent vs{' '}
          {projectProgress}% project completion
        </>
      ),
    },
    {
      type: 'velocity' as const,
      show: velocityDrop > 20 && !mutedAlerts.includes('velocity'),
      icon: <TrendingDown className="size-4 text-destructive" />,
      content: (
        <>
          <strong>{velocityDrop}% drop in velocity</strong> - Team productivity has decreased significantly in recent
          sprints
        </>
      ),
    },
  ]

  const visibleAlerts = alerts.filter((alert) => alert.show)

  if (visibleAlerts.length === 0) {
    return null
  }

  return (
    <Card className={cn('p-5 bg-destructive/10 dark:bg-destructive/20', className)}>
      <div className="flex items-center gap-2 text-destructive">
        <AlertTriangle className="size-5" />
        <h3 className="">Project Health Warnings</h3>
      </div>
      <div className="mt-3 space-y-3">
        <ul className="grid gap-2">
          {visibleAlerts.map((alert) => (
            <li key={alert.type} className="flex items-center gap-2 text-sm group">
              {alert.icon}
              <span>{alert.content}</span>
              <button
                onClick={() => handleMuteAlert(alert.type)}
                className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                title="Mute this alert"
              >
                <XCircle className="size-4 text-muted-foreground hover:text-foreground" />
              </button>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground mt-4">
          These issues may impact project delivery. Consider reviewing with the team during the next sprint planning.
        </p>
      </div>
    </Card>
  )
}

export default ProjectHealthAlert
