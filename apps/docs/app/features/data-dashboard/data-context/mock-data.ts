import { BadgeSelectOption } from "@3a.solutions/ui/badge-select"
import {
  User,
  Project,
  Task,
  Risk,
  Milestone,
  ProjectMetric,
  TimelineEvent,
  ChartData,
  TimeSeriesData
} from "../types"

export const users: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Project Manager',
    status: 'active',
    lastActive: '2025-03-21T09:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'u2',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    role: 'Product Owner',
    status: 'active',
    lastActive: '2025-03-23T14:45:00',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'u3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Senior Developer',
    status: 'active',
    lastActive: '2025-03-22T11:20:00',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 'u4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'UX Designer',
    status: 'active',
    lastActive: '2025-03-22T16:15:00',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 'u5',
    name: 'David Thompson',
    email: 'david@example.com',
    role: 'Developer',
    status: 'active',
    lastActive: '2025-03-20T13:10:00',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 'u6',
    name: 'Lisa Rodriguez',
    email: 'lisa@example.com',
    role: 'QA Engineer',
    status: 'active',
    lastActive: '2025-03-23T10:45:00',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 'u7',
    name: 'Robert Garcia',
    email: 'robert@example.com',
    role: 'DevOps Engineer',
    status: 'active',
    lastActive: '2025-03-21T15:30:00',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
]

export const currentProject: Project = {
  id: 'p3',
  name: 'Analytics Dashboard',
  description: 'Building an internal analytics dashboard for data visualization with interactive charts and filters',
  status: 'in-progress',
  priority: 'high',
  progress: 62,
  startDate: '2025-02-10',
  endDate: '2025-05-15',
  teamSize: 7,
  budget: 85000,
  currentSpend: 52700,
  tags: ['data', 'frontend', 'analytics', 'visualization', 'dashboards'],
  teamMembers: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7'],
}

export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Define dashboard requirements',
    description: 'Gather requirements from stakeholders and document dashboard specifications',
    status: 'done',
    priority: 'high',
    assignee: 'u2',
    dueDate: '2025-02-20',
    completedDate: '2025-02-18',
    projectId: 'p3',
    tags: ['planning', 'requirements'],
    estimatedHours: 16,
    actualHours: 14,
  },
  {
    id: 't2',
    title: 'Design dashboard wireframes',
    description: 'Create low-fidelity wireframes for dashboard layout and components',
    status: 'done',
    priority: 'high',
    assignee: 'u4',
    dueDate: '2025-03-01',
    completedDate: '2025-03-02',
    projectId: 'p3',
    tags: ['design', 'ui'],
    estimatedHours: 24,
    actualHours: 28,
  },
  {
    id: 't3',
    title: 'Create data visualization components',
    description: 'Develop reusable chart and graph components for dashboard',
    status: 'in-progress',
    priority: 'high',
    assignee: 'u3',
    dueDate: '2025-03-20',
    projectId: 'p3',
    tags: ['frontend', 'data', 'components'],
    estimatedHours: 40,
    actualHours: 25,
  },
  {
    id: 't4',
    title: 'Implement data fetching layer',
    description: 'Create services for fetching data from APIs and implement caching',
    status: 'in-progress',
    priority: 'critical',
    assignee: 'u5',
    dueDate: '2025-03-25',
    projectId: 'p3',
    tags: ['backend', 'api', 'data'],
    estimatedHours: 32,
    actualHours: 20,
  },
  {
    id: 't5',
    title: 'Create filtering component',
    description: 'Implement filters and search functionality for dashboard',
    status: 'todo',
    priority: 'medium',
    assignee: 'u3',
    dueDate: '2025-04-05',
    projectId: 'p3',
    tags: ['frontend', 'filters', 'search'],
    estimatedHours: 24,
    actualHours: 0,
  },
  {
    id: 't6',
    title: 'Setup automated testing',
    description: 'Implement unit and integration tests for dashboard components',
    status: 'todo',
    priority: 'medium',
    assignee: 'u6',
    dueDate: '2025-04-10',
    projectId: 'p3',
    tags: ['testing', 'automation'],
    estimatedHours: 24,
    actualHours: 0,
  },
  {
    id: 't7',
    title: 'Dashboard performance optimization',
    description: 'Improve rendering performance and optimize data loading',
    status: 'todo',
    priority: 'medium',
    assignee: 'u5',
    dueDate: '2025-04-20',
    projectId: 'p3',
    tags: ['performance', 'optimization'],
    estimatedHours: 20,
    actualHours: 0,
  },
  {
    id: 't8',
    title: 'Implement export functionality',
    description: 'Add ability to export dashboard data to CSV/PDF formats',
    status: 'todo',
    priority: 'low',
    assignee: 'u3',
    dueDate: '2025-04-25',
    projectId: 'p3',
    tags: ['export', 'feature'],
    estimatedHours: 16,
    actualHours: 0,
  },
  {
    id: 't9',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated deployment for dashboard application',
    status: 'in-progress',
    priority: 'high',
    assignee: 'u7',
    dueDate: '2025-03-30',
    projectId: 'p3',
    tags: ['devops', 'deployment', 'automation'],
    estimatedHours: 16,
    actualHours: 10,
  },
  {
    id: 't10',
    title: 'User acceptance testing',
    description: 'Facilitate UAT sessions with stakeholders',
    status: 'todo',
    priority: 'high',
    assignee: 'u2',
    dueDate: '2025-05-05',
    projectId: 'p3',
    tags: ['testing', 'uat'],
    estimatedHours: 24,
    actualHours: 0,
  },
]

