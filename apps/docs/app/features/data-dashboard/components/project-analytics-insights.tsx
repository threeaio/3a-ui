'use client'
import { useMemo } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@3a.solutions/ui/alert'
import { AlertCircle } from 'lucide-react'

import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { analyzeProject, renderProjectMessage, analyzeEpic } from '@/features/data-dashboard/analytics'

export function ProjectAnalyticsInsights() {
  const { project, epics, getTaskCost } = useProjectDataContext()
  const { tasks } = useTasksData()

  const totalCost = useMemo(() => tasks.reduce((sum, task) => sum + getTaskCost(task.id), 0), [tasks, getTaskCost])

  // First analyze epics to get epic insights
  const epicInsights = useMemo(() => {
    return epics.flatMap((epic) => {
      const epicTasks = tasks.filter((task) => task.epicId === epic.id)
      const epicCost = epicTasks.reduce((sum, task) => sum + getTaskCost(task.id), 0)
      return analyzeEpic(epic, epicTasks, epicCost, [])
    })
  }, [epics, tasks, getTaskCost])

  // Then analyze project with all data
  const insights = useMemo(() => {
    return analyzeProject(project, epics, tasks, totalCost, epicInsights)
  }, [project, epics, tasks, totalCost, epicInsights])

  if (insights.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      {insights.map((insight) => {
        const data = {
          activeEpicsCount: insight.type === 'TooManyEpicsInsight' ? insight.metadata.activeEpicsCount : undefined,
          maxRecommended: insight.type === 'TooManyEpicsInsight' ? insight.metadata.maxRecommended : undefined,
          projectName: insight.type === 'ProjectBudgetInsight' ? insight.metadata.projectName : undefined,
          percentageUsed: insight.type === 'ProjectBudgetInsight' ? insight.metadata.percentageUsed : undefined,
          employeeTaskCount: insight.type === 'EmployeeLoadInsight' ? insight.metadata.taskCount : undefined,
          threshold: insight.type === 'EmployeeLoadInsight' ? insight.metadata.threshold : undefined,
        }

        return (
          <Alert key={insight.id} variant={insight.severity === 'critical' ? 'destructive' : 'warning'}>
            <AlertCircle className="size-4" />
            <AlertTitle className="capitalize">
              {insight.severity === 'critical' ? 'Critical Issue' : 'Warning'}
            </AlertTitle>
            <AlertDescription>{renderProjectMessage(insight.type, data)}</AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}
