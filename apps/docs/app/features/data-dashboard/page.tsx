import React from 'react'
import { Metrics } from './components/widgets/top-metrics/metrics'
import { TaskStatusWidget } from './components/widgets/task-status-bar/task-status-widget'
import { DomainTaskStatusStacked } from '@/features/data-dashboard/components/widgets/charts/domain-task-status-stacked'
import { DomainMetricsBar } from '@/features/data-dashboard/components/widgets/charts/domain-metrics-bar'
import { TaskTypeCostBar } from '@/features/data-dashboard/components/widgets/charts/task-type-cost-bar'
import { ProjectAnalyticsInsights } from '@/features/data-dashboard/components/project-analytics-insights'

export default function DataDashboardPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full p-5 gap-5">
        <Metrics />
        <div className="py-10">
          <TaskStatusWidget size="lg" />
        </div>
        <div className="grid grid-cols-3 gap-5 min-h-0 flex-1">
          <DomainTaskStatusStacked />
          <DomainMetricsBar />
          <TaskTypeCostBar />
        </div>
        <ProjectAnalyticsInsights />
      </div>
    </main>
  )
}
