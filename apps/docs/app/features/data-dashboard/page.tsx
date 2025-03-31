import React from 'react'
import { Metrics } from './components/widgets/top-metrics/metrics'

export default function DataDashboardPage() {
  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full p-5">
        <Metrics />
      </div>
    </main>
  )
}
