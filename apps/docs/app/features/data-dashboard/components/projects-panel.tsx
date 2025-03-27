'use client'

import React, { useState } from 'react'
import { Button } from '@3a.solutions/ui/button'
import { Badge } from '@3a.solutions/ui/badge'
import { BadgeSelect } from '@3a.solutions/ui/badge-select'
import { Progress } from '@3a.solutions/ui/progress'
import { Plus, FilterX, ChevronRight, Calendar, Users, Tags, DollarSign } from 'lucide-react'
import { DashboardFilters } from './dashboard'
import { projects, priorityLevels, projectStatuses } from '../mock-data'
import { TagList } from './ui/tag-list'
import { Code } from '@3a.solutions/ui/code'

interface ProjectsPanelProps {
  filters: DashboardFilters
}

const ProjectsPanel: React.FC<ProjectsPanelProps> = ({ filters }) => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  // Filter projects based on current filters
  const filteredProjects = projects.filter((project) => {
    if (filters.projectStatus !== 'all' && project.status !== filters.projectStatus) return false
    if (filters.priority !== 'all' && project.priority !== filters.priority) return false
    if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const expandProject = (projectId: string) => {
    setSelectedProject(selectedProject === projectId ? null : projectId)
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="">Projects</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterX className="size-4 mr-2" />
            Clear Filters
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="size-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No projects match the current filters</div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden">
              <div
                className="h-20 px-5 flex items-center justify-between cursor-pointer hover:bg-muted"
                onClick={() => expandProject(project.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <h3 className="">{project.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* <BadgeSelect
                    label="Status"
                    options={projectStatuses}
                    value={project.status}
                    variant={
                      project.status === 'completed'
                        ? 'primary'
                        : project.status === 'cancelled'
                          ? 'destructive'
                          : 'default'
                    }
                    disabled
                  /> */}

                  <BadgeSelect
                    label="Priority"
                    options={priorityLevels}
                    value={project.priority}
                    variant={
                      project.priority === 'critical'
                        ? 'destructive'
                        : project.priority === 'high'
                          ? 'secondary'
                          : 'outline'
                    }
                    disabled
                  />

                  <ChevronRight
                    className={`size-5 transition-transform ${selectedProject === project.id ? 'rotate-90' : ''}`}
                  />
                </div>
              </div>

              {selectedProject === project.id && (
                <div className="p-5 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <h4 className="text-sm  mb-3">Progress</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Completion</span>
                          <span className="text-sm">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>

                      <div className="mt-5">
                        <h4 className="text-sm mb-2">Tags</h4>
                        <TagList tags={project.tags} />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Calendar className="size-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">Timeline</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(project.startDate).toLocaleDateString()} -{' '}
                            {new Date(project.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Users className="size-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">Team Size</p>
                          <p className="text-sm text-muted-foreground">{project.teamSize} members</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <DollarSign className="size-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm">Budget</p>
                          <p className="text-sm text-muted-foreground">${project.budget.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Code
                    language="json"
                    code={JSON.stringify(
                      {
                        id: project.id,
                        name: project.name,
                        status: project.status,
                        priority: project.priority,
                        progress: project.progress,
                        team_size: project.teamSize,
                        tags: project.tags,
                      },
                      null,
                      2,
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectsPanel
