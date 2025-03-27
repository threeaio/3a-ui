'use client'

import React, { useState } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@3a.solutions/ui/resizable'
import Header from './header'
import Sidebar from './sidebar'
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
    <div className="flex flex-col h-screen">
      <Header onSearchChange={handleSearchChange} />

      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="min-h-0 h-full w-full">
          {/* Sidebar */}
          <ResizablePanel defaultSize={15} minSize={10} maxSize={30} className="bg-background">
            <Sidebar
              timeRanges={timeRanges}
              projectStatuses={[{ value: 'all', label: 'All Projects' }, ...projectStatuses]}
              taskStatuses={[{ value: 'all', label: 'All Tasks' }, ...taskStatuses]}
              priorityLevels={[{ value: 'all', label: 'All Priorities' }, ...priorityLevels]}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Main Content Area */}
          <ResizablePanel defaultSize={85} className="bg-background min-h-0 overflow-hidden">
            <ResizablePanelGroup direction="vertical" className="h-full">
              {/* Metrics Panel */}
              <ResizablePanel defaultSize={25} minSize={15} className="overflow-auto">
                <MetricsPanel />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Projects and Tasks */}
              <ResizablePanel defaultSize={75} className="overflow-hidden min-h-0">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  {/* Projects Panel */}
                  <ResizablePanel defaultSize={50} className="overflow-auto">
                    <ProjectsPanel filters={filters} />
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* Tasks Panel */}
                  <ResizablePanel defaultSize={50} className="overflow-auto">
                    <TasksPanel filters={filters} />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

export default Dashboard
