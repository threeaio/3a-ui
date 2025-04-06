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

const generateEpic2Workloads = (): TaskWorkload[] => {
  const workloads: TaskWorkload[] = []

  // Task 2 (Implement Authentication)
  const task2Dates = generateDatesBetween(new Date('2025-04-10'), new Date('2025-04-17'))
  task2Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 5)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-2', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-2', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-2', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-2', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-2', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-2', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 4 (Add Payment Gateway Integration)
  const task4Dates = generateDatesBetween(new Date('2025-04-15'), new Date('2025-04-22'))
  task4Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(3, 5)
    const beWorkload = generateDailyWorkload(3, 5)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-4', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-4', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-4', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-4', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-4', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-4', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 7 (Create User Profile Page)
  const task7Dates = generateDatesBetween(new Date('2025-04-25'), new Date('2025-05-02'))
  task7Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(2, 4)
    const uxWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-7', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-7', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-7', workload: uxWorkload[0], userId: 'emp-5', date: morning },
      { taskId: 'task-7', workload: uxWorkload[1], userId: 'emp-5', date: afternoon },
      { taskId: 'task-7', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-7', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  return workloads
}

export const epic2Workloads = generateEpic2Workloads() 