export const risks: Risk[] = [
  {
    id: 'r1',
    title: 'Data API availability issues',
    description: 'The third-party data API we depend on has had reliability issues',
    severity: 'high',
    status: 'mitigating',
    projectId: 'p3',
    assignee: 'u5',
    identifiedDate: '2025-02-25',
  },
  {
    id: 'r2',
    title: 'Performance with large datasets',
    description: 'Dashboard performance may degrade with very large datasets',
    severity: 'medium',
    status: 'identified',
    projectId: 'p3',
    assignee: 'u3',
    identifiedDate: '2025-03-10',
  },
  {
    id: 'r3',
    title: 'UI designer resource constraint',
    description: 'Limited availability of UI designer may impact timelines',
    severity: 'medium',
    status: 'resolved',
    projectId: 'p3',
    assignee: 'u1',
    identifiedDate: '2025-02-15',
    resolvedDate: '2025-03-05',
  },
  {
    id: 'r4',
    title: 'Browser compatibility issues',
    description: 'Some visualization libraries may not work in older browsers',
    severity: 'low',
    status: 'identified',
    projectId: 'p3',
    assignee: 'u6',
    identifiedDate: '2025-03-15',
  },
]

export const milestones: Milestone[] = [
  {
    id: 'm1',
    title: 'Project Kickoff',
    description: 'Official start of the project with stakeholder alignment',
    dueDate: '2025-02-10',
    projectId: 'p3',
    status: 'completed',
    completedDate: '2025-02-10',
  },
  {
    id: 'm2',
    title: 'Requirements & Design Completion',
    description: 'Finalization of all requirements and design specifications',
    dueDate: '2025-03-05',
    projectId: 'p3',
    status: 'completed',
    completedDate: '2025-03-05',
  },
  {
    id: 'm3',
    title: 'Core Functionality Implementation',
    description: 'Completion of all core dashboard visualization features',
    dueDate: '2025-04-10',
    projectId: 'p3',
    status: 'in-progress',
  },
  {
    id: 'm4',
    title: 'User Acceptance Testing',
    description: 'Completion of UAT with stakeholder sign-off',
    dueDate: '2025-05-05',
    projectId: 'p3',
    status: 'upcoming',
  },
  {
    id: 'm5',
    title: 'Production Deployment',
    description: 'Full deployment to production environment',
    dueDate: '2025-05-15',
    projectId: 'p3',
    status: 'upcoming',
  },
]

export const projectMetrics: ProjectMetric[] = [
  { name: 'Completion Progress', value: 62, change: 4, trend: 'up', suffix: '%' },
  { name: 'Tasks Completed', value: 2, change: 1, trend: 'up' },
  { name: 'Budget Utilization', value: 62, change: 5, trend: 'up', suffix: '%' },
  // { name: 'Team Velocity', value: 16, change: -2, trend: 'down' },
  { name: 'Remaining Days', value: 49, change: -7, trend: 'down' },
  // { name: 'Active Risks', value: 3, change: 1, trend: 'up' },
]

export const taskStatusChart: ChartData[] = [
  { name: 'To Do', value: 4 },
  { name: 'In Progress', value: 3 },
  { name: 'Review', value: 0 },
  { name: 'Done', value: 3 },
]

export const riskSeverityChart: ChartData[] = [
  { name: 'Low', value: 1 },
  { name: 'Medium', value: 2 },
  { name: 'High', value: 1 },
  { name: 'Critical', value: 0 },
]

export const teamMemberTasksChart = [
  { name: 'John Smith', tasks: 0 },
  { name: 'Emily Johnson', tasks: 2 },
  { name: 'Michael Brown', tasks: 3 },
  { name: 'Sarah Wilson', tasks: 1 },
  { name: 'David Thompson', tasks: 2 },
  { name: 'Lisa Rodriguez', tasks: 1 },
  { name: 'Robert Garcia', tasks: 1 },
]

