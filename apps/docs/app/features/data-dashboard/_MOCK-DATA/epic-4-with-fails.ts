import { Epic, Task, TaskWorkload } from '../types/domain'
import { generateDayParts, generateDailyWorkload, generateDatesBetween } from './workload-utils'
import { getDomainsFromTags } from './tag-to-domain-mapping'

export const epic4: Epic = {
  id: 'epic-4',
  projectId: 'proj-1',
  name: 'Mobile App Integration',
  description: 'Integrate mobile app features with existing e-commerce platform',
  status: 'in-progress',
  assignedEmployeeIds: ['emp-6', 'emp-8'],
  budget: 35000 // Intentionally low budget that will be exceeded
}

// Helper function to create a task with mapped domains
const createTaskWithMappedDomains = (task: Omit<Task, 'relatedExpertiseDomains'> & { tags: string[] }): Task => ({
  ...task,
  relatedExpertiseDomains: getDomainsFromTags(task.tags)
})

export const epic4Tasks: Task[] = [
  createTaskWithMappedDomains({
    id: 'task-17',
    projectId: 'proj-1',
    epicId: 'epic-4',
    name: 'Mobile API Development',
    description: 'Develop REST API endpoints for mobile app integration',
    tags: ['api-development', 'rest-api', 'mobile-integration', 'api-documentation', 'versioning', 'swagger'],
    status: 'in-progress',
    lastActive: '2025-03-28T09:15:00.000Z',
    assignedEmployeeIds: [],
    type: 'feature',
    priority: 'high'
  }),
  createTaskWithMappedDomains({
    id: 'task-18',
    projectId: 'proj-1',
    epicId: 'epic-4',
    name: 'Push Notification System',
    description: 'Implement push notification service for mobile app',
    tags: ['notifications', 'firebase-fcm', 'push-notifications', 'real-time', 'mobile-integration', 'background-services'],
    status: 'in-progress',
    lastActive: '2025-03-29T11:20:00.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-6', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-19',
    projectId: 'proj-1',
    epicId: 'epic-4',
    name: 'Mobile Analytics Integration',
    description: 'Set up analytics tracking for mobile app usage',
    tags: ['analytics', 'mobile-tracking', 'user-behavior', 'metrics', 'firebase-analytics', 'event-tracking'],
    status: 'planned', 
    lastActive: '2025-03-25T14:30:00.000Z',
    type: 'feature',
    priority: 'medium',
    assignedEmployeeIds: []
  }),
  createTaskWithMappedDomains({
    id: 'task-20',
    projectId: 'proj-1',
    epicId: 'epic-4',
    name: 'Offline Mode Implementation',
    description: 'Develop offline functionality for mobile app',
    tags: ['offline-first', 'data-sync', 'local-storage', 'conflict-resolution', 'mobile-ux', 'service-worker'],
    status: 'planned', 
    lastActive: '2025-03-26T16:45:00.000Z',
    type: 'feature',
    priority: 'medium',
    assignedEmployeeIds: []
  }),
  createTaskWithMappedDomains({
    id: 'task-21',
    projectId: 'proj-1',
    epicId: 'epic-4',
    name: 'Mobile Payment SDK Integration',
    description: 'Integrate mobile payment SDK for in-app purchases',
    tags: ['mobile-payments', 'stripe-sdk', 'apple-pay', 'google-pay', 'payment-security', 'in-app-purchases'],
    status: 'in-progress',
    lastActive: '2025-03-30T10:00:00.000Z',
    type: 'feature',
    priority: 'critical',
    assignedEmployeeIds: ['emp-6', 'emp-4', 'emp-8']
  })
]

const generateEpic4Workloads = (): TaskWorkload[] => {
  const workloads: TaskWorkload[] = []

  // Task 17 (Mobile API Development) - High workload
  const task17Dates = generateDatesBetween(new Date('2025-03-28'), new Date('2025-04-15'))
  task17Dates.forEach(date => {
    const beWorkload = generateDailyWorkload(6, 8) // High workload
    const qaWorkload = generateDailyWorkload(2, 3)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-17', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-17', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-17', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-17', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 18 (Push Notification System) - High workload
  const task18Dates = generateDatesBetween(new Date('2025-04-01'), new Date('2025-04-20'))
  task18Dates.forEach(date => {
    const beWorkload = generateDailyWorkload(5, 7) // High workload
    const qaWorkload = generateDailyWorkload(2, 3)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-18', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-18', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-18', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-18', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 19 & 20 have no workloads as they are unassigned

  // Task 21 (Mobile Payment SDK Integration) - Very high workload due to complexity
  const task21Dates = generateDatesBetween(new Date('2025-04-10'), new Date('2025-05-01'))
  task21Dates.forEach(date => {
    const beWorkload = generateDailyWorkload(7, 8) // Very high workload
    const feWorkload = generateDailyWorkload(4, 6)
    const qaWorkload = generateDailyWorkload(3, 4)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-21', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-21', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-21', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-21', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-21', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-21', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  return workloads
}

export const epic4Workloads = generateEpic4Workloads()

// Calculate total workload cost (assuming $100 per hour rate)
const HOURLY_RATE = 100
const totalWorkloadHours = epic4Workloads.reduce((sum, w) => sum + w.workload, 0)
export const totalWorkloadCost = totalWorkloadHours * HOURLY_RATE // This will exceed the epic's budget of 35000 