import { ProjectStatus, TaskStatus, EpicStatus, MilestoneStatus, TaskPriority } from '../types/domain'

export const getStatusBadgeColor = (status: ProjectStatus | TaskStatus | EpicStatus | MilestoneStatus): string => {
  switch (status) {
    case 'planned':
      return 'bg-purple-500 text-white'
    case 'in-progress':
      return 'bg-blue-500 text-white'
    case 'completed':
      return 'bg-green-500 text-white'
    case 'cancelled':
      return 'bg-gray-500 text-white'
    case 'upcoming':
      return 'bg-purple-500 text-white'
    case 'overdue':
      return 'bg-red-500 text-white'
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
      return 'bg-red-500 text-white'
    default:
      return 'bg-gray-500 text-white'
  }
} 