// Analytics Types
export type AnalyticsSeverity = 'info' | 'warning' | 'critical'

// Task Insight Types
export type TaskInsightType = 'NoAssigneeTaskInsight' | 'HighPriorityNoAssigneeTaskInsight' | 'StaleTaskInsight'

// Epic Insight Types
export type EpicInsightType = 'EpicBudgetInsight' | 'EpicTaskIssuesInsight'

// Project Insight Types
export type ProjectInsightType = 'TooManyEpicsInsight' | 'ProjectBudgetInsight' | 'EmployeeLoadInsight' | 'ProjectEpicIssuesInsight'

// Combined Analytics Insight Types
export type AnalyticsInsightType = TaskInsightType | EpicInsightType | ProjectInsightType

interface BaseInsight {
  context: 'task' | 'epic' | 'project'
  type: unknown
  entityId: string
  severity: AnalyticsSeverity
}

// Task Insights
interface BaseTaskInsight extends BaseInsight {
  context: 'task'
  entityId: string
  type: TaskInsightType
  severity: AnalyticsSeverity
}

interface NoAssigneeTaskInsight extends BaseTaskInsight {
  id: string
  type: 'NoAssigneeTaskInsight'
  metadata: undefined
}

interface HighPriorityNoAssigneeTaskInsight extends BaseTaskInsight {
  id: string
  type: 'HighPriorityNoAssigneeTaskInsight'
  metadata: undefined
}

interface StaleTaskInsight extends BaseTaskInsight {
  id: string
  type: 'StaleTaskInsight'
  metadata: {
    daysSinceLastActive: number
    lastActiveDate: string
  }
}

export type TaskInsight = NoAssigneeTaskInsight | HighPriorityNoAssigneeTaskInsight | StaleTaskInsight

// Epic Insights
interface BaseEpicInsight extends BaseInsight {
  context: 'epic'
  entityId: string
  type: EpicInsightType
  severity: AnalyticsSeverity
}

export interface EpicBudgetInsight extends BaseEpicInsight {
  id: string
  type: 'EpicBudgetInsight'
  metadata: {
    percentageUsed: number
    budget: number
    totalCost: number
    remaining: number
  }
}

export interface EpicTaskIssuesInsight extends BaseEpicInsight {
  id: string
  type: 'EpicTaskIssuesInsight'
  metadata: {
    taskIssues: TaskInsight[]
    issueCount: number
    affectedTasks: TaskInsight[]
  }
}

export type EpicInsight = EpicBudgetInsight | EpicTaskIssuesInsight

// Project Insights
interface BaseProjectInsight extends BaseInsight {
  context: 'project'
  entityId: string
  type: ProjectInsightType
  severity: AnalyticsSeverity
}

interface TooManyEpicsInsight extends BaseProjectInsight {
  id: string
  type: 'TooManyEpicsInsight'
  metadata: {
    activeEpicsCount: number
    maxRecommended: number
    activeEpics: Array<{
      id: string
      name: string
    }>
  }
}

interface ProjectBudgetInsight extends BaseProjectInsight {
  id: string
  type: 'ProjectBudgetInsight'
  metadata: {
    percentageUsed: number
    budget: number
    totalCost: number
    remaining: number
    projectName: string
  }
}

interface EmployeeLoadInsight extends BaseProjectInsight {
  id: string
  type: 'EmployeeLoadInsight'
  metadata: {
    employeeId: string
    employeeName: string
    taskCount: number
    threshold: number
  }
}

interface ProjectEpicIssuesInsight extends BaseProjectInsight {
  id: string
  type: 'ProjectEpicIssuesInsight'
  metadata: {
    epicIssues: EpicInsight[]
    issueCount: number
    affectedEpics: Array<EpicInsight & { epicName: string }>
  }
}

export type ProjectInsight = TooManyEpicsInsight | ProjectBudgetInsight | EmployeeLoadInsight | ProjectEpicIssuesInsight

// Combined Analytics Insight Type
export type AnalyticsInsight = TaskInsight | EpicInsight | ProjectInsight

export interface BudgetStatus {
  status: 'healthy' | 'warning' | 'critical'
  percentageUsed: number
  remaining: number
} 