import { 
  Project, 
  ProjectMilestone, 
  EmployeeInProject, 
  Epic, 
  Task, 
  TaskWorkload
} from '../types/domain'
import { mockTaskWorkloads } from './project-1-workloads'

// Mock Projects
export const mockProject: Project = 
  {
    id: 'proj-1',
    name: 'E-commerce Platform Redesign',
    description: 'Redesigning the UI and improving UX of the client\'s e-commerce platform',
    status: 'in-progress',
    lastActive: '2025-03-29T16:42:10.123Z',
    budget: 150000
  }


// Mock ProjectMilestones
export const mockProjectMilestones: ProjectMilestone[] = [
  {
    id: 'milestone-0',
    projectId: 'proj-1',
    name: 'Project Kickoff',
    dueDate: '2024-12-15T00:00:00.000Z',
    type: 'ProjectStart',
    status: 'completed'
  },
  {
    id: 'milestone-1',
    projectId: 'proj-1',
    name: 'Design Phase Completion',
    description: 'Finalize all design assets and prototypes',
    dueDate: '2025-04-15T00:00:00.000Z',
    status: 'upcoming'
  },
  {
    id: 'milestone-2',
    projectId: 'proj-1',
    name: 'MVP Release',
    description: 'Minimum viable product release to selected customers',
    dueDate: '2025-05-30T00:00:00.000Z',
    status: 'upcoming'
  },
  {
    id: 'milestone-3',
    projectId: 'proj-1',
    name: 'Penetration Testing',
    description: 'Security testing to identify vulnerabilities before launch',
    dueDate: '2025-06-15T00:00:00.000Z',
    status: 'upcoming'
  },
  {
    id: 'milestone-4',
    projectId: 'proj-1',
    name: 'Go Live',
    description: 'Official launch of the redesigned platform',
    dueDate: '2025-07-01T00:00:00.000Z',
    status: 'upcoming'
  },
  {
    id: 'milestone-5',
    projectId: 'proj-1',
    name: 'Project Completion',
    dueDate: '2025-07-15T00:00:00.000Z',
    type: 'ProjectEnd',
    status: 'upcoming'
  }
]

// Mock EmployeesInProject
export const mockEmployeesInProject: EmployeeInProject[] = [
  {
    employeeId: 'emp-1',
    projectId: 'proj-1',
    role: 'UI Designer',
    expertiseDomainInProject: ['design', 'ux'],
    startDate: '2025-01-10T00:00:00.000Z',
    endDate: '2025-06-30T00:00:00.000Z'
  },
  {
    employeeId: 'emp-4',
    projectId: 'proj-1',
    role: 'Frontend Developer',
    expertiseDomainInProject: ['frontend'],
    startDate: '2025-01-15T00:00:00.000Z',
    endDate: '2025-06-30T00:00:00.000Z'
  },
  {
    employeeId: 'emp-6',
    projectId: 'proj-1',
    role: 'Backend Developer',
    expertiseDomainInProject: ['backend', 'devops'],
    startDate: '2025-01-15T00:00:00.000Z',
    endDate: '2025-06-30T00:00:00.000Z'
  },
  {
    employeeId: 'emp-5',
    projectId: 'proj-1',
    role: 'UX Designer',
    expertiseDomainInProject: ['ux'],
    startDate: '2025-01-05T00:00:00.000Z',
    endDate: '2025-06-30T00:00:00.000Z'
  },
  {
    employeeId: 'emp-7',
    projectId: 'proj-1',
    role: 'Product Owner',
    expertiseDomainInProject: ['pm'],
    startDate: '2025-01-01T00:00:00.000Z',
    endDate: '2025-07-15T00:00:00.000Z'
  }
]

