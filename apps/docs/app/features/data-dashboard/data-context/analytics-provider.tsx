'use client'

import { createContext, useContext, useMemo, ReactNode } from 'react'
import { useEmployeeContext } from './employee-provider'
import { useProjectDataContext } from './project-data-provider'
import { useTasksData } from './tasks-data-provider'
import { analyzeTask } from '../analytics/task-analytics'
import { analyzeEpic } from '../analytics/epic-analytics'
import { analyzeProject } from '../analytics/project-analytics'
import { TaskInsight, EpicBudgetInsight, EpicTaskIssuesInsight, ProjectInsight } from '../analytics/types/insights'

// Define the shape of our context
interface AnalyticsContextType {
  // Task Analytics
  taskInsights: Map<string, TaskInsight[]>
  getTaskInsights: (taskId: string) => TaskInsight[]

  // Epic Analytics
  epicInsights: Map<string, Array<EpicBudgetInsight | EpicTaskIssuesInsight>>
  getEpicInsights: (epicId: string) => Array<EpicBudgetInsight | EpicTaskIssuesInsight>

  // Project Analytics
  projectInsights: ProjectInsight[]
}

// Create the context with default undefined value
const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

// Provider component
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  // Access all required contexts
  const { getEmployeeById } = useEmployeeContext()
  const { project, epics: allEpics, getTaskCost } = useProjectDataContext()
  const { allTasks, epics, getTasksByEpic } = useTasksData()

  // Memoize task insights
  const taskInsightsMap = useMemo(() => {
    const insightsMap = new Map<string, TaskInsight[]>()

    // Analyze all tasks and store their insights
    allTasks.forEach((task) => {
      const insights = analyzeTask(task)
      if (insights.length > 0) {
        insightsMap.set(task.id, insights)
      }
    })

    return insightsMap
  }, [allTasks])

  // Memoize epic insights, using the already computed task insights
  const epicInsightsMap = useMemo(() => {
    const insightsMap = new Map<string, Array<EpicBudgetInsight | EpicTaskIssuesInsight>>()

    // Analyze each epic
    epics.forEach((epic) => {
      const epicTasks = getTasksByEpic(epic.id, true)
      const totalCost = epicTasks.reduce((sum, task) => sum + getTaskCost(task.id), 0)

      // Get task insights for all tasks in this epic
      const epicTaskInsights = epicTasks.flatMap((task) => taskInsightsMap.get(task.id) || [])

      // Analyze epic using task insights
      const insights = analyzeEpic(epic, epicTasks, totalCost, epicTaskInsights)
      if (insights.length > 0) {
        insightsMap.set(epic.id, insights)
      }
    })

    return insightsMap
  }, [epics, getTasksByEpic, getTaskCost, taskInsightsMap])

  // Memoize project insights, using the already computed epic insights
  const projectInsights = useMemo(() => {
    const totalCost = allTasks.reduce((sum, task) => sum + getTaskCost(task.id), 0)

    // Collect all epic insights
    const allEpicInsights = Array.from(epicInsightsMap.values()).flat()

    // Analyze project and enhance the insights with resolved names
    const insights = analyzeProject(project, allEpics, allTasks, totalCost, allEpicInsights)

    // Enhance insights with resolved names
    return insights.map((insight) => {
      if (insight.type === 'EmployeeLoadInsight') {
        const employee = getEmployeeById(insight.metadata.employeeId)
        return {
          ...insight,
          metadata: {
            ...insight.metadata,
            employeeName: employee?.name || 'Unknown Employee',
          },
        }
      }
      if (insight.type === 'ProjectEpicIssuesInsight') {
        return {
          ...insight,
          metadata: {
            ...insight.metadata,
            affectedEpics: insight.metadata.affectedEpics.map((epicInsight) => {
              const epic = allEpics.find((e) => e.id === epicInsight.entityId)
              return {
                ...epicInsight,
                epicName: epic?.name || 'Unknown Epic',
              }
            }),
          },
        }
      }
      return insight
    })
  }, [project, allEpics, allTasks, getTaskCost, epicInsightsMap, getEmployeeById])

  // Create memoized analytics data and methods
  const contextValue = useMemo(
    () => ({
      // Task Analytics
      taskInsights: taskInsightsMap,
      getTaskInsights: (taskId: string) => taskInsightsMap.get(taskId) || [],

      // Epic Analytics
      epicInsights: epicInsightsMap,
      getEpicInsights: (epicId: string) => epicInsightsMap.get(epicId) || [],

      // Project Analytics
      projectInsights,
    }),
    [taskInsightsMap, epicInsightsMap, projectInsights],
  )

  return <AnalyticsContext.Provider value={contextValue}>{children}</AnalyticsContext.Provider>
}

// Custom hook to use the context
export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider')
  }
  return context
}
