'use client'

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import {
  User,
  Project,
  Task,
  Risk,
  Milestone,
  ProjectMetric,
  TimelineEvent,
  TaskStatus,
  TaskPriority,
  EpicDetail,
} from '../types'
import {
  currentProject,
  tasks,
  risks,
  milestones,
  projectMetrics,
  timelineEvents,
  getActiveTeamMembers,
  users,
  DEFAULT_HOURLY_RATE,
} from './mock-data'

// --- Types ---

type FilterOptions = {
  timeRange: string
  taskStatus?: string[]
  assignee?: string[]
  riskStatus?: string[]
  milestoneStatus?: string[]
  priority?: string[]
}

type DataContextType = {
  // Current data
  project: Project
  filteredTasks: Task[]
  filteredRisks: Risk[]
  filteredMilestones: Milestone[]
  filteredTimeline: TimelineEvent[]
  metrics: ProjectMetric[]
  teamMembers: User[]

  // Added calculated data
  projectProgress: number
  epicDetails: EpicDetail[]
  totalEstimatedHours: number
  completedEstimatedHours: number

  // Filter state
  filters: FilterOptions
  setFilters: (filters: Partial<FilterOptions>) => void
  resetFilters: () => void

  // Helper actions
  updateTaskStatus: (taskId: string, status: TaskStatus) => void
  updateTaskPriority: (taskId: string, priority: TaskPriority) => void
  updateRiskStatus: (riskId: string, status: string) => void
  updateMilestoneStatus: (milestoneId: string, status: string) => void
}

