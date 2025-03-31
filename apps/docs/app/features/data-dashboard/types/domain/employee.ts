import { ExpertiseDomain } from './expertise-domain'

export type EmployeeSkill = {
    id: string
    name: string
    description: string
    relatedExpertiseDomains: ExpertiseDomain[]
    level: number
}

export type Employee = {
    id: string
    name: string
    email: string
    status: 'active' | 'inactive' | 'pending'
    lastActive: string
    avatar?: string
    hourlyRate?: number
    skills: EmployeeSkill[]
  }

