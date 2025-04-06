import { Epic, Task, TaskWorkload } from '../types/domain'
import { generateDayParts, generateDailyWorkload, generateDatesBetween } from './workload-utils'

export const epic2: Epic = {
  id: 'epic-2',
  projectId: 'proj-1',
  name: 'User Management and Security',
  description: 'Features focused on user authentication and secure transactions',
  status: 'planned',
  budget: 55000
}

export const epic2Tasks: Task[] = [
  {
    id: 'task-2',
    projectId: 'proj-1',
    epicId: 'epic-2',
    name: 'Implement Authentication',
    description: 'Add secure user authentication and authorization',
    relatedExpertiseDomains: ['backend', 'frontend', 'qa'],
    tags: ['security', 'auth', 'user-management'],
    status: 'planned',
    lastActive: '2025-03-24T16:30:45.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-4', 'emp-6', 'emp-8']
  },
  {
    id: 'task-4',
    projectId: 'proj-1',
    epicId: 'epic-2',
    name: 'Add Payment Gateway Integration',
    description: 'Integrate multiple payment providers into checkout flow',
    relatedExpertiseDomains: ['backend', 'frontend', 'qa'],
    tags: ['payments', 'integration', 'feature'],
    status: 'planned',
    lastActive: '2025-03-22T11:45:30.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-4', 'emp-6', 'emp-8']
  },
  {
    id: 'task-7',
    projectId: 'proj-1',
    epicId: 'epic-2',
    name: 'Create User Profile Page',
    description: 'Design and implement user profile settings screen',
    relatedExpertiseDomains: ['frontend', 'design', 'ux', 'qa'],
    tags: ['user-management', 'ui', 'feature'],
    status: 'planned',
    lastActive: '2025-03-23T14:20:30.000Z',
    type: 'feature',
    priority: 'medium',
    assignedEmployeeIds: ['emp-1', 'emp-5', 'emp-8']
  }
]



export const epic2Workloads = [] 