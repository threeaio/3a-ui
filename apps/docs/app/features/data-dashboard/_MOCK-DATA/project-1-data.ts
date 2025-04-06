import { Project, ProjectMilestone, EmployeeInProject } from '../types/domain'
import { epic1, epic1Tasks, epic1Workloads } from './epic-1-data'
import { epic2, epic2Tasks, epic2Workloads } from './epic-2-data'
import { epic3, epic3Tasks, epic3Workloads } from './epic-3-data'
import { epic4, epic4Tasks, epic4Workloads } from './epic-4-with-fails'
import { nonEpicTasks, nonEpicWorkloads } from './non-epic-tasks-data'

// Mock Projects
export const mockProject: Project = {
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

// Export epics
export const mockEpics = [epic1, epic2, epic3, epic4]

// Export all tasks
export const mockTasks = [
  ...epic1Tasks,
  ...epic2Tasks,
  ...epic3Tasks,
  ...epic4Tasks,
  ...nonEpicTasks
]

// Export all workloads
export const mockTaskWorkloads = [
  ...epic1Workloads,
  ...epic2Workloads,
  ...epic3Workloads,
  ...epic4Workloads,
  ...nonEpicWorkloads
]

// Export all project-related mock data as a single object for convenience
export const mockProjectData = {
  project: mockProject,
  projectMilestones: mockProjectMilestones,
  employeesInProject: mockEmployeesInProject,
  tasks: mockTasks,
  taskWorkloads: mockTaskWorkloads,
  epics: mockEpics
} 