import { BadgeSelectOption } from "@3a.solutions/ui/badge-select"

export type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastActive: string
  avatar?: string
}

export type Project = {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'critical'
  progress: number
  startDate: string
  endDate: string
  teamSize: number
  budget: number
  currentSpend: number
  tags: string[]
  teamMembers: string[] // user IDs
}

// Extract literal types for reuse
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'
export type DataKey = {
  key: string
  name: string
  color: string
}

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  assignee: string | null
  dueDate: string
  completedDate?: string
  projectId: string
  tags: string[]
  estimatedHours: number
  actualHours?: number
}



export type Risk = {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'identified' | 'mitigating' | 'resolved'
  projectId: string
  assignee: string
  identifiedDate: string
  resolvedDate?: string
}

export type Milestone = {
  id: string
  title: string
  description: string
  dueDate: string
  projectId: string
  status: 'upcoming' | 'in-progress' | 'completed' | 'delayed'
  completedDate?: string
}

export type ProjectMetric = {
  name: string
  value: number
  change: number
  trend: 'up' | 'down' | 'neutral'
  suffix?: string
}

export type TimelineEvent = {
  id: string
  title: string
  description: string
  date: string
  type: 'milestone' | 'task' | 'risk' | 'update'
  projectId: string
  relatedId?: string
}

export type ChartData = {
  name: string
  value: number
}

export type TimeSeriesData = {
  date: string
  value: number
  category?: string
} 