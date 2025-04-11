import { Task } from '@/features/data-dashboard/types/domain'
import { ReactNode } from 'react'
import {
  TaskInsight,
  TaskInsightType,
  EpicInsightType,
  ProjectInsightType,
  EpicInsight,
} from '@/features/data-dashboard/analytics'
import { Badge } from '@3a.solutions/ui/badge'
import { AnalyticsIcon } from './analytics-icon'
import { cn } from '@3a.solutions/ui/lib/utils'

const ALERT_BASE_CLASS = 'text-foreground/65'

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
  type: TaskInsightType,
  data: {
    priority?: 'high' | 'critical'
    daysSinceLastActive?: number
  },
) {
  switch (type) {
    case 'NoAssigneeTaskInsight':
      return (
        <span className={ALERT_BASE_CLASS}>
          <span className="text-foreground">In progress</span> but has no assignees
        </span>
      )
    case 'HighPriorityNoAssigneeTaskInsight':
      return (
        <span className={ALERT_BASE_CLASS}>
          <span className="text-foreground">{data.priority === 'critical' ? 'Critical' : 'High'} priority</span> but has
          no assignees
        </span>
      )
    case 'StaleTaskInsight':
      return (
        <span className={ALERT_BASE_CLASS}>
          No activity for <span className="text-foreground">{data.daysSinceLastActive}</span> days
        </span>
      )
  }
}

// Epic-level task messages (used when showing task issues in epic context)
export function renderEpicTaskListMessage(type: TaskInsightType, tasks: Task[]) {
  switch (type) {
    case 'NoAssigneeTaskInsight':
      return (
        <span className={ALERT_BASE_CLASS}>
          Unassigned in-progress: <span className="text-foreground">{formatTaskList(tasks)}</span>
        </span>
      )
    case 'HighPriorityNoAssigneeTaskInsight':
      return (
        <span className={ALERT_BASE_CLASS}>
          High-priority without assignee: <span className="text-foreground">{formatTaskList(tasks)}</span>
        </span>
      )
    case 'StaleTaskInsight':
      return (
        <span className={ALERT_BASE_CLASS}>
          No progress in 7+ days: <span className="text-foreground">{formatTaskList(tasks)}</span>
        </span>
      )
  }
}

interface TaskIssuesListProps {
  taskIssues: TaskInsight[]
}

function TaskIssuesList({ taskIssues }: TaskIssuesListProps) {
  const insightLabels: Record<TaskInsightType, string> = {
    NoAssigneeTaskInsight: 'Task without assignee',
    HighPriorityNoAssigneeTaskInsight: 'High-priority without assignee',
    StaleTaskInsight: 'No progress in 7+ days',
  }

  const counts = taskIssues.reduce<Record<string, number>>((acc, task) => {
    acc[task.type] = (acc[task.type] || 0) + 1
    return acc
  }, {})

  return (
    <span className="flex flex-wrap gap-2">
      {Object.entries(counts).map(([type, count]) => (
        <span key={type} className="flex items-center gap-1.5">
          <AnalyticsIcon
            type={type as TaskInsightType}
            severity={taskIssues.find((t) => t.type === type)?.severity}
            className="w-4 h-4"
          />
          <span>
            {insightLabels[type as TaskInsightType]} ({count})
          </span>
        </span>
      ))}
    </span>
  )
}

export function renderEpicMessage(
  type: EpicInsightType,
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
          <span className={ALERT_BASE_CLASS}>
            Budget exceeded by
            <span className="text-foreground">{Math.round((data.percentageUsed - 1) * 100)}%</span>
          </span>
        )
      } else if (data.percentageUsed && data.remainingBudget) {
        return (
          <span className={ALERT_BASE_CLASS}>
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
        <span className={ALERT_BASE_CLASS}>
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
  type: ProjectInsightType,
  data: {
    activeEpicsCount?: number
    maxRecommended?: number
    projectName?: string
    percentageUsed?: number
    employeeTaskCount?: number
    threshold?: number
    employeeName?: string
    affectedEpics?: Array<{ epicName: string } & EpicInsight>
  },
) {
  switch (type) {
    case 'TooManyEpicsInsight':
      return (
        <span>
          <span className={ALERT_BASE_CLASS}>
            Project has <span className="text-foreground">{data.activeEpicsCount}</span> epics in progress (maximum
            recommended: <span className="text-foreground">{data.maxRecommended}</span>)
          </span>
        </span>
      )
    case 'ProjectBudgetInsight':
      return (
        <span>
          <span className={ALERT_BASE_CLASS}>
            Project <span className="text-foreground">"{data.projectName}"</span>{' '}
            {data.percentageUsed && data.percentageUsed >= 1 ? 'has used' : 'is approaching its budget limit'} (
            <span className="text-foreground">{Math.round((data.percentageUsed || 0) * 100)}%</span> used)
          </span>
        </span>
      )
    case 'EmployeeLoadInsight':
      return (
        <span className={cn(ALERT_BASE_CLASS, 'flex items-center gap-1')}>
          <AnalyticsIcon type="EmployeeLoadInsight" severity="critical" className="size-4" />
          Employee <span className="text-foreground">"{data.employeeName}"</span> has{' '}
          <span className="text-foreground">{data.employeeTaskCount}</span> assigned tasks in progress
        </span>
      )
    case 'ProjectEpicIssuesInsight':
      if (!data.affectedEpics?.length) return null

      return (
        <span className={ALERT_BASE_CLASS}>
          {data.affectedEpics.map((epic, index) => (
            <div key={index} className="flex flex-col mt-2">
              <span className="text-foreground">
                {epic.epicName} ({epic.type === 'EpicBudgetInsight' && 'Budget'}
                {epic.type === 'EpicTaskIssuesInsight' && 'Task issues'})
              </span>
              {epic.type === 'EpicTaskIssuesInsight' && <TaskIssuesList taskIssues={epic.metadata.taskIssues} />}
              {epic.type === 'EpicBudgetInsight' && (
                <div className="flex items-center gap-1">
                  <AnalyticsIcon type="EpicBudgetInsight" severity="critical" className="size-4" />
                  <span>
                    Budget exceeded by{' '}
                    {epic.metadata.percentageUsed.toLocaleString('de-DE', {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              )}
            </div>
          ))}
        </span>
      )
  }
}
