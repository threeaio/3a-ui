'use client'

import React from 'react'
import MetricsPanel from './metrics-panel'
import ProjectPanel from './project-panel'
import TasksPanel from './tasks-panel'
import TeamMembersPanel from './team-members-panel'
import { useProjectData } from '../data-context'

const Dashboard: React.FC = () => {
  const { project } = useProjectData()

  return (
    <div className="flex flex-col">
      <div className="flex-1 flex">
        {/* Main Content Area */}
        <div className="flex-1 bg-background">
          <div className="flex flex-col h-full">
            {/* Metrics Panel */}
            <div className="mb-5">
              <MetricsPanel />
            </div>

            {/* Project Panel - Full Width */}
            <div className="mb-5">
              <ProjectPanel project={project} />
            </div>

            {/* Team Members and Tasks - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Team Members Panel */}
              <TeamMembersPanel />

              {/* Tasks Panel */}
              <TasksPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
