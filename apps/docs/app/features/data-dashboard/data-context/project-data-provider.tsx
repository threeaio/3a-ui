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
import { mockExpertiseDomains } from '../_MOCK-DATA/independent-data'

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

  // Domain analysis selectors
  getDomainTaskCounts: () => { domain: ExpertiseDomain; count: number }[]
  getDomainTaskCountsByStatus: () => {
    domain: ExpertiseDomain
    planned: number
    inProgress: number
    completed: number
  }[]
  getDomainWorkloadAnalysis: () => { domain: ExpertiseDomain; hours: number }[]
  getDomainCostAnalysis: () => { domain: ExpertiseDomain; cost: number }[]
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

    // Domain analysis selectors
    const getDomainTaskCounts = () => {
      const domainCounts = new Map<ExpertiseDomain, number>()

      // Initialize counts for all domains
      mockExpertiseDomains.forEach((domain) => {
        domainCounts.set(domain, 0)
      })

      // Count tasks for each domain (full count per domain)
      tasks.forEach((task) => {
        task.relatedExpertiseDomains.forEach((domain) => {
          domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1)
        })
      })

      return Array.from(domainCounts.entries()).map(([domain, count]) => ({
        domain,
        count,
      }))
    }

    const getDomainTaskCountsByStatus = () => {
      const domainCounts = new Map<ExpertiseDomain, { planned: number; inProgress: number; completed: number }>()

      // Initialize counts for all domains
      mockExpertiseDomains.forEach((domain) => {
        domainCounts.set(domain, { planned: 0, inProgress: 0, completed: 0 })
      })

      // Count tasks for each domain by status
      tasks.forEach((task) => {
        task.relatedExpertiseDomains.forEach((domain) => {
          const currentCounts = domainCounts.get(domain) || { planned: 0, inProgress: 0, completed: 0 }
          if (task.status === 'planned') {
            currentCounts.planned++
          } else if (task.status === 'in-progress') {
            currentCounts.inProgress++
          } else if (task.status === 'completed') {
            currentCounts.completed++
          }
          domainCounts.set(domain, currentCounts)
        })
      })

      return Array.from(domainCounts.entries()).map(([domain, counts]) => ({
        domain,
        ...counts,
      }))
    }

    const getDomainWorkloadAnalysis = () => {
      const domainWorkloads = new Map<ExpertiseDomain, number>()

      // Initialize workloads for all domains
      mockExpertiseDomains.forEach((domain) => {
        domainWorkloads.set(domain, 0)
      })

      // Process each workload entry
      taskWorkloads.forEach((workload) => {
        const task = tasks.find((t) => t.id === workload.taskId)
        const employeeInProject = employeesInProject.find(
          (emp) => emp.employeeId === workload.userId && emp.projectId === project.id,
        )

        if (task && employeeInProject) {
          // Find matching domains between task and employee's project domains
          const matchingDomains = task.relatedExpertiseDomains.filter((domain) =>
            employeeInProject.expertiseDomainInProject.includes(domain),
          )

          if (matchingDomains.length > 0) {
            // Split workload equally among matching domains
            const hoursPerDomain = workload.workload / matchingDomains.length
            matchingDomains.forEach((domain) => {
              domainWorkloads.set(domain, (domainWorkloads.get(domain) || 0) + hoursPerDomain)
            })
          } else {
            // If no matching domains, split among all task domains
            const hoursPerDomain = workload.workload / task.relatedExpertiseDomains.length
            task.relatedExpertiseDomains.forEach((domain) => {
              domainWorkloads.set(domain, (domainWorkloads.get(domain) || 0) + hoursPerDomain)
            })
          }
        }
      })

      return Array.from(domainWorkloads.entries()).map(([domain, hours]) => ({
        domain,
        hours,
      }))
    }

    const getDomainCostAnalysis = () => {
      const domainCosts = new Map<ExpertiseDomain, number>()

      // Initialize costs for all domains
      mockExpertiseDomains.forEach((domain) => {
        domainCosts.set(domain, 0)
      })

      // Process each workload entry
      taskWorkloads.forEach((workload) => {
        const task = tasks.find((t) => t.id === workload.taskId)
        const employeeInProject = employeesInProject.find(
          (emp) => emp.employeeId === workload.userId && emp.projectId === project.id,
        )
        const employee = getEmployeeById(workload.userId)

        if (task && employeeInProject && employee?.hourlyRate) {
          // Find matching domains between task and employee's project domains
          const matchingDomains = task.relatedExpertiseDomains.filter((domain) =>
            employeeInProject.expertiseDomainInProject.includes(domain),
          )

          if (matchingDomains.length > 0) {
            // Split cost equally among matching domains
            const costPerDomain = (workload.workload * employee.hourlyRate) / matchingDomains.length
            matchingDomains.forEach((domain) => {
              domainCosts.set(domain, (domainCosts.get(domain) || 0) + costPerDomain)
            })
          } else {
            // If no matching domains, split among all task domains
            const costPerDomain = (workload.workload * employee.hourlyRate) / task.relatedExpertiseDomains.length
            task.relatedExpertiseDomains.forEach((domain) => {
              domainCosts.set(domain, (domainCosts.get(domain) || 0) + costPerDomain)
            })
          }
        }
      })

      return Array.from(domainCosts.entries()).map(([domain, cost]) => ({
        domain,
        cost,
      }))
    }

    return {
      projectEmployees,
      getTasksByEpic,
      getWorkloadsByTask,
      getTotalWorkloadForTask,
      getTasksByStatus,
      getTasksByExpertiseDomain,
      getProjectEndDate,
      getDomainTaskCounts,
      getDomainTaskCountsByStatus,
      getDomainWorkloadAnalysis,
      getDomainCostAnalysis,
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
