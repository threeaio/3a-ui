'use client'

import React, { useState } from 'react'
import Header from './header'
import Sidebar from './___sidebar'
import ProjectsPanel from './projects-panel'
import TasksPanel from './tasks-panel'
import MetricsPanel from './metrics-panel'
import { priorityLevels, projectStatuses, taskStatuses, timeRanges } from '../mock-data'

export type DashboardFilters = {
  timeRange: string
  projectStatus: string
  taskStatus: string
  priority: string
  search: string
}

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<DashboardFilters>({
    timeRange: 'month',
    projectStatus: 'all',
    taskStatus: 'all',
    priority: 'all',
    search: '',
  })

  const handleFilterChange = (filterName: keyof DashboardFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }))
  }

  const handleSearchChange = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }))
  }

  return (
    <div className="flex flex-col ">
      <div className="flex-1 flex ">
        {/* Main Content Area */}
        <div className="flex-1 bg-background min-h-0 overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Metrics Panel - 25% height */}
            <div className="mb-10">
              <MetricsPanel />
            </div>

            {/* Projects and Tasks - 75% height */}
            <div className="grid grid-cols-2 gap-10">
              {/* Projects Panel - 50% width */}
              <ProjectsPanel filters={filters} />

              {/* Tasks Panel - 50% width */}
              <TasksPanel filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
