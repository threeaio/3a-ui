import { ProjectStatus, TaskStatus, EpicStatus, MilestoneStatus, TaskPriority } from '../types/domain'
import { mapTagToDomains } from '../_MOCK-DATA/tag-to-domain-mapping'
import { EmployeeSkill, ExpertiseDomain } from '../types/domain'

export const STATUS_ORDER: Record<TaskStatus, number> = {
  planned: 0,
  'in-progress': 1,
  completed: 2,
  cancelled: 3,
}

export const STATUS_COLORS: Record<TaskStatus, string> = {
  planned: 'bg-purple-500',
  'in-progress': 'bg-blue-500',
  completed: 'bg-green-500',
  cancelled: 'bg-gray-500',
}

export const getStatusBadgeColor = (status: ProjectStatus | TaskStatus | EpicStatus | MilestoneStatus): string => {
  switch (status) {
    case 'planned':
      return 'bg-purple-500 border-purple-500 text-white'
    case 'in-progress':
      return 'bg-blue-500 border-blue-500 text-white'
    case 'completed':
      return 'bg-green-500 border-green-500 text-white'
    case 'cancelled':
      return 'bg-gray-500 border-gray-500 text-white'
    case 'upcoming':
      return 'bg-purple-500 border-purple-500 text-white'
    case 'overdue':
      return 'bg-destructive border-destructive text-destructive-foreground'
    default:
      return 'bg-gray-500 text-white'
  }
}

export const getPriorityBadgeColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'low':
      return 'bg-blue-500 text-white'
    case 'medium':
      return 'bg-yellow-500 text-white'
    case 'high':
      return 'bg-orange-500 text-white'
    case 'critical':
      return 'bg-destructive text-destructive-foreground'
    default:
      return 'bg-gray-500 text-white'
  }
} 


import { Task } from '@/features/data-dashboard/types/domain'
import { BugIcon, BookmarkCheck, WrenchIcon, PencilRulerIcon, RefreshCwIcon, FileEditIcon, CheckIcon, ArrowUpRightIcon, TimerIcon, Brain } from 'lucide-react'

export const getTaskTypeIcon = (type: Task['type']) => {
  switch (type) {
    case 'bugfix':
      return { icon: BugIcon, label: 'Bug Fix', className: '' }
    case 'feature':
      return { icon: BookmarkCheck, label: 'Feature', className: '' }
    case 'design':
      return { icon: PencilRulerIcon, label: 'Design', className: '' }
    case 'refactoring':
      return { icon: RefreshCwIcon, label: 'Refactoring', className: '' }
    case 'change-request':
      return { icon: FileEditIcon, label: 'Change Request', className: '' }
    default:
      return { icon: WrenchIcon, label: 'Maintenance', className: '' }
  }
}

export const getTaskStatusIcon = (status: Task['status']) => {
  switch (status) {
    case 'completed':
      return { icon: CheckIcon, label: 'Completed', className: '' }
    case 'in-progress':
      return { icon: ArrowUpRightIcon, label: 'In Progress', className: '' }
    default:
      return { icon: Brain, label: 'Pending' }
  }
}

export const getPriorityArrows = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return { count: 3, label: 'High Priority' }
    case 'medium':
      return { count: 2, label: 'Medium Priority' }
    default:
      return { count: 1, label: 'Low Priority' }
  }
}

type DomainColorScheme = {
  bg: string
  text: string
  border: string
}

type DomainKey = ExpertiseDomain

const DOMAIN_COLORS: Record<DomainKey, DomainColorScheme> = {
  'frontend': { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-500' },
  'backend': { bg: 'bg-green-500', text: 'text-white', border: 'border-green-500' },
  'design': { bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-500' },
  'devops': { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-500' },
  'qa': { bg: 'bg-yellow-500', text: 'text-white', border: 'border-yellow-500' },
  'mobile': { bg: 'bg-pink-500', text: 'text-white', border: 'border-pink-500' },
  'ux': { bg: 'bg-indigo-500', text: 'text-white', border: 'border-indigo-500' },
  'pm': { bg: 'bg-cyan-500', text: 'text-white', border: 'border-cyan-500' },
  'other': { bg: 'bg-gray-500', text: 'text-white', border: 'border-gray-500' },
}

const DOMAIN_COLORS_WITH_OPACITY: Record<DomainKey, DomainColorScheme> = {
  'frontend': { bg: 'bg-blue-500/20', text: 'text-foreground', border: 'border-blue-500' },
  'backend': { bg: 'bg-green-500/20', text: 'text-foreground', border: 'border-green-500' },
  'design': { bg: 'bg-purple-500/20', text: 'text-foreground', border: 'border-purple-500' },
  'devops': { bg: 'bg-orange-500/20', text: 'text-foreground', border: 'border-orange-500' },
  'qa': { bg: 'bg-yellow-500/20', text: 'text-foreground', border: 'border-yellow-500' },
  'mobile': { bg: 'bg-pink-500/20', text: 'text-foreground', border: 'border-pink-500' },
  'ux': { bg: 'bg-indigo-500/20', text: 'text-foreground', border: 'border-indigo-500' },
  'pm': { bg: 'bg-cyan-500/20', text: 'text-foreground', border: 'border-cyan-500' },
  'other': { bg: 'bg-gray-500/20', text: 'text-foreground', border: 'border-gray-500' },
}

const getColorScheme = (domain: string, withOpacity = false): DomainColorScheme => {
  const key = domain.toLowerCase() as DomainKey
  const colors = withOpacity ? DOMAIN_COLORS_WITH_OPACITY : DOMAIN_COLORS
  return colors[key] || colors.other
}

export const getDomainBadgeColor = (domain: string): string => {
  const colors = getColorScheme(domain)
  return `${colors.bg} ${colors.text}`
}

export const getTagBadgeColor = (tag: string): string => {
  // Get the primary domain for this tag
  const domains = mapTagToDomains(tag)
  const primaryDomain = domains[0] || 'other'
  
  // Get the color scheme for this domain with opacity
  const colors = getColorScheme(primaryDomain, true)
  
  // Return the classes
  return `${colors.bg} ${colors.text} border ${colors.border}`
}

export const getSkillBadgeColor = (skill: EmployeeSkill): string => {
  // Use the first related domain for the color scheme
  const primaryDomain = skill.relatedExpertiseDomains[0] || 'other'
  
  // Get the color scheme with opacity
  const colors = getColorScheme(primaryDomain, true)
  
  // Return the classes - same style as tags for consistency
  return `${colors.bg} ${colors.text} border ${colors.border}`
} 