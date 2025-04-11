import { Epic, Task, TaskWorkload } from '../types/domain'
import { generateDayParts, generateDailyWorkload, generateDatesBetween } from './workload-utils'

export const epic1: Epic = {
  id: 'epic-1',
  projectId: 'proj-1',
  name: 'Product Page Redesign',
  description: 'Redesign all aspects of the product display pages',
  status: 'in-progress',
  budget: 45000,
  assignedEmployeeIds: ['emp-1']
}

export const epic1Tasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    epicId: 'epic-1',
    name: 'Design Product Cards',
    description: 'Create modern, responsive product card components',
    relatedExpertiseDomains: ['frontend', 'design', 'qa'],
    tags: ['ui', 'responsive', 'components'],
    status: 'in-progress',
    lastActive: '2025-03-28T10:15:22.000Z',
    type: 'feature',
    priority: 'high',
    assignedEmployeeIds: ['emp-1', 'emp-5', 'emp-8']
  },
  {
    id: 'task-6',
    projectId: 'proj-1',
    epicId: 'epic-1',
    name: 'Optimize Image Loading',
    description: 'Implement lazy loading and optimize image assets',
    relatedExpertiseDomains: ['frontend', 'qa'],
    tags: ['performance', 'optimization', 'images'],
    status: 'planned',
    lastActive: '2025-03-25T09:30:15.000Z',
    type: 'refactoring',
    priority: 'medium',
    assignedEmployeeIds: ['emp-1', 'emp-4', 'emp-8']
  },
  {
    id: 'task-9',
    projectId: 'proj-1',
    epicId: 'epic-1',
    name: 'Fix Mobile Navigation Menu',
    description: 'Repair issues with the mobile hamburger menu',
    relatedExpertiseDomains: ['frontend', 'qa'],
    tags: ['bugfix', 'mobile', 'navigation'],
    status: 'in-progress',
    lastActive: '2025-03-28T16:15:00.000Z',
    type: 'bugfix',
    priority: 'high',
    assignedEmployeeIds: ['emp-1', 'emp-4', 'emp-8']
  }
]

const generateEpic1Workloads = (): TaskWorkload[] => {
  const workloads: TaskWorkload[] = []

  // Task 1 (Design Product Cards)
  const task1Dates = generateDatesBetween(new Date('2025-03-28'), new Date('2025-04-20'))
  task1Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(3, 5)
    const uxWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-1', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-1', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-1', workload: uxWorkload[0], userId: 'emp-5', date: morning },
      { taskId: 'task-1', workload: uxWorkload[1], userId: 'emp-5', date: afternoon },
      { taskId: 'task-1', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-1', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 6 (Optimize Image Loading)
  const task6Dates = generateDatesBetween(new Date('2025-04-20'), new Date('2025-04-26'))
  task6Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(2, 4)
    const feWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-6', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-6', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-6', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-6', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-6', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-6', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 9 (Fix Mobile Navigation Menu)
  const task9Dates = generateDatesBetween(new Date('2025-03-28'), new Date('2025-04-02'))
  task9Dates.forEach(date => {
    const uiWorkload = generateDailyWorkload(2, 4)
    const feWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-9', workload: uiWorkload[0], userId: 'emp-1', date: morning },
      { taskId: 'task-9', workload: uiWorkload[1], userId: 'emp-1', date: afternoon },
      { taskId: 'task-9', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-9', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-9', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-9', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  return workloads
}

export const epic1Workloads = generateEpic1Workloads() 