// Import from independent-data.ts
import { 
  mockExpertiseDomains,
  mockEmployeeSkills,
  mockEmployees,
  mockIndependentData
} from './independent-data'

// Import from project-data.ts  
import {
  mockProject,
  mockProjectMilestones,
  mockEmployeesInProject,
  mockTasks,
  mockTaskWorkloads,
  mockEpics,
  mockProjectData
} from './project-1-data'

// Re-export everything
export {
  mockExpertiseDomains,
  mockEmployeeSkills,
  mockEmployees,
  mockProject,
  mockProjectMilestones,
  mockEmployeesInProject,
  mockTasks,
  mockTaskWorkloads,
  mockEpics
}

// Export combined mock data object
export const mockData = {
  ...mockIndependentData,
  ...mockProjectData
}
