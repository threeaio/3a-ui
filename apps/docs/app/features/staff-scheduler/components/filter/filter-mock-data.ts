// Mock data for filter options

// Tags for filtering staff members
export interface Tag {
  id: string
  name: string
}

export const tags: Tag[] = [
  { id: 'tag1', name: 'Frontend' },
  { id: 'tag2', name: 'Backend' },
  { id: 'tag3', name: 'DevOps' },
  { id: 'tag4', name: 'Design' },
]

// Companies for filtering staff members
export interface Company {
  id: string
  name: string
}

export const companies: Company[] = [
  { id: 'c1', name: 'Tech Solutions' },
  { id: 'c2', name: 'Digital Innovations' },
]

// Managing Directors for filtering staff members
export interface ManagingDirector {
  id: string
  name: string
}

export const managingDirectors: ManagingDirector[] = [
  { id: 'md1', name: 'John Director' },
  { id: 'md2', name: 'Sarah Manager' },
]

// Tribes for filtering staff members
export interface Tribe {
  id: string
  name: string
}

export const tribes: Tribe[] = [
  { id: 't1', name: 'Platform' },
  { id: 't2', name: 'Product' },
]

// Filter state interface
export interface FilterState {
  personName: string
  project: string
  company: Company | null
  managingDirector: ManagingDirector | null
  tribe: Tribe | null
  selectedTags: Tag[]
}

// Default filter state
export const defaultFilterState: FilterState = {
  personName: '',
  project: '',
  company: null,
  managingDirector: null,
  tribe: null,
  selectedTags: [],
}

// Saved filter interface
export interface SavedFilter {
  id: string
  name: string
  personName: string
  project: string
  company: Company | null
  managingDirector: ManagingDirector | null
  tribe: Tribe | null
  selectedTags: Tag[]
}

// Helper function to safely get array item or null
const safeGet = <T>(arr: T[], index: number): T | null => {
  return arr[index] || null
}

// Mock saved filters
export const mockSavedFilters: SavedFilter[] = [
  {
    id: 'sf1',
    name: 'Frontend Team',
    personName: '',
    project: '',
    company: null,
    managingDirector: safeGet(managingDirectors, 0),
    tribe: safeGet(tribes, 0),
    selectedTags: [tags[0]!], // Non-null assertion is safe here as we know the array has items
  },
  {
    id: 'sf2',
    name: 'Backend Team',
    personName: '',
    project: '',
    company: safeGet(companies, 0),
    managingDirector: null,
    tribe: null,
    selectedTags: [tags[1]!], // Non-null assertion is safe here as we know the array has items
  },
]
