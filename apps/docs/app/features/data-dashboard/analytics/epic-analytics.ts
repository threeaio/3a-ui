import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { EpicInsight, TaskInsight } from './types/insights'
import { ANALYTICS_CONFIG, generateEpicInsightId } from './utils/common'

export function analyzeEpic(
  epic: Epic, 
  tasks: Task[], 
  totalCost: number,
  taskInsights: TaskInsight[]
): EpicInsight[] {
  const insights: EpicInsight[] = []

  // Check budget status
  const percentageUsed = totalCost / epic.budget
  if (percentageUsed >= ANALYTICS_CONFIG.BUDGET_CRITICAL_THRESHOLD) {
    insights.push({
      id: generateEpicInsightId(epic.id, 'budget-critical'),
      severity: 'critical',
      context: 'epic',
      entityId: epic.id,
      type: 'EpicBudgetInsight',
      metadata: {
        percentageUsed,
        budget: epic.budget,
        totalCost,
        remaining: epic.budget - totalCost,
      },
    })
  } else if (percentageUsed >= ANALYTICS_CONFIG.BUDGET_WARNING_THRESHOLD) {
    const remainingBudget = epic.budget - totalCost
    insights.push({
      id: generateEpicInsightId(epic.id, 'budget-warning'),
      severity: 'warning',
      context: 'epic',
      entityId: epic.id,
      type: 'EpicBudgetInsight',
      metadata: {
        percentageUsed,
        budget: epic.budget,
        totalCost,
        remaining: remainingBudget,
      },
    })
  }

  // Process pre-calculated task insights
  if (taskInsights.length > 0) {
    const criticalIssues: TaskInsight[] = taskInsights.filter((issue) => issue.severity === 'critical')
    const warningIssues: TaskInsight[] = taskInsights.filter((issue) => issue.severity === 'warning')

    if (criticalIssues.length > 0) {
      insights.push({
        id: generateEpicInsightId(epic.id, 'task-critical-issues'),
        severity: 'critical',
        context: 'epic',
        entityId: epic.id,
        type: 'EpicTaskIssuesInsight',
        metadata: {
          taskIssues: criticalIssues,
          issueCount: criticalIssues.length,
          affectedTasks: criticalIssues
        },
      })
    }

    if (warningIssues.length > 0) {
      insights.push({
        id: generateEpicInsightId(epic.id, 'task-warning-issues'),
        severity: 'warning',
        context: 'epic',
        entityId: epic.id,
        type: 'EpicTaskIssuesInsight',
        metadata: {
          taskIssues: warningIssues,
          issueCount: warningIssues.length,
          affectedTasks: warningIssues
        },
      })
    }
  }

  return insights
} 