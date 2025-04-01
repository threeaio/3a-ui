import {
  Employee,
  EmployeeInProject,
  ExpertiseDomain,
  Task,
  TaskWorkload,
} from '../types/domain'

export interface DomainTaskCount {
  domain: ExpertiseDomain
  count: number
}

export interface DomainTaskStatusCount {
  domain: ExpertiseDomain
  planned: number
  inProgress: number
  completed: number
}

export interface DomainWorkload {
  domain: ExpertiseDomain
  hours: number
}

export interface DomainCost {
  domain: ExpertiseDomain
  cost: number
}

export function getDomainTaskCountsByStatus(
  tasks: Task[],
  expertiseDomains: ExpertiseDomain[],
): DomainTaskStatusCount[] {
  const domainCounts = new Map<ExpertiseDomain, { planned: number; inProgress: number; completed: number }>()

  // Initialize counts for all domains
  expertiseDomains.forEach((domain) => {
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

export function getDomainWorkloadAnalysis(
  tasks: Task[],
  taskWorkloads: TaskWorkload[],
  employeesInProject: EmployeeInProject[],
  projectId: string,
  expertiseDomains: ExpertiseDomain[],
): DomainWorkload[] {
  const domainWorkloads = new Map<ExpertiseDomain, number>()

  // Initialize workloads for all domains
  expertiseDomains.forEach((domain) => {
    domainWorkloads.set(domain, 0)
  })

  // Process each workload entry
  taskWorkloads.forEach((workload) => {
    const task = tasks.find((t) => t.id === workload.taskId)
    const employeeInProject = employeesInProject.find(
      (emp) => emp.employeeId === workload.userId && emp.projectId === projectId,
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

export function getDomainCostAnalysis(
  tasks: Task[],
  taskWorkloads: TaskWorkload[],
  employeesInProject: EmployeeInProject[],
  projectId: string,
  expertiseDomains: ExpertiseDomain[],
  getEmployeeById: (id: string) => Employee | undefined,
): DomainCost[] {
  const domainCosts = new Map<ExpertiseDomain, number>()

  // Initialize costs for all domains
  expertiseDomains.forEach((domain) => {
    domainCosts.set(domain, 0)
  })

  // Process each workload entry
  taskWorkloads.forEach((workload) => {
    const task = tasks.find((t) => t.id === workload.taskId)
    const employeeInProject = employeesInProject.find(
      (emp) => emp.employeeId === workload.userId && emp.projectId === projectId,
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
