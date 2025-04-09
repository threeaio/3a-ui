import { Task } from '@/features/data-dashboard/types/domain'
import { ReactNode } from 'react'
import { TaskInsight, EpicBudgetInsight, EpicTaskIssuesInsight } from '../analytics/types/insights'
import { Badge } from '@3a.solutions/ui/badge'

// Helper function to format task list
export function formatTaskList(tasks: Task[], maxShow: number = 3): ReactNode {
  if (tasks.length === 0) return ''

  const shownTasks = tasks
    .slice(0, maxShow)
    .map((t) => `"${t.name}"`)
    .join(', ')
  const remaining = tasks.length > maxShow ? ` and ${tasks.length - maxShow} more` : ''

  return (
    <span className="flex items-center">
      <span className="text-foreground">{shownTasks}</span>
      {remaining && (
        <Badge className="ml-2" variant="outline">
          {remaining}
        </Badge>
      )}
    </span>
  )
}

// Task-level messages (used in task context where task name is already known)
export function renderTaskContextMessage(
  type: TaskInsight['type'],
  data: {
    priority?: 'high' | 'critical'
    daysSinceLastActive?: number
  },
) {
  switch (type) {
    case 'NoAssigneeTaskInsight':
      return <span className="text-foreground/50">In progress but has no assignees</span>
    case 'HighPriorityNoAssigneeTaskInsight':
      return (
        <span className="text-foreground/50">
          <span className="text-foreground">{data.priority === 'critical' ? 'Critical' : 'High'}</span> priority but has
          no assignees
        </span>
      )
    case 'StaleTaskInsight':
      return (
        <span className="text-foreground/50">
          No activity for <span className="text-foreground">{data.daysSinceLastActive}</span> days
        </span>
      )
  }
}

// Epic-level task messages (used when showing task issues in epic context)
export function renderEpicTaskListMessage(
  type: 'NoAssigneeTaskInsight' | 'HighPriorityNoAssigneeTaskInsight' | 'StaleTaskInsight',
  tasks: Task[],
) {
  switch (type) {
    case 'NoAssigneeTaskInsight':
      return (
        <span className="text-foreground/50">
          Unassigned in-progress: <span className="text-foreground">{formatTaskList(tasks)}</span>
        </span>
      )
    case 'HighPriorityNoAssigneeTaskInsight':
      return (
        <span className="text-foreground/50">
          High-priority without assignee: <span className="text-foreground">{formatTaskList(tasks)}</span>
        </span>
      )
    case 'StaleTaskInsight':
      return (
        <span className="text-foreground/50">
          No progress in 7+ days: <span className="text-foreground">{formatTaskList(tasks)}</span>
        </span>
      )
  }
}

export function renderEpicMessage(
  type: EpicBudgetInsight['type'] | EpicTaskIssuesInsight['type'],
  data: {
    percentageUsed?: number
    remainingBudget?: number
    unassignedInProgress?: Task[]
    highPriorityUnassigned?: Task[]
    staleTasks?: Task[]
  },
) {
  switch (type) {
    case 'EpicBudgetInsight':
      if (data.percentageUsed && data.percentageUsed >= 1) {
        return (
          <span className="text-foreground/50">
            Budget exceeded by
            <span className="text-foreground">{Math.round((data.percentageUsed - 1) * 100)}%</span>
          </span>
        )
      } else if (data.percentageUsed && data.remainingBudget) {
        return (
          <span className="text-foreground/50">
            Only{' '}
            <span className="text-foreground">
              {Math.round((1 - data.percentageUsed) * 100)}% ({data.remainingBudget.toLocaleString('de-DE')}€)
            </span>
            of budget remaining
          </span>
        )
      }
      return null

    case 'EpicTaskIssuesInsight':
      const { unassignedInProgress = [], highPriorityUnassigned = [], staleTasks = [] } = data

      return (
        <span className="text-foreground/50">
          {unassignedInProgress.length > 0 && (
            <>
              {renderEpicTaskListMessage('NoAssigneeTaskInsight', unassignedInProgress)}
              {highPriorityUnassigned.length > 0 && <br />}
            </>
          )}
          {highPriorityUnassigned.length > 0 &&
            renderEpicTaskListMessage('HighPriorityNoAssigneeTaskInsight', highPriorityUnassigned)}
          {staleTasks.length > 0 && (
            <>
              {(unassignedInProgress.length > 0 || highPriorityUnassigned.length > 0) && <br />}
              {renderEpicTaskListMessage('StaleTaskInsight', staleTasks)}
            </>
          )}
        </span>
      )
  }
}

export function renderProjectMessage(
  type: 'TooManyEpicsInsight' | 'ProjectBudgetInsight' | 'EmployeeLoadInsight' | 'ProjectEpicIssuesInsight',
  data: {
    activeEpicsCount?: number
    maxRecommended?: number
    projectName?: string
    percentageUsed?: number
    employeeTaskCount?: number
    threshold?: number
  },
) {
  switch (type) {
    case 'TooManyEpicsInsight':
      return (
        <span>
          <span className="text-foreground/50">
            Project has <span className="text-foreground">{data.activeEpicsCount}</span> epics in progress (maximum
            recommended: <span className="text-foreground">{data.maxRecommended}</span>)
          </span>
        </span>
      )
    case 'ProjectBudgetInsight':
      return (
        <span>
          <span className="text-foreground/50">
            Project <span className="text-foreground">"{data.projectName}"</span>{' '}
            {data.percentageUsed && data.percentageUsed >= 1 ? 'has used' : 'is approaching its budget limit'} (
            <span className="text-foreground">{Math.round((data.percentageUsed || 0) * 100)}%</span> used)
          </span>
        </span>
      )
    case 'EmployeeLoadInsight':
      return (
        <span>
          <span className="text-foreground/50">
            Employee has <span className="text-foreground">{data.employeeTaskCount}</span> assigned tasks (
            <span className="text-foreground">
              {data.employeeTaskCount && data.employeeTaskCount >= 8 ? 'critical' : 'warning'}
            </span>{' '}
            threshold: <span className="text-foreground">{data.threshold}</span>)
          </span>
        </span>
      )
    case 'ProjectEpicIssuesInsight':
      return (
        <span>
          <span className="text-foreground/50">Project has epic issues that need attention</span>
        </span>
      )
  }
}