// Mock Tasks
export const mockTasks: Task[] = [
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
    priority: 'high'
  },
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
    priority: 'high'
  },
  {
    id: 'task-3',
    projectId: 'proj-1',
    epicId: 'epic-1',
    name: 'Fix Checkout Button Bug',
    description: 'Fix issue where checkout button disappears on mobile view',
    relatedExpertiseDomains: ['frontend'],
    tags: ['bugfix', 'mobile', 'critical'],
    status: 'completed',
    lastActive: '2025-03-26T14:22:10.000Z',
    type: 'bugfix',
    priority: 'critical'
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
    priority: 'high'
  },
  {
    id: 'task-5',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Implement Product Filtering',
    description: 'Add advanced filtering options for product listings',
    relatedExpertiseDomains: ['frontend', 'backend', 'qa'],
    tags: ['feature', 'search', 'ui'],
    status: 'in-progress',
    lastActive: '2025-03-27T15:10:22.000Z',
    type: 'feature',
    priority: 'medium'
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
    priority: 'medium'
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
    priority: 'medium'
  },
  {
    id: 'task-8',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Implement Order Tracking',
    description: 'Create order history and tracking functionality',
    relatedExpertiseDomains: ['frontend', 'backend', 'qa'],
    tags: ['orders', 'tracking', 'feature'],
    status: 'planned',
    lastActive: '2025-03-24T11:45:22.000Z',
    type: 'feature',
    priority: 'high'
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
    priority: 'high'
  },
  {
    id: 'task-10',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Implement Cart Persistence',
    description: 'Save shopping cart items across sessions',
    relatedExpertiseDomains: ['frontend', 'backend', 'qa'],
    tags: ['cart', 'persistence', 'feature'],
    status: 'completed',
    lastActive: '2025-03-20T11:30:45.000Z',
    type: 'feature',
    priority: 'high'
  },
  {
    id: 'task-11',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Create Checkout Summary Component',
    description: 'Design and implement the checkout summary sidebar',
    relatedExpertiseDomains: ['frontend', 'design', 'qa'],
    tags: ['checkout', 'ui', 'component'],
    status: 'in-progress',
    lastActive: '2025-03-29T10:15:00.000Z',
    type: 'feature',
    priority: 'high'
  },
  {
    id: 'task-12',
    projectId: 'proj-1',
    epicId: 'epic-3',
    name: 'Add Address Validation',
    description: 'Integrate address validation service for shipping info',
    relatedExpertiseDomains: ['backend', 'frontend', 'qa'],
    tags: ['validation', 'checkout', 'shipping'],
    status: 'planned',
    lastActive: '2025-03-26T09:25:30.000Z',
    type: 'feature',
    priority: 'medium'
  },
  {
    id: 'task-13',
    projectId: 'proj-1',
    name: 'Fix CSS in IE11',
    description: 'Address layout issues in legacy browsers',
    relatedExpertiseDomains: ['frontend', 'qa'],
    tags: ['bugfix', 'compatibility', 'css'],
    status: 'planned',
    lastActive: '2025-03-24T13:40:10.000Z',
    type: 'bugfix',
    priority: 'low'
  },
  {
    id: 'task-14',
    projectId: 'proj-1',
    name: 'Performance Audit',
    description: 'Conduct comprehensive performance review',
    relatedExpertiseDomains: ['frontend', 'backend', 'qa'],
    tags: ['performance', 'audit', 'optimization'],
    status: 'planned',
    lastActive: '2025-03-26T16:10:05.000Z',
    type: 'maintenance',
    priority: 'medium'
  },
  {
    id: 'task-15',
    projectId: 'proj-1',
    name: 'Update Dependencies',
    description: 'Update NPM packages to latest versions',
    relatedExpertiseDomains: ['frontend', 'backend', 'devops', 'qa'],
    tags: ['maintenance', 'dependencies', 'security'],
    status: 'planned',
    lastActive: '2025-03-25T11:32:45.000Z',
    type: 'maintenance',
    priority: 'medium'
  },
  {
    id: 'task-16',
    projectId: 'proj-1',
    name: 'Project Management Activities',
    description: 'Track time spent on project management activities including meetings, planning, and coordination',
    relatedExpertiseDomains: ['pm'],
    tags: ['management', 'coordination', 'planning'],
    status: 'in-progress',
    lastActive: '2025-03-29T14:30:00.000Z',
    type: 'maintenance',
    priority: 'medium'
  }
]

// Mock Epics
export const mockEpics: Epic[] = [
  {
    id: 'epic-1',
    projectId: 'proj-1',
    name: 'Product Page Redesign',
    description: 'Redesign all aspects of the product display pages',
    status: 'in-progress',
    budget: 45000
  },
  {
    id: 'epic-2',
    projectId: 'proj-1',
    name: 'User Management and Security',
    description: 'Features focused on user authentication and secure transactions',
    status: 'planned',
    budget: 55000
  },
  {
    id: 'epic-3',
    projectId: 'proj-1',
    name: 'Checkout Experience',
    description: 'Streamline and enhance the complete checkout process',
    status: 'in-progress',
    budget: 65000
  }
]

// Export all project-related mock data as a single object for convenience
export const mockProjectData = {
  projects: mockProject,
  projectMilestones: mockProjectMilestones,
  employeesInProject: mockEmployeesInProject,
  tasks: mockTasks,
  taskWorkloads: mockTaskWorkloads,
  epics: mockEpics
} 