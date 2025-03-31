import { ExpertiseDomain } from "@/features/data-dashboard/types/domain/expertise-domain"
import { ProjectStatus, MilestoneStatus } from "./status"

export type MilestoneType = 'ProjectStart' | 'ProjectEnd' // TODO: add more types

export type EmployeeInProject = {
    employeeId: string
    projectId: string
    role: string
    expertiseDomainInProject: ExpertiseDomain[]
    startDate: string
    endDate: string
  }

export type ProjectMilestone = {
    id: string
    projectId: string
    name: string
    description?: string
    dueDate: string
    type?: MilestoneType
    status: MilestoneStatus
}

export type Project = {
    id: string
    name: string
    description?: string
    status: ProjectStatus
    lastActive: string
    budget: number // in euros
}




