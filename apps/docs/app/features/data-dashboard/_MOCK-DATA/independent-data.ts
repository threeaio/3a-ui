import { 
  Employee, 
  EmployeeSkill, 
  ExpertiseDomain 
} from '../types/domain'

// Mock ExpertiseDomains
export const mockExpertiseDomains: ExpertiseDomain[] = [
  'frontend', 
  'backend', 
  'design', 
  'ux', 
  'devops', 
  'qa', 
  'pm', 
  'other'
]

// Mock EmployeeSkills
export const mockEmployeeSkills: EmployeeSkill[] = [
  {
    id: 'skill-1',
    name: 'React',
    description: 'Frontend development with React framework',
    relatedExpertiseDomains: ['frontend'],
    level: 5
  },
  {
    id: 'skill-2',
    name: 'Node.js',
    description: 'Backend development with Node.js',
    relatedExpertiseDomains: ['backend'],
    level: 4
  },
  {
    id: 'skill-3',
    name: 'UI Design',
    description: 'Creating user interfaces and design systems',
    relatedExpertiseDomains: ['design', 'ux'],
    level: 3
  },
  {
    id: 'skill-4',
    name: 'Docker',
    description: 'Containerization and deployment',
    relatedExpertiseDomains: ['devops'],
    level: 4
  },
  {
    id: 'skill-5',
    name: 'Jest',
    description: 'Frontend and backend testing',
    relatedExpertiseDomains: ['qa', 'frontend', 'backend'],
    level: 3
  },
  {
    id: 'skill-6',
    name: 'Project Management',
    description: 'Managing projects and teams',
    relatedExpertiseDomains: ['pm'],
    level: 5
  },
  {
    id: 'skill-7',
    name: 'TypeScript',
    description: 'Type-safe JavaScript development',
    relatedExpertiseDomains: ['frontend', 'backend'],
    level: 4
  },
  {
    id: 'skill-8',
    name: 'Next.js',
    description: 'React framework for production applications',
    relatedExpertiseDomains: ['frontend'],
    level: 5
  },
  {
    id: 'skill-9',
    name: 'GraphQL',
    description: 'Query language for APIs',
    relatedExpertiseDomains: ['backend', 'frontend'],
    level: 3
  },
  {
    id: 'skill-10',
    name: 'AWS',
    description: 'Cloud infrastructure and services',
    relatedExpertiseDomains: ['devops', 'backend'],
    level: 4
  },
  {
    id: 'skill-11',
    name: 'CI/CD',
    description: 'Continuous integration and deployment',
    relatedExpertiseDomains: ['devops'],
    level: 4
  },
  {
    id: 'skill-12',
    name: 'Figma',
    description: 'Design and prototyping tool',
    relatedExpertiseDomains: ['design', 'ux'],
    level: 5
  },
  {
    id: 'skill-13',
    name: 'User Research',
    description: 'Gathering user insights and requirements',
    relatedExpertiseDomains: ['ux'],
    level: 3
  },
  {
    id: 'skill-14',
    name: 'PostgreSQL',
    description: 'Relational database management',
    relatedExpertiseDomains: ['backend'],
    level: 4
  },
  {
    id: 'skill-15',
    name: 'Agile Methodologies',
    description: 'Scrum, Kanban, and other agile frameworks',
    relatedExpertiseDomains: ['pm'],
    level: 5
  },
  {
    id: 'skill-16',
    name: 'iOS Development',
    description: 'Mobile development for iOS using Swift/SwiftUI',
    relatedExpertiseDomains: ['mobile'],
    level: 4
  },
  {
    id: 'skill-17',
    name: 'Android Development',
    description: 'Mobile development for Android using Kotlin',
    relatedExpertiseDomains: ['mobile'],
    level: 4
  },
  {
    id: 'skill-18',
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework',
    relatedExpertiseDomains: ['frontend', 'design'],
    level: 5
  },
  {
    id: 'skill-19',
    name: 'Redux',
    description: 'State management for React applications',
    relatedExpertiseDomains: ['frontend'],
    level: 4
  },
  {
    id: 'skill-20',
    name: 'Kubernetes',
    description: 'Container orchestration',
    relatedExpertiseDomains: ['devops'],
    level: 4
  },
  {
    id: 'skill-21',
    name: 'MongoDB',
    description: 'NoSQL database management',
    relatedExpertiseDomains: ['backend'],
    level: 4
  },
  {
    id: 'skill-22',
    name: 'React Native',
    description: 'Cross-platform mobile development',
    relatedExpertiseDomains: ['mobile', 'frontend'],
    level: 4
  },
  {
    id: 'skill-23',
    name: 'Accessibility',
    description: 'Web accessibility (WCAG) implementation',
    relatedExpertiseDomains: ['frontend', 'ux'],
    level: 4
  },
  {
    id: 'skill-24',
    name: 'Performance Optimization',
    description: 'Web performance and optimization techniques',
    relatedExpertiseDomains: ['frontend', 'backend'],
    level: 5
  },
  {
    id: 'skill-25',
    name: 'Security',
    description: 'Application security and best practices',
    relatedExpertiseDomains: ['backend', 'devops'],
    level: 4
  }
]

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Sophie Martinez',
    email: 'sophie.martinez@example.com',
    lastActive: '2025-03-29T18:25:43.511Z',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    hourlyRate: 75,
    skills: [
      mockEmployeeSkills[0]!, // React
      mockEmployeeSkills[2]!, // UI Design
      mockEmployeeSkills[4]!, // Jest
      mockEmployeeSkills[7]!, // NextJS
      mockEmployeeSkills[11]! // Figma
    ]
  },
  {
    id: 'emp-2',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    lastActive: '2025-03-28T10:15:30.123Z',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    hourlyRate: 85,
    skills: [
      mockEmployeeSkills[1]!, // Node.js
      mockEmployeeSkills[3]!, // Docker
      mockEmployeeSkills[6]!, // TypeScript
      mockEmployeeSkills[9]!, // AWS
      mockEmployeeSkills[13]! // PostgreSQL
    ]
  },
  {
    id: 'emp-3',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    lastActive: '2025-02-15T14:30:00.000Z',
    skills: [
      mockEmployeeSkills[5]!, // Project Management
      mockEmployeeSkills[2]!, // UI Design
      mockEmployeeSkills[14]! // Agile Methodologies
    ]
  },
  {
    id: 'emp-4',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    lastActive: '2025-03-15T09:45:22.711Z',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    hourlyRate: 65,
    skills: [
      mockEmployeeSkills[0]!, // React
      mockEmployeeSkills[1]!, // Node.js
      mockEmployeeSkills[4]!, // Jest
      mockEmployeeSkills[6]!, // TypeScript
      mockEmployeeSkills[8]! // GraphQL
    ]
  },
  {
    id: 'emp-5',
    name: 'Laura Kim',
    email: 'laura.kim@example.com',
    lastActive: '2025-03-30T09:12:34.567Z',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    hourlyRate: 90,
    skills: [
      mockEmployeeSkills[2]!, // UI Design
      mockEmployeeSkills[11]!, // Figma
      mockEmployeeSkills[12]!, // User Research
      mockEmployeeSkills[6]!, // TypeScript
      mockEmployeeSkills[7]! // NextJS
    ]
  },
  {
    id: 'emp-6',
    name: 'David Rodriguez',
    email: 'david.rodriguez@example.com',
    lastActive: '2025-03-27T14:42:18.325Z',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    hourlyRate: 80,
    skills: [
      mockEmployeeSkills[3]!, // Docker
      mockEmployeeSkills[9]!, // AWS
      mockEmployeeSkills[10]!, // CI/CD
      mockEmployeeSkills[1]!, // Node.js
      mockEmployeeSkills[13]! // PostgreSQL
    ]
  },
  {
    id: 'emp-7',
    name: 'Patricia Hughes',
    email: 'patricia.hughes@example.com',
    lastActive: '2025-03-28T11:33:44.123Z',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    hourlyRate: 85,
    skills: [
      mockEmployeeSkills[5]!, // Project Management
      mockEmployeeSkills[14]!, // Agile Methodologies
      mockEmployeeSkills[12]!, // User Research
      mockEmployeeSkills[2]! // UI Design
    ]
  },
  {
    id: 'emp-8',
    name: 'Alex Thompson',
    email: 'alex.thompson@example.com',
    lastActive: '2025-03-29T15:20:33.123Z',
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    hourlyRate: 70,
    skills: [
      mockEmployeeSkills[4]!, // Jest
      mockEmployeeSkills[0]!, // React
      mockEmployeeSkills[1]!, // Node.js
      mockEmployeeSkills[6]!, // TypeScript
      mockEmployeeSkills[16]!, // iOS
      mockEmployeeSkills[17]! // Android
    ]
  }
]

// Export all independent mock data as a single object for convenience
export const mockIndependentData = {
  expertiseDomains: mockExpertiseDomains,
  employeeSkills: mockEmployeeSkills,
  employees: mockEmployees
} 