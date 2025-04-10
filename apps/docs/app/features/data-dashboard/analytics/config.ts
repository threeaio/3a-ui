// Configuration Constants
export const ANALYTICS_CONFIG = {
    TASKS_PER_EMPLOYEE_WARNING: 5,
    TASKS_PER_EMPLOYEE_CRITICAL: 8,
    BUDGET_WARNING_THRESHOLD: 0.8, // 80% of budget used
    BUDGET_CRITICAL_THRESHOLD: 1.000001, // 100% of budget used
    MAX_CONCURRENT_EPICS: 3,
    TASK_STALE_DAYS: 7, // Number of days without progress to consider a task stale
  } as const