const defaultFilters: FilterOptions = {
  timeRange: 'project',
  taskStatus: [],
  assignee: [],
  riskStatus: [],
  milestoneStatus: [],
  priority: [],
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<FilterOptions>(defaultFilters)
  const [tasksList, setTasksList] = useState<Task[]>(tasks)

  // Create a user rate map for efficient lookup
  const userRateMap = useMemo(() => {
    const map: Record<string, number> = {}
    users.forEach((user) => {
      if (user.hourlyRate !== undefined) {
        map[user.id] = user.hourlyRate
      }
    })
    return map
  }, [])

  // Memoized filtered data
  const filteredTasks = useMemo(() => {
    let result = tasksList

    if (filters.taskStatus && filters.taskStatus.length > 0) {
      result = result.filter((task) => filters.taskStatus?.includes(task.status))
    }

    if (filters.assignee && filters.assignee.length > 0) {
      result = result.filter((task) => filters.assignee?.includes(task.assignee ?? ''))
    }

    if (filters.priority && filters.priority.length > 0) {
      result = result.filter((task) => filters.priority?.includes(task.priority))
    }

    // Apply time range filter if needed
    if (filters.timeRange !== 'project') {
      const currentDate = new Date()
      let startDate = new Date()

      switch (filters.timeRange) {
        case 'week':
          startDate.setDate(currentDate.getDate() - 7)
          break
        case 'month':
          startDate.setMonth(currentDate.getMonth() - 1)
          break
        case 'quarter':
          startDate.setMonth(currentDate.getMonth() - 3)
          break
      }

      // Filter tasks by due date
      result = result.filter((task) => {
        const dueDate = new Date(task.dueDate)
        return dueDate >= startDate && dueDate <= currentDate
      })
    }

    return result
  }, [tasksList, filters])

  const filteredRisks = useMemo(() => {
    let result = risks

    if (filters.riskStatus && filters.riskStatus.length > 0) {
      result = result.filter((risk) => filters.riskStatus?.includes(risk.status))
    }

    if (filters.assignee && filters.assignee.length > 0) {
      result = result.filter((risk) => filters.assignee?.includes(risk.assignee))
    }

    return result
  }, [filters])

  const filteredMilestones = useMemo(() => {
    let result = milestones

    if (filters.milestoneStatus && filters.milestoneStatus.length > 0) {
      result = result.filter((milestone) => filters.milestoneStatus?.includes(milestone.status))
    }

    return result
  }, [filters])

  const filteredTimeline = useMemo(() => {
    let result = timelineEvents

    // Apply time range filter if needed
    if (filters.timeRange !== 'project') {
      const currentDate = new Date()
      let startDate = new Date()

      switch (filters.timeRange) {
        case 'week':
          startDate.setDate(currentDate.getDate() - 7)
          break
        case 'month':
          startDate.setMonth(currentDate.getMonth() - 1)
          break
        case 'quarter':
          startDate.setMonth(currentDate.getMonth() - 3)
          break
      }

      // Filter timeline events by date
      result = result.filter((event) => {
        const eventDate = new Date(event.date)
        return eventDate >= startDate && eventDate <= currentDate
      })
    }

    return result
  }, [filters])

  const teamMembers = useMemo(() => {
    return getActiveTeamMembers()
  }, [])

  // --- Combined Calculations (Progress, Epics with Costs) ---
  const { totalEstimatedHours, completedEstimatedHours, epicDetails, projectProgress } = useMemo(() => {
    let totalProjectEstimatedHours = 0
    let totalProjectCompletedHours = 0
    // Extended epicsMap to hold cost and estimated hours
    const epicsMap: Record<
      string,
      {
        tasks: Task[]
        totalActualHours: number
        totalEstimatedHours: number
        totalCost: number
        estimatedCost: number
        lastDueDate: Date | null
      }
    > = {}

    tasksList.forEach((task) => {
      const estimated = task.estimatedHours || 0
      totalProjectEstimatedHours += estimated
      if (task.status === 'done') {
        totalProjectCompletedHours += estimated
      }

      const epicTag = task.tags.find((tag) => tag.startsWith('epic:'))
      if (epicTag) {
        const epicName = epicTag.split(':')[1]
        if (epicName) {
          if (!epicsMap[epicName]) {
            epicsMap[epicName] = {
              tasks: [],
              totalActualHours: 0,
              totalEstimatedHours: 0,
              totalCost: 0,
              estimatedCost: 0,
              lastDueDate: null,
            }
          }
          const currentEpic = epicsMap[epicName]!
          currentEpic.tasks.push(task)

          // Calculate costs based on assignee rate
          const rate = task.assignee ? (userRateMap[task.assignee] ?? DEFAULT_HOURLY_RATE) : DEFAULT_HOURLY_RATE
          const actualHours = task.actualHours || 0
          const estimatedHours = task.estimatedHours || 0

          currentEpic.totalActualHours += actualHours
          currentEpic.totalEstimatedHours += estimatedHours // Accumulate estimated hours per epic
          currentEpic.totalCost += actualHours * rate
          currentEpic.estimatedCost += estimatedHours * rate

          const taskDueDate = task.dueDate ? new Date(task.dueDate) : null
          if (taskDueDate && (!currentEpic.lastDueDate || taskDueDate > currentEpic.lastDueDate)) {
            currentEpic.lastDueDate = taskDueDate
          }
        }
      }
    })

    // Map to EpicDetail including new cost fields
    const calculatedEpicDetails: EpicDetail[] = Object.entries(epicsMap).map(([name, data]) => {
      const isCompleted = data.tasks.every((t) => t.status === 'done')
      return {
        name,
        totalActualHours: data.totalActualHours,
        totalEstimatedHours: data.totalEstimatedHours, // Added
        totalCost: data.totalCost, // Added
        estimatedCost: data.estimatedCost, // Added
        isCompleted,
        lastDueDate: data.lastDueDate,
      }
    })

    // Sort by last due date descending
    calculatedEpicDetails.sort((a, b) => {
      if (!a.lastDueDate) return 1
      if (!b.lastDueDate) return -1
      return b.lastDueDate.getTime() - a.lastDueDate.getTime()
    })

    const progress =
      totalProjectEstimatedHours > 0 ? Math.round((totalProjectCompletedHours / totalProjectEstimatedHours) * 100) : 0

    return {
      totalEstimatedHours: totalProjectEstimatedHours,
      completedEstimatedHours: totalProjectCompletedHours,
      epicDetails: calculatedEpicDetails,
      projectProgress: progress,
    }
  }, [tasksList, userRateMap])

  // Update functions
  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasksList((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status } : task)))
    console.log(`Updating task ${taskId} to status ${status}`)
  }

  const updateTaskPriority = (taskId: string, priority: TaskPriority) => {
    setTasksList((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, priority } : task)))
    console.log(`Updating task ${taskId} to priority ${priority}`)
  }

  const updateRiskStatus = (riskId: string, status: string) => {
    console.log(`Updating risk ${riskId} to status ${status}`)
  }

  const updateMilestoneStatus = (milestoneId: string, status: string) => {
    console.log(`Updating milestone ${milestoneId} to status ${status}`)
  }

  // Filter functions
  const setFilters = (newFilters: Partial<FilterOptions>) => {
    setFiltersState((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }))
  }

  const resetFilters = () => {
    setFiltersState(defaultFilters)
  }

  // --- Provide all data through the main context ---
  const value: DataContextType = {
    project: currentProject,
    filteredTasks,
    filteredRisks,
    filteredMilestones,
    filteredTimeline,
    metrics: projectMetrics,
    teamMembers,
    filters,
    setFilters,
    resetFilters,
    updateTaskStatus,
    updateTaskPriority,
    updateRiskStatus,
    updateMilestoneStatus,
    projectProgress,
    epicDetails,
    totalEstimatedHours,
    completedEstimatedHours,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useProjectData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useProjectData must be used within a DataProvider')
  }
  return context
}

export function useTasksData() {
  const { filteredTasks, updateTaskStatus, updateTaskPriority } = useProjectData()
  return { tasks: filteredTasks, updateTaskStatus, updateTaskPriority }
}

export function useRisksData() {
  const { filteredRisks, updateRiskStatus } = useProjectData()
  return { risks: filteredRisks, updateRiskStatus }
}

export function useMilestonesData() {
  const { filteredMilestones, updateMilestoneStatus } = useProjectData()
  return { milestones: filteredMilestones, updateMilestoneStatus }
}

export function useTimelineData() {
  const { filteredTimeline } = useProjectData()
  return { timeline: filteredTimeline }
}

export function useTeamData() {
  const { teamMembers } = useProjectData()
  return { teamMembers }
}

export function useMetricsData() {
  const { metrics, projectProgress } = useProjectData()
  return { metrics, projectProgress }
}

export function useFilterControls() {
  const { filters, setFilters, resetFilters } = useProjectData()
  return { filters, setFilters, resetFilters }
}

export function useEpicDetails() {
  const { epicDetails } = useProjectData()
  return epicDetails
}
