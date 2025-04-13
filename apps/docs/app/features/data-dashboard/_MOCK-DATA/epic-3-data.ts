import { Epic, Task, TaskWorkload } from '../types/domain'
import { generateDayParts, generateDailyWorkload, generateDatesBetween } from './workload-utils'
import { getDomainsFromTags } from './tag-to-domain-mapping'

export const epic3: Epic = {
  id: 'epic-3',
  projectId: 'proj-1',
  name: 'Checkout Experience',
  description: 'Streamline and enhance the complete checkout process',
  status: 'in-progress',
  budget: 65000,
  assignedEmployeeIds: ['emp-6']
}

// Helper function to create a task with mapped domains
const createTaskWithMappedDomains = (task: Omit<Task, 'relatedExpertiseDomains'> & { tags: string[] }): Task => ({
  ...task,
  relatedExpertiseDomains: getDomainsFromTags(task.tags)
})

export const epic3Tasks: Task[] = [
  createTaskWithMappedDomains({
    id: 'task-5',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Implement Product Filtering',
    description: 'Add advanced filtering options for product listings',
    tags: ['search', 'filtering', 'query-params', 'state-management', 'url-sync', 'performance-optimization'],
    status: 'in-progress',
    lastActive: '2025-03-27T15:10:22.000Z',
    type: 'feature',
    priority: 'medium',
    assignedEmployeeIds: ['emp-4', 'emp-6', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-8',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Implement Order Tracking',
    description: 'Create order history and tracking functionality',
    tags: ['order-management', 'real-time-updates', 'notifications', 'data-visualization', 'user-dashboard'],
    status: 'planned',
    lastActive: '2025-03-24T11:45:22.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-4', 'emp-6', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-10',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Implement Cart Persistence',
    description: 'Save shopping cart items across sessions',
    tags: ['cart', 'local-storage', 'session-management', 'data-sync', 'state-persistence', 'offline-support'],
    status: 'completed',
    lastActive: '2025-03-20T11:30:45.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-4', 'emp-6', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-11',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Create Checkout Summary Component',
    description: 'Design and implement the checkout summary sidebar',
    tags: ['ui-component', 'checkout-flow', 'responsive-design', 'real-time-updates', 'price-calculation', 'shadcn-ui'],
    status: 'in-progress',
    lastActive: '2025-03-29T10:15:00.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-1', 'emp-5', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-12',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Add Address Validation',
    description: 'Integrate address validation service for shipping info',
    tags: ['validation', 'address-verification', 'form-handling', 'api-integration', 'error-handling', 'user-feedback'],
    status: 'planned',
    lastActive: '2025-03-26T09:25:30.000Z',
    type: 'feature',
    priority: 'medium',
    assignedEmployeeIds: ['emp-4', 'emp-6', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-13',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Fix Cart Total Calculation',
    description: 'Fix incorrect total calculation when multiple discounts are applied',
    tags: ['bugfix', 'price-calculation', 'discount-handling', 'unit-testing', 'edge-cases', 'regression-testing'],
    status: 'in-progress',
    lastActive: '2025-03-28T14:30:00.000Z',
    type: 'bugfix',
    priority: 'critical',
    assignedEmployeeIds: ['emp-4', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-14',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Address Form Validation Issue',
    description: 'Fix validation error preventing valid international addresses from being submitted',
    tags: ['bugfix', 'form-validation', 'internationalization', 'user-experience', 'error-handling', 'accessibility'],
    status: 'planned',
    lastActive: '2025-03-27T16:45:00.000Z',
    type: 'bugfix',
    priority: 'high',
    assignedEmployeeIds: ['emp-4', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-15',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Fix Payment Processing Timeout',
    description: 'Resolve timeout issues during payment processing on slow connections',
    tags: ['bugfix', 'payment-processing', 'error-handling', 'timeout-handling', 'network-resilience', 'user-feedback'],
    status: 'planned',
    lastActive: '2025-03-26T11:20:00.000Z',
    type: 'bugfix',
    priority: 'critical',
    assignedEmployeeIds: ['emp-6', 'emp-8']
  }),
  createTaskWithMappedDomains({
    id: 'task-16',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Fix Order Confirmation Email',
    description: 'Fix missing order details in confirmation emails',
    tags: ['bugfix', 'email-templates', 'order-processing', 'transactional-email', 'data-validation', 'customer-communication'],
    status: 'in-progress',
    lastActive: '2025-03-25T09:15:00.000Z',
    type: 'bugfix',
    priority: 'high',
    assignedEmployeeIds: ['emp-6', 'emp-8']
  })
]

const generateEpic3Workloads = (): TaskWorkload[] => {
  const workloads: TaskWorkload[] = []

  // Task 5 (Implement Product Filtering)
  const task5Dates = generateDatesBetween(new Date('2025-03-27'), new Date('2025-04-03'))
  task5Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 6)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-5', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-5', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-5', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-5', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-5', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-5', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 8 (Implement Order Tracking)
  const task8Dates = generateDatesBetween(new Date('2025-05-02'), new Date('2025-05-09'))
  task8Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 5)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-8', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-8', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-8', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-8', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-8', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-8', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 10 (Implement Cart Persistence)
  const task10Dates = generateDatesBetween(new Date('2025-03-20'), new Date('2025-03-27'))
  task10Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 5)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-10', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-10', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-10', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-10', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-10', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-10', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 11 (Create Checkout Summary Component)
  const task11Dates = generateDatesBetween(new Date('2025-03-29'), new Date('2025-04-05'))
  task11Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(3, 5)
    const uxWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-11', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-11', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-11', workload: uxWorkload[0], userId: 'emp-5', date: morning },
      { taskId: 'task-11', workload: uxWorkload[1], userId: 'emp-5', date: afternoon },
      { taskId: 'task-11', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-11', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 12 (Add Address Validation)
  const task12Dates = generateDatesBetween(new Date('2025-05-01'), new Date('2025-05-07'))
  task12Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(2, 4)
    const beWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-12', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-12', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-12', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-12', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-12', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-12', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 13 (Fix Cart Total Calculation)
  const task13Dates = generateDatesBetween(new Date('2025-03-28'), new Date('2025-03-30'))
  task13Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-13', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-13', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-13', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-13', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 14 (Address Form Validation Issue)
  const task14Dates = generateDatesBetween(new Date('2025-03-27'), new Date('2025-03-29'))
  task14Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-14', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-14', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-14', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-14', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 15 (Fix Payment Processing Timeout)
  const task15Dates = generateDatesBetween(new Date('2025-03-26'), new Date('2025-03-28'))
  task15Dates.forEach(date => {
    const beWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-15', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-15', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-15', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-15', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 16 (Fix Order Confirmation Email)
  const task16Dates = generateDatesBetween(new Date('2025-03-25'), new Date('2025-03-27'))
  task16Dates.forEach(date => {
    const beWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-16', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-16', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-16', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-16', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  return workloads
}

export const epic3Workloads = generateEpic3Workloads() 