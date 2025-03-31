import React from 'react'
import { Metrics } from './components/widgets/top-metrics/metrics'
import { TaskStatusWidget } from './components/widgets/task-status-bar/task-status-widget'
import { DomainCostRadar } from '@/features/data-dashboard/components/widgets/charts/domain-cost-radar'
import { DomainWorkloadRadar } from '@/features/data-dashboard/components/widgets/charts/domain-workload-radar'
import { DomainTaskCountRadar } from '@/features/data-dashboard/components/widgets/charts/domain-task-count-radar'
import { DomainTaskStatusStacked } from '@/features/data-dashboard/components/widgets/charts/domain-task-status-stacked'
import { DomainMetricsBar } from '@/features/data-dashboard/components/widgets/charts/domain-metrics-bar'
export default function DataDashboardPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full p-5">
        <Metrics />
        <TaskStatusWidget className="h-40" />
        <div className="grid grid-cols-2 gap-5">
          <DomainTaskStatusStacked />
          <DomainMetricsBar />
        </div>
      </div>
    </main>
  )
}
