// Mock data for filter options

// Tags for filtering staff members
export interface Tag {
  id: string
  name: string
  color?: string // Optional color for the badge
}

export const tags: Tag[] = [
  { id: 'frontend', name: 'Frontend', color: 'blue' },
  { id: 'backend', name: 'Backend', color: 'green' },
  { id: 'fullstack', name: 'Full Stack', color: 'purple' },
  { id: 'design', name: 'Design', color: 'pink' },
  { id: 'pm', name: 'Project Management', color: 'yellow' },
  { id: 'qa', name: 'QA', color: 'orange' },
  { id: 'devops', name: 'DevOps', color: 'cyan' },
  { id: 'mobile', name: 'Mobile', color: 'red' },
]

// Companies for filtering staff members
export interface Company {
  id: string
  name: string
}

export const companies: Company[] = [
  { id: 'acme', name: 'Acme Corp' },
  { id: 'globex', name: 'Globex' },
  { id: 'initech', name: 'Initech' },
  { id: 'umbrella', name: 'Umbrella Corp' },
  { id: 'stark', name: 'Stark Industries' },
]

// Managing Directors for filtering staff members
export interface ManagingDirector {
  id: string
  name: string
}

export const managingDirectors: ManagingDirector[] = [
  { id: 'md1', name: 'Jane Smith' },
  { id: 'md2', name: 'John Doe' },
  { id: 'md3', name: 'Alice Johnson' },
  { id: 'md4', name: 'Bob Williams' },
]

// Tribes for filtering staff members
export interface Tribe {
  id: string
  name: string
}

export const tribes: Tribe[] = [
  { id: 'alpha', name: 'Alpha' },
  { id: 'beta', name: 'Beta' },
  { id: 'gamma', name: 'Gamma' },
  { id: 'delta', name: 'Delta' },
  { id: 'epsilon', name: 'Epsilon' },
]

// Filter state interface
export interface FilterState {
  personName: string
  project: string
  selectedTags: Tag[]
  company: Company | null
  managingDirector: ManagingDirector | null
  tribe: Tribe | null
}

// Default filter state
export const defaultFilterState: FilterState = {
  personName: '',
  project: '',
  selectedTags: [],
  company: null,
  managingDirector: null,
  tribe: null,
}

// Saved filter interface
export interface SavedFilter extends FilterState {
  id: string
  name: string
}

// Mock saved filters
export const savedFilters: SavedFilter[] = [
  {
    id: 'filter1',
    name: 'Frontend Team',
    personName: '',
    project: '',
    selectedTags: [tags[0]], // Frontend tag
    company: null,
    managingDirector: null,
    tribe: tribes[0], // Alpha tribe
  },
  {
    id: 'filter2',
    name: 'Acme Projects',
    personName: '',
    project: '',
    selectedTags: [],
    company: companies[0], // Acme Corp
    managingDirector: null,
    tribe: null,
  },
]
