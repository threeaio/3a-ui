export type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastActive: string
}

export type Project = {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  progress: number
  startDate: string
  endDate: string
  teamSize: number
  budget: number
  tags: string[]
}

export type Task = {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignee: string
  dueDate: string
  projectId: string
  tags: string[]
}

export type MetricData = {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
}

export type ChartData = {
  name: string
  value: number
}

export const users: User[] = [
  {
    id: 'u1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2025-03-21T09:30:00',
  },
  {
    id: 'u2',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    role: 'Manager',
    status: 'active',
    lastActive: '2025-03-23T14:45:00',
  },
  {
    id: 'u3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Developer',
    status: 'inactive',
    lastActive: '2025-03-10T11:20:00',
  },
  {
    id: 'u4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Designer',
    status: 'active',
    lastActive: '2025-03-22T16:15:00',
  },
  {
    id: 'u5',
    name: 'David Thompson',
    email: 'david@example.com',
    role: 'Developer',
    status: 'pending',
    lastActive: '2025-03-20T13:10:00',
  },
]

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with new branding',
    status: 'in-progress',
    priority: 'high',
    progress: 65,
    startDate: '2025-01-15',
    endDate: '2025-04-30',
    teamSize: 8,
    budget: 120000,
    tags: ['design', 'frontend', 'marketing'],
  },
  {
    id: 'p2',
    name: 'Mobile App Development',
    description: 'Creating a new mobile app for customer engagement',
    status: 'planning',
    priority: 'critical',
    progress: 15,
    startDate: '2025-03-01',
    endDate: '2025-07-31',
    teamSize: 12,
    budget: 250000,
    tags: ['mobile', 'frontend', 'backend'],
  },
  {
    id: 'p3',
    name: 'Analytics Dashboard',
    description: 'Building an internal analytics dashboard for data visualization',
    status: 'in-progress',
    priority: 'medium',
    progress: 40,
    startDate: '2025-02-10',
    endDate: '2025-05-15',
    teamSize: 5,
    budget: 85000,
    tags: ['data', 'frontend', 'analytics'],
  },
  {
    id: 'p4',
    name: 'API Integration',
    description: 'Integrating with third-party payment and shipping APIs',
    status: 'completed',
    priority: 'high',
    progress: 100,
    startDate: '2025-01-05',
    endDate: '2025-02-28',
    teamSize: 4,
    budget: 60000,
    tags: ['backend', 'api', 'security'],
  },
  {
    id: 'p5',
    name: 'Content Management System',
    description: 'Developing a custom CMS for the marketing team',
    status: 'in-progress',
    priority: 'medium',
    progress: 50,
    startDate: '2025-02-01',
    endDate: '2025-06-15',
    teamSize: 6,
    budget: 90000,
    tags: ['backend', 'content', 'admin'],
  },
]

export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Design homepage mockup',
    description: 'Create visual mockups for the new homepage design',
    status: 'done',
    priority: 'high',
    assignee: 'u4',
    dueDate: '2025-03-10',
    projectId: 'p1',
    tags: ['design', 'homepage'],
  },
  {
    id: 't2',
    title: 'Implement user authentication',
    description: 'Add secure login and registration functionality',
    status: 'in-progress',
    priority: 'critical',
    assignee: 'u3',
    dueDate: '2025-03-25',
    projectId: 'p2',
    tags: ['security', 'backend'],
  },
  {
    id: 't3',
    title: 'Create data visualization components',
    description: 'Develop reusable chart and graph components',
    status: 'todo',
    priority: 'medium',
    assignee: 'u5',
    dueDate: '2025-04-05',
    projectId: 'p3',
    tags: ['frontend', 'data'],
  },
  {
    id: 't4',
    title: 'Set up CI/CD pipeline',
    description: 'Configure automated testing and deployment process',
    status: 'review',
    priority: 'high',
    assignee: 'u2',
    dueDate: '2025-03-30',
    projectId: 'p1',
    tags: ['devops', 'automation'],
  },
  {
    id: 't5',
    title: 'Write API documentation',
    description: 'Document all API endpoints and usage examples',
    status: 'todo',
    priority: 'low',
    assignee: 'u3',
    dueDate: '2025-04-15',
    projectId: 'p4',
    tags: ['documentation', 'api'],
  },
  {
    id: 't6',
    title: 'Optimize database queries',
    description: 'Improve performance of slow database operations',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'u1',
    dueDate: '2025-04-10',
    projectId: 'p5',
    tags: ['database', 'performance'],
  },
  {
    id: 't7',
    title: 'Design mobile UI components',
    description: 'Create UI kit for the mobile application',
    status: 'in-progress',
    priority: 'high',
    assignee: 'u4',
    dueDate: '2025-04-08',
    projectId: 'p2',
    tags: ['design', 'mobile'],
  },
  {
    id: 't8',
    title: 'Implement payment gateway',
    description: 'Integrate with Stripe for payment processing',
    status: 'todo',
    priority: 'critical',
    assignee: 'u5',
    dueDate: '2025-04-20',
    projectId: 'p2',
    tags: ['payments', 'api'],
  },
  {
    id: 't9',
    title: 'User acceptance testing',
    description: 'Coordinate UAT with key stakeholders',
    status: 'todo',
    priority: 'high',
    assignee: 'u2',
    dueDate: '2025-04-25',
    projectId: 'p1',
    tags: ['testing', 'uat'],
  },
  {
    id: 't10',
    title: 'Content migration',
    description: 'Transfer existing content to the new CMS',
    status: 'todo',
    priority: 'medium',
    assignee: 'u1',
    dueDate: '2025-05-05',
    projectId: 'p5',
    tags: ['content', 'data'],
  },
]

export const metrics: MetricData[] = [
  { name: 'Active Projects', value: 10, change: 2, trend: 'up' },
  { name: 'Completed Tasks', value: 87, change: 12, trend: 'up' },
  { name: 'Team Velocity', value: 34, change: -3, trend: 'down' },
  { name: 'Budget Utilization', value: 72, change: 5, trend: 'up' },
]

export const projectStatusChart: ChartData[] = [
  { name: 'Planning', value: 3 },
  { name: 'In Progress', value: 5 },
  { name: 'Completed', value: 2 },
  { name: 'Cancelled', value: 1 },
]

export const taskPriorityChart: ChartData[] = [
  { name: 'Low', value: 12 },
  { name: 'Medium', value: 24 },
  { name: 'High', value: 18 },
  { name: 'Critical', value: 8 },
]

export const taskStatusChart: ChartData[] = [
  { name: 'To Do', value: 20 },
  { name: 'In Progress', value: 15 },
  { name: 'Review', value: 8 },
  { name: 'Done', value: 32 },
]

export const projectProgressData = [
  { name: 'Website Redesign', progress: 65 },
  { name: 'Mobile App', progress: 15 },
  { name: 'Analytics Dashboard', progress: 40 },
  { name: 'API Integration', progress: 100 },
  { name: 'CMS', progress: 50 },
]

export const userStatuses = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
]

export const projectStatuses = [
  { value: 'planning', label: 'Planning' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

export const taskStatuses = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
]

export const priorityLevels = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

export const timeRanges = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'quarter', label: 'This Quarter' },
  { value: 'year', label: 'This Year' },
]

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id)
}

export const getAssigneeName = (id: string): string => {
  const user = getUserById(id)
  return user ? user.name : 'Unassigned'
}

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getProjectName = (id: string): string => {
  const project = getProjectById(id)
  return project ? project.name : 'Unknown Project'
} 