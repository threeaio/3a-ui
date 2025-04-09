import { Project, Epic, Task } from '@/features/data-dashboard/types/domain'
import { ProjectInsight, EpicInsight } from './types/insights'
import { ANALYTICS_CONFIG, generateProjectInsightId } from './utils/common'

export function analyzeProject(
  project: Project, 
  epics: Epic[], 
  tasks: Task[], 
  totalCost: number,
  epicInsights: EpicInsight[]
): ProjectInsight[] {
  const insights: ProjectInsight[] = []

  // Check for too many epics in progress
  const inProgressEpics = epics.filter((epic) => epic.status === 'in-progress')
  if (inProgressEpics.length > ANALYTICS_CONFIG.MAX_CONCURRENT_EPICS) {
    insights.push({
      id: generateProjectInsightId(project.id, 'too-many-active-epics'),
      severity: 'warning',
      context: 'project',
      entityId: project.id,
      type: 'TooManyEpicsInsight',
      metadata: {
        activeEpicsCount: inProgressEpics.length,
        maxRecommended: ANALYTICS_CONFIG.MAX_CONCURRENT_EPICS,
        activeEpics: inProgressEpics.map((e) => ({ id: e.id, name: e.name })),
      },
    })
  }

  // Check project budget status
  const percentageUsed = totalCost / project.budget
  if (percentageUsed >= ANALYTICS_CONFIG.BUDGET_CRITICAL_THRESHOLD) {
    insights.push({
      id: generateProjectInsightId(project.id, 'budget-critical'),
      severity: 'critical',
      context: 'project',
      entityId: project.id,
      type: 'ProjectBudgetInsight',
      metadata: {
        percentageUsed,
        budget: project.budget,
        totalCost,
        remaining: project.budget - totalCost,
        projectName: project.name,
      },
    })
  } else if (percentageUsed >= ANALYTICS_CONFIG.BUDGET_WARNING_THRESHOLD) {
    insights.push({
      id: generateProjectInsightId(project.id, 'budget-warning'),
      severity: 'warning',
      context: 'project',
      entityId: project.id,
      type: 'ProjectBudgetInsight',
      metadata: {
        percentageUsed,
        budget: project.budget,
        totalCost,
        remaining: project.budget - totalCost,
        projectName: project.name,
      },
    })
  }

  // Check employee task load
  const employeeTaskCount = new Map<string, number>()
  tasks.forEach((task) => {
    if (task.assignedEmployeeIds) {
      task.assignedEmployeeIds.forEach((employeeId) => {
        employeeTaskCount.set(employeeId, (employeeTaskCount.get(employeeId) || 0) + 1)
      })
    }
  })

  employeeTaskCount.forEach((taskCount, employeeId) => {
    if (taskCount >= ANALYTICS_CONFIG.TASKS_PER_EMPLOYEE_CRITICAL) {
      insights.push({
        id: generateProjectInsightId(project.id, `employee-overload-${employeeId}`),
        severity: 'critical',
        context: 'project',
        entityId: project.id,
        type: 'EmployeeLoadInsight',
        metadata: {
          employeeId,
          taskCount,
          threshold: ANALYTICS_CONFIG.TASKS_PER_EMPLOYEE_CRITICAL,
        },
      })
    } else if (taskCount >= ANALYTICS_CONFIG.TASKS_PER_EMPLOYEE_WARNING) {
      insights.push({
        id: generateProjectInsightId(project.id, `employee-high-load-${employeeId}`),
        severity: 'warning',
        context: 'project',
        entityId: project.id,
        type: 'EmployeeLoadInsight',
        metadata: {
          employeeId,
          taskCount,
          threshold: ANALYTICS_CONFIG.TASKS_PER_EMPLOYEE_WARNING,
        },
      })
    }
  })

  // Process pre-calculated epic insights
  const criticalIssues: EpicInsight[] = epicInsights.filter((issue) => issue.severity === 'critical')
  const warningIssues: EpicInsight[] = epicInsights.filter((issue) => issue.severity === 'warning')

  if (criticalIssues.length > 0) {
    insights.push({
      id: generateProjectInsightId(project.id, 'epic-critical-issues'),
      severity: 'critical',
      context: 'project',
      entityId: project.id,
      type: 'ProjectEpicIssuesInsight',
      metadata: {
        epicIssues: criticalIssues,
        issueCount: criticalIssues.length,
        affectedEpics: criticalIssues
      },
    })
  }

  if (warningIssues.length > 0) {
    insights.push({
      id: generateProjectInsightId(project.id, 'epic-warning-issues'),
      severity: 'warning',
      context: 'project',
      entityId: project.id,
      type: 'ProjectEpicIssuesInsight',
      metadata: {
        epicIssues: warningIssues,
        issueCount: warningIssues.length,
        affectedEpics: warningIssues
      },
    })
  }

  return insights
} 