export const burndownData: TimeSeriesData[] = [
  { date: '2025-02-10', value: 200 },
  { date: '2025-02-17', value: 187 },
  { date: '2025-02-24', value: 170 },
  { date: '2025-03-03', value: 155 },
  { date: '2025-03-10', value: 140 },
  { date: '2025-03-17', value: 125 },
  { date: '2025-03-24', value: 112 },
  // Projected
  { date: '2025-03-31', value: 95 },
  { date: '2025-04-07', value: 75 },
  { date: '2025-04-14', value: 55 },
  { date: '2025-04-21', value: 35 },
  { date: '2025-04-28', value: 20 },
  { date: '2025-05-05', value: 10 },
  { date: '2025-05-12', value: 0 },
]

export const budgetData: TimeSeriesData[] = [
  { date: '2025-02-10', value: 8500 },
  { date: '2025-02-17', value: 15600 },
  { date: '2025-02-24', value: 22400 },
  { date: '2025-03-03', value: 31700 },
  { date: '2025-03-10', value: 39200 },
  { date: '2025-03-17', value: 45800 },
  { date: '2025-03-24', value: 52700 },
  // Projected
  { date: '2025-03-31', value: 58500 },
  { date: '2025-04-07', value: 64200 },
  { date: '2025-04-14', value: 69800 },
  { date: '2025-04-21', value: 75400 },
  { date: '2025-04-28', value: 79900 },
  { date: '2025-05-05', value: 83200 },
  { date: '2025-05-12', value: 85000 },
]

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'te1',
    title: 'Project Kickoff',
    description: 'Project officially started with stakeholder meeting',
    date: '2025-02-10',
    type: 'milestone',
    projectId: 'p3',
    relatedId: 'm1',
  },
  {
    id: 'te2',
    title: 'Requirements & Design Completion',
    description: 'All requirements and design specifications finalized',
    date: '2025-03-05',
    type: 'milestone',
    projectId: 'p3',
    relatedId: 'm2',
  },
  {
    id: 'te3',
    title: 'Data API availability issues identified',
    description: 'Risk identified regarding third-party data API reliability',
    date: '2025-02-25',
    type: 'risk',
    projectId: 'p3',
    relatedId: 'r1',
  },
  {
    id: 'te4',
    title: 'Define dashboard requirements completed',
    description: 'Requirements gathering finalized ahead of schedule',
    date: '2025-02-18',
    type: 'task',
    projectId: 'p3',
    relatedId: 't1',
  },
  {
    id: 'te5',
    title: 'Design dashboard wireframes completed',
    description: 'UI wireframes finalized with stakeholder approval',
    date: '2025-03-02',
    type: 'task',
    projectId: 'p3',
    relatedId: 't2',
  },
  {
    id: 'te6',
    title: 'Team status update',
    description: 'Weekly status meeting - on track with minor resource concerns',
    date: '2025-03-10',
    type: 'update',
    projectId: 'p3',
  },
  {
    id: 'te7',
    title: 'UI designer resource constraint resolved',
    description: 'Additional UI design resources allocated to project',
    date: '2025-03-05',
    type: 'risk',
    projectId: 'p3',
    relatedId: 'r3',
  },
]

export const priorityLevels: BadgeSelectOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

export const taskStatusOptions: BadgeSelectOption[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
]

export const riskStatusOptions: BadgeSelectOption[] = [
  { value: 'identified', label: 'Identified' },
  { value: 'mitigating', label: 'Mitigating' },
  { value: 'resolved', label: 'Resolved' },
]

export const milestoneStatusOptions: BadgeSelectOption[] = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'delayed', label: 'Delayed' },
]

export const timeRanges = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'project', label: 'Entire Project' },
]

// Helper functions
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id)
}

export const getAssigneeName = (id: string): string => {
  const user = getUserById(id)
  return user ? user.name : 'Unassigned'
}

export const getTasksByStatus = (status: string): Task[] => {
  return tasks.filter(task => task.status === status)
}

export const getTasksByAssignee = (assigneeId: string): Task[] => {
  return tasks.filter(task => task.assignee === assigneeId)
}

export const getRisksByStatus = (status: string): Risk[] => {
  return risks.filter(risk => risk.status === status)
}

export const getMilestonesByStatus = (status: string): Milestone[] => {
  return milestones.filter(milestone => milestone.status === status)
}

export const getActiveTeamMembers = (): User[] => {
  return users.filter(user => currentProject.teamMembers.includes(user.id))
} 