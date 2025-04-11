import { Task } from '@/features/data-dashboard/types/domain'
import { TaskInsight } from './types/insights'
import { generateTaskInsightId } from './utils'
import { ANALYTICS_CONFIG } from '@/features/data-dashboard/analytics/config'

export function analyzeTask(task: Task): TaskInsight[] {
  const insights: TaskInsight[] = []

  const FAKE_NOW = new Date('2025-04-05T12:00:00.000Z')

  // Check for tasks with no assignee but in progress
  if (task.status === 'in-progress' && (!task.assignedEmployeeIds || task.assignedEmployeeIds.length === 0)) {
    insights.push({
      id: generateTaskInsightId(task.id, 'no-assignee-in-progress'),
      severity: 'critical',
      context: 'task',
      entityId: task.id,
      type: 'NoAssigneeTaskInsight',
      metadata: undefined,
    })
  }

  // Check for high priority tasks with no assignees
  if (task.priority === 'high' || task.priority === 'critical') {
    if (!task.assignedEmployeeIds || task.assignedEmployeeIds.length === 0) {
      insights.push({
        id: generateTaskInsightId(task.id, 'high-priority-no-assignee'),
        severity: 'critical',
        context: 'task',
        entityId: task.id,
        type: 'HighPriorityNoAssigneeTaskInsight',
        metadata: undefined,
      })
    }
  }

  // Check for long-running tasks without progress
  const lastActiveDate = new Date(task.lastActive)
  const daysSinceLastActive = Math.floor((FAKE_NOW.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24))

  if (task.status === 'in-progress' && daysSinceLastActive > ANALYTICS_CONFIG.TASK_STALE_DAYS) {
    insights.push({
      id: generateTaskInsightId(task.id, 'stale-task'),
      severity: 'warning',
      context: 'task',
      entityId: task.id,
      type: 'StaleTaskInsight',
      metadata: {
        daysSinceLastActive,
        lastActiveDate: task.lastActive,
      },
    })
  }

  return insights
} 