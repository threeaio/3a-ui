import { Epic, Task, TaskWorkload } from '../types/domain'
import { generateDayParts, generateDailyWorkload, generateDatesBetween } from './workload-utils'
import { getDomainsFromTags } from './tag-to-domain-mapping'

export const epic2: Epic = {
  id: 'epic-2',
  projectId: 'proj-1',
  name: 'User Management and Security',
  description: 'Features focused on user authentication and secure transactions',
  status: 'planned',
  budget: 55000,
  assignedEmployeeIds: ['emp-4']
}

// Helper function to create a task with mapped domains
const createTaskWithMappedDomains = (task: Omit<Task, 'relatedExpertiseDomains'> & { tags: string[] }): Task => ({
  ...task,
  relatedExpertiseDomains: getDomainsFromTags(task.tags)
})

export const epic2Tasks: Task[] = [
  createTaskWithMappedDomains({
    id: 'task-2',
    projectId: 'proj-1',
    epicId: 'epic-2',
    name: 'Implement Authentication',
    description: 'Add secure user authentication and authorization',
    tags: ['security', 'auth', 'jwt', 'oauth2', 'role-based-access', 'next-auth'],
    status: 'planned',
    lastActive: '2025-03-24T16:30:45.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-4', 'emp-6', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-4',
    projectId: 'proj-1',
    epicId: 'epic-2',
    name: 'Add Payment Gateway Integration',
    description: 'Integrate multiple payment providers into checkout flow',
    tags: ['payments', 'stripe-integration', 'payment-processing', 'security', 'pci-compliance', 'error-handling'],
    status: 'planned',
    lastActive: '2025-03-22T11:45:30.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-4', 'emp-6', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-7',
    projectId: 'proj-1',
    epicId: 'epic-2',
    name: 'Create User Profile Page',
    description: 'Design and implement user profile settings screen',
    tags: ['user-management', 'form-validation', 'data-persistence', 'ui-component', 'user-settings', 'profile-management'],
    status: 'planned',
    lastActive: '2025-03-23T14:20:30.000Z',
    type: 'feature',
    priority: 'medium',
    assignedEmployeeIds: ['emp-1', 'emp-5', 'emp-8']
  })
]

export const epic2Workloads = [] 