import { BadgeSelectOption } from "@3a.solutions/ui/badge-select"

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
    description: 'Complete overhaul of the company website with new branding and improved user experience',
    status: 'in-progress',
    priority: 'high',
    progress: 65,
    startDate: '2025-01-15',
    endDate: '2025-04-30',
    teamSize: 8,
    budget: 120000,
    tags: ['design', 'frontend', 'marketing', 'responsive'],
  },
  {
    id: 'p2',
    name: 'Mobile App Development',
    description: 'Creating a new mobile app for customer engagement with real-time notifications and analytics',
    status: 'planning',
    priority: 'critical',
    progress: 15,
    startDate: '2025-03-01',
    endDate: '2025-07-31',
    teamSize: 12,
    budget: 250000,
    tags: ['mobile', 'frontend', 'backend', 'react-native', 'push-notifications'],
  },
  {
    id: 'p3',
    name: 'Analytics Dashboard',
    description: 'Building an internal analytics dashboard for data visualization with interactive charts and filters',
    status: 'in-progress',
    priority: 'medium',
    progress: 40,
    startDate: '2025-02-10',
    endDate: '2025-05-15',
    teamSize: 5,
    budget: 85000,
    tags: ['data', 'frontend', 'analytics', 'visualization', 'dashboards'],
  },
  {
    id: 'p4',
    name: 'API Integration',
    description: 'Integrating with third-party payment and shipping APIs to streamline checkout process',
    status: 'completed',
    priority: 'high',
    progress: 100,
    startDate: '2025-01-05',
    endDate: '2025-02-28',
    teamSize: 4,
    budget: 60000,
    tags: ['backend', 'api', 'security', 'payments', 'shipping'],
  },
  {
    id: 'p5',
    name: 'Content Management System',
    description: 'Developing a custom CMS for the marketing team with workflow approvals and content scheduling',
    status: 'in-progress',
    priority: 'medium',
    progress: 50,
    startDate: '2025-02-01',
    endDate: '2025-06-15',
    teamSize: 6,
    budget: 90000,
    tags: ['backend', 'content', 'admin', 'workflow', 'scheduling'],
  },
  {
    id: 'p6',
    name: 'Enterprise Resource Planning',
    description: 'Implementing a company-wide ERP system to integrate financial, HR, and supply chain operations',
    status: 'planning',
    priority: 'critical',
    progress: 10,
    startDate: '2025-04-01',
    endDate: '2025-12-31',
    teamSize: 15,
    budget: 500000,
    tags: ['erp', 'integration', 'finance', 'hr', 'supply-chain'],
  },
  {
    id: 'p7',
    name: 'Customer Support Portal',
    description: 'Building a self-service customer support portal with knowledge base and ticket management',
    status: 'in-progress',
    priority: 'high',
    progress: 75,
    startDate: '2024-12-10',
    endDate: '2025-04-15',
    teamSize: 7,
    budget: 110000,
    tags: ['customer-service', 'frontend', 'knowledge-base', 'ticketing'],
  },
  {
    id: 'p8',
    name: 'DevOps Infrastructure Upgrade',
    description: 'Modernizing our CI/CD pipeline and migrating to a containerized infrastructure',
    status: 'in-progress',
    priority: 'medium',
    progress: 60,
    startDate: '2025-01-20',
    endDate: '2025-05-31',
    teamSize: 3,
    budget: 95000,
    tags: ['devops', 'infrastructure', 'containers', 'ci-cd', 'kubernetes'],
  },
  {
    id: 'p9',
    name: 'Machine Learning Recommendation Engine',
    description: 'Developing an ML-based recommendation system for our e-commerce platform',
    status: 'planning',
    priority: 'medium',
    progress: 5,
    startDate: '2025-05-01',
    endDate: '2025-09-30',
    teamSize: 4,
    budget: 130000,
    tags: ['machine-learning', 'recommendations', 'data-science', 'e-commerce'],
  },
  {
    id: 'p10',
    name: 'Legacy System Migration',
    description: 'Migrating data and functionality from legacy systems to our new cloud-based platform',
    status: 'cancelled',
    priority: 'low',
    progress: 20,
    startDate: '2024-11-15',
    endDate: '2025-03-31',
    teamSize: 8,
    budget: 170000,
    tags: ['migration', 'legacy', 'cloud', 'data-migration'],
  },
  {
    id: 'p11',
    name: 'Security Compliance Audit',
    description: 'Conducting a comprehensive security audit and implementing required improvements for ISO 27001',
    status: 'completed',
    priority: 'critical',
    progress: 100,
    startDate: '2025-01-10',
    endDate: '2025-03-15',
    teamSize: 2,
    budget: 45000,
    tags: ['security', 'compliance', 'audit', 'iso-27001'],
  },
  {
    id: 'p12',
    name: 'Customer Feedback Analytics',
    description: 'Building a platform to collect, analyze, and visualize customer feedback from multiple channels',
    status: 'in-progress',
    priority: 'high',
    progress: 35,
    startDate: '2025-02-15',
    endDate: '2025-06-30',
    teamSize: 5,
    budget: 80000,
    tags: ['analytics', 'customer-feedback', 'sentiment-analysis', 'reporting'],
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
  { name: 'Active Projects', value: 12, change: 3, trend: 'up' },
  { name: 'Completed Tasks', value: 87, change: 12, trend: 'up' },
  { name: 'Team Velocity', value: 34, change: -3, trend: 'down' },
  { name: 'Budget Utilization', value: 72, change: 5, trend: 'up' },
]

export const projectStatusChart: ChartData[] = [
  { name: 'Planning', value: 3 },
  { name: 'In Progress', value: 7 },
  { name: 'Completed', value: 2 },
  { name: 'Cancelled', value: 1 },
]

export const taskPriorityChart: ChartData[] = [
  { name: 'Low', value: 14 },
  { name: 'Medium', value: 28 },
  { name: 'High', value: 22 },
  { name: 'Critical', value: 10 },
]

export const taskStatusChart: ChartData[] = [
  { name: 'To Do', value: 23 },
  { name: 'In Progress', value: 18 },
  { name: 'Review', value: 12 },
  { name: 'Done', value: 38 },
]

export const projectProgressData = [
  { name: 'Website Redesign', progress: 65 },
  { name: 'Mobile App', progress: 15 },
  { name: 'Analytics Dashboard', progress: 40 },
  { name: 'API Integration', progress: 100 },
  { name: 'CMS', progress: 50 },
  { name: 'ERP System', progress: 10 },
  { name: 'Support Portal', progress: 75 },
  { name: 'DevOps Upgrade', progress: 60 },
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

export const priorityLevels: BadgeSelectOption[] = [
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