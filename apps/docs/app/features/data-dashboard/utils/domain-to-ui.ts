import { ProjectStatus, TaskStatus, EpicStatus, MilestoneStatus, TaskPriority } from '../types/domain'

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
import { BugIcon, BookmarkCheck, WrenchIcon, PencilRulerIcon, RefreshCwIcon, FileEditIcon, CheckIcon, ArrowUpRightIcon, TimerIcon } from 'lucide-react'

export const getTaskTypeIcon = (type: Task['type']) => {
  switch (type) {
    case 'bugfix':
      return { icon: BugIcon, label: 'Bug Fix', className: 'text-destructive' }
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
      return { icon: ArrowUpRightIcon, label: 'In Progress', className: 'text-primary' }
    default:
      return { icon: TimerIcon, label: 'Pending' }
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