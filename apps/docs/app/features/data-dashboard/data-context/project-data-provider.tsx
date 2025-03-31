'use client'

import { createContext, useContext, useMemo, ReactNode } from 'react'
import {
  Employee,
  EmployeeInProject,
  Epic,
  ProjectMilestone,
  Task,
  TaskWorkload,
  Project,
  ExpertiseDomain,
} from '../types/domain'
import { useEmployeeContext } from './employee-provider'

// Define the shape of our context
interface ProjectDataContextType {
  // Project data
  project: Project
  epics: Epic[]
  tasks: Task[]
  milestones: ProjectMilestone[]
  employeesInProject: EmployeeInProject[]
  projectEmployees: { employee: Employee; role: string }[]

  // Project selectors
  getProjectEndDate: () => Date | null

  // Epic-based selectors
  getTasksByEpic: (epicId: string) => Task[]

  // Task-based selectors
  getWorkloadsByTask: (taskId: string) => { workload: TaskWorkload; employee: Employee }[]
  getTotalWorkloadForTask: (taskId: string) => number

  // Status-based selectors
  getTasksByStatus: (status: string) => Task[]

  // Domain-based selectors
  getTasksByExpertiseDomain: (domain: ExpertiseDomain) => Task[]
}

// Create the context with default undefined value
const ProjectDataContext = createContext<ProjectDataContextType | undefined>(undefined)

// Provider component
export function ProjectDataProvider({
  children,
  project,
  epics,
  tasks,
  milestones,
  employeesInProject,
  taskWorkloads,
}: {
  children: ReactNode
  project: Project
  epics: Epic[]
  tasks: Task[]
  milestones: ProjectMilestone[]
  employeesInProject: EmployeeInProject[]
  taskWorkloads: TaskWorkload[]
}) {
  const { getEmployeeById } = useEmployeeContext()

  // Create memoized selectors
  const selectors = useMemo(() => {
    // Get employees for this project
    const projectEmployees = employeesInProject
      .filter((emp) => emp.projectId === project.id)
      .map((emp) => {
        const employee = getEmployeeById(emp.employeeId)
        return employee ? { employee, role: emp.role } : null
      })
      .filter((item): item is { employee: Employee; role: string } => item !== null)

    // Epic-based selectors
    const getTasksByEpic = (epicId: string) => tasks.filter((task) => task.epicId === epicId)

    // Task-based selectors
    const getWorkloadsByTask = (taskId: string) => {
      const workloads = taskWorkloads.filter((wl) => wl.taskId === taskId)
      return workloads
        .map((workload) => {
          const employee = getEmployeeById(workload.userId)
          return employee ? { workload, employee } : null
        })
        .filter((item): item is { workload: TaskWorkload; employee: Employee } => item !== null)
    }

    const getTotalWorkloadForTask = (taskId: string) =>
      taskWorkloads.filter((wl) => wl.taskId === taskId).reduce((total, wl) => total + wl.workload, 0)

    // Status-based selectors
    const getTasksByStatus = (status: string) => tasks.filter((task) => task.status === status)

    // Domain-based selectors
    const getTasksByExpertiseDomain = (domain: ExpertiseDomain) =>
      tasks.filter((task) => task.relatedExpertiseDomains.includes(domain))

    // Project end date selector
    const getProjectEndDate = () => {
      // Check if there's a ProjectEnd milestone
      const projectEndMilestone = milestones.find((milestone) => milestone.type === 'ProjectEnd')

      // If there's a ProjectEnd milestone, use its date
      if (projectEndMilestone) {
        return new Date(projectEndMilestone.dueDate)
      }

      // Otherwise, it's an open-ended project
      return null
    }

    return {
      projectEmployees,
      getTasksByEpic,
      getWorkloadsByTask,
      getTotalWorkloadForTask,
      getTasksByStatus,
      getTasksByExpertiseDomain,
      getProjectEndDate,
    }
  }, [project, tasks, milestones, employeesInProject, taskWorkloads, getEmployeeById])

  // Create the context value
  const contextValue = useMemo(
    () => ({
      // Project data
      project,
      epics,
      tasks,
      milestones,
      employeesInProject,

      // Selectors
      ...selectors,
    }),
    [project, epics, tasks, milestones, employeesInProject, selectors],
  )

  return <ProjectDataContext.Provider value={contextValue}>{children}</ProjectDataContext.Provider>
}

// Custom hook to use the context
export function useProjectDataContext() {
  const context = useContext(ProjectDataContext)
  if (context === undefined) {
    throw new Error('useProjectDataContext must be used within a ProjectDataProvider')
  }
  return context
}
