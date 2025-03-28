import { TaskPriority } from '../types'

export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'planning':
      return 'bg-purple-500'
    case 'in-progress':
      return 'bg-blue-500'
    case 'completed':
      return 'bg-green-500'
    case 'cancelled':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

export const getPriorityBadgeColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'low':
      return 'bg-blue-500'
    case 'medium':
      return 'bg-yellow-500'
    case 'high':
      return 'bg-orange-500'
    case 'critical':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
} 