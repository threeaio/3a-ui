import { Task, TaskWorkload } from '../types/domain'
import { generateDayParts, generateDailyWorkload, generateDatesBetween } from './workload-utils'

export const nonEpicTasks: Task[] = [
  {
    id: 'task-non-epic-13',
    projectId: 'proj-1',
    name: 'Fix CSS in IE11',
    description: 'Address layout issues in legacy browsers',
    relatedExpertiseDomains: ['frontend', 'qa'],
    tags: ['bugfix', 'browser-compatibility', 'css-fixes', 'legacy-support', 'cross-browser', 'ie11'],
    status: 'planned',
    lastActive: '2025-03-24T13:40:10.000Z',
    assignedEmployeeIds: [],
    type: 'bugfix',
    priority: 'low'
  },
  {
    id: 'task-non-epic-14',
    projectId: 'proj-1',
    name: 'Performance Audit',
    description: 'Conduct comprehensive performance review',
    relatedExpertiseDomains: ['frontend', 'backend', 'qa'],
    tags: ['performance', 'web-vitals', 'lighthouse', 'monitoring', 'optimization', 'metrics-analysis'],
    status: 'planned',
    lastActive: '2025-03-26T16:10:05.000Z',
    assignedEmployeeIds: [],
    type: 'maintenance',
    priority: 'medium'
  },
  {
    id: 'task-non-epic-15',
    projectId: 'proj-1',
    name: 'Update Dependencies',
    description: 'Update NPM packages to latest versions',
    relatedExpertiseDomains: ['frontend', 'backend', 'devops', 'qa'],
    tags: ['dependency-update', 'npm', 'security-patches', 'version-management', 'breaking-changes', 'compatibility-testing'],
    status: 'planned',
    lastActive: '2025-03-25T11:32:45.000Z',
    assignedEmployeeIds: [],
    type: 'maintenance',
    priority: 'medium'
  },
  {
    id: 'task-non-epic-16',
    projectId: 'proj-1',
    name: 'Project Management Activities',
    description: 'Track time spent on project management activities including meetings, planning, and coordination',
    relatedExpertiseDomains: ['pm'],
    tags: ['project-management', 'team-coordination', 'sprint-planning', 'agile-ceremonies', 'resource-allocation', 'stakeholder-communication'],
    status: 'in-progress',
    lastActive: '2025-03-29T14:30:00.000Z',
    assignedEmployeeIds: ['emp-7'],
    type: 'maintenance',
    priority: 'medium'
  }
]

const generateNonEpicWorkloads = (): TaskWorkload[] => {
  const workloads: TaskWorkload[] = []

  // Task 13 (Fix CSS in IE11)
  const task13Dates = generateDatesBetween(new Date('2025-05-15'), new Date('2025-05-17'))
  task13Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(1, 3)
    const qaWorkload = generateDailyWorkload(1, 1)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-non-epic-13', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-non-epic-13', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-non-epic-13', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-non-epic-13', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 14 (Performance Audit)
  const task14Dates = generateDatesBetween(new Date('2025-05-20'), new Date('2025-05-24'))
  task14Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(2, 4)
    const beWorkload = generateDailyWorkload(2, 4)
    const qaWorkload = generateDailyWorkload(1, 2)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-non-epic-14', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-non-epic-14', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-non-epic-14', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-non-epic-14', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-non-epic-14', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-non-epic-14', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 15 (Update Dependencies)
  const task15Dates = generateDatesBetween(new Date('2025-06-01'), new Date('2025-06-05'))
  task15Dates.forEach(date => {
    const feWorkload = generateDailyWorkload(1, 2)
    const beWorkload = generateDailyWorkload(1, 2)
    const qaWorkload = generateDailyWorkload(1, 1)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-non-epic-15', workload: feWorkload[0], userId: 'emp-4', date: morning },
      { taskId: 'task-non-epic-15', workload: feWorkload[1], userId: 'emp-4', date: afternoon },
      { taskId: 'task-non-epic-15', workload: beWorkload[0], userId: 'emp-6', date: morning },
      { taskId: 'task-non-epic-15', workload: beWorkload[1], userId: 'emp-6', date: afternoon },
      { taskId: 'task-non-epic-15', workload: qaWorkload[0], userId: 'emp-8', date: morning },
      { taskId: 'task-non-epic-15', workload: qaWorkload[1], userId: 'emp-8', date: afternoon }
    )
  })

  // Task 16 (Project Management Activities)
  const task16Dates = generateDatesBetween(new Date('2025-03-29'), new Date('2025-04-12'))
  task16Dates.forEach(date => {
    const pmWorkload = generateDailyWorkload(2, 4)
    const [morning, afternoon] = generateDayParts(date)

    workloads.push(
      { taskId: 'task-non-epic-16', workload: pmWorkload[0], userId: 'emp-7', date: morning },
      { taskId: 'task-non-epic-16', workload: pmWorkload[1], userId: 'emp-7', date: afternoon }
    )
  })

  return workloads
}

export const nonEpicWorkloads = generateNonEpicWorkloads() 