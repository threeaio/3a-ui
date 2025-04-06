import { ExpertiseDomain } from "./expertise-domain"
import { TaskStatus } from "./status"


export type TaskType = 'feature' | 'bugfix' | 'refactoring' | 'maintenance' | 'design' | 'change-request'
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export type Task = {
    id: string
    projectId: string
    epicId?: string
    name: string
    description: string
    relatedExpertiseDomains: ExpertiseDomain[]
    assignedEmployeeIds: string[]
    tags: string[]
    status: TaskStatus
    lastActive: string
    type: TaskType
    priority: TaskPriority
}

export type TaskWorkload = {
    taskId: string
    workload: number // in hours
    userId: string
    date: Date
}