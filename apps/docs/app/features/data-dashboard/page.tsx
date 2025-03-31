import React from 'react'
import { Metrics } from './components/widgets/top-metrics/metrics'
import { TaskStatusWidget } from './components/widgets/task-status-bar/task-status-widget'
export default function DataDashboardPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full p-5">
        <Metrics />
        <TaskStatusWidget className="h-40" />
      </div>
    </main>
  )
}
