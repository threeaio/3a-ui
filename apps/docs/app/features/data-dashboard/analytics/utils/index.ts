
// Helper Functions
export function generateTaskInsightId(entityId: string, issue: string): string {
  return `task-${entityId}-${issue}`
}

export function generateEpicInsightId(entityId: string, issue: string): string {
  return `epic-${entityId}-${issue}`
}

export function generateProjectInsightId(entityId: string, issue: string): string {
  return `project-${entityId}-${issue}`
} 