'use client'

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react'
import { User, Project, Task, Risk, Milestone, ProjectMetric, TimelineEvent, TaskStatus, TaskPriority } from '../types'
import {
  currentProject,
  tasks,
  risks,
  milestones,
  projectMetrics,
  timelineEvents,
  getActiveTeamMembers,
} from './mock-data'

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

  const value = {
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
  const { metrics } = useProjectData()
  return { metrics }
}

export function useFilterControls() {
  const { filters, setFilters, resetFilters } = useProjectData()
  return { filters, setFilters, resetFilters }
}
