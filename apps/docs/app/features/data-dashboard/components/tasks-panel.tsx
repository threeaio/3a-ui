'use client'

import React, { useState } from 'react'
import { Button } from '@3a.solutions/ui/button'
import { Badge } from '@3a.solutions/ui/badge'
import { BadgeSelect } from '@3a.solutions/ui/badge-select'
import { Plus, FilterX, Clock, AlertTriangle, User, Calendar, Tag, Link as LinkIcon, Clipboard } from 'lucide-react'
import { tasks, taskStatuses, priorityLevels, getAssigneeName, getProjectName } from '../mock-data'
import { DashboardFilters } from './dashboard'
import { TagList } from './ui/tag-list'
import { TooltipWrapper } from './ui/tooltip-wrapper'

interface TasksPanelProps {
  filters: DashboardFilters
}

const TasksPanel: React.FC<TasksPanelProps> = ({ filters }) => {
  const [expandedTasks, setExpandedTasks] = useState<string[]>([])

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter((task) => {
    if (filters.taskStatus !== 'all' && task.status !== filters.taskStatus) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.projectStatus !== 'all') {
      // This would need to check project status in a real app
      // For demo purposes, we'll just include all
    }
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const isTaskExpanded = (taskId: string) => expandedTasks.includes(taskId)

  const copyTaskId = (taskId: string) => {
    navigator.clipboard.writeText(taskId)
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="">Tasks</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <FilterX className="size-4 mr-2" />
            Clear Filters
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="size-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No tasks match the current filters</div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'
            const isExpanded = isTaskExpanded(task.id)

            return (
              <div key={task.id} className="border rounded-lg overflow-hidden">
                <div className="h-20 px-5 flex items-center gap-3 hover:bg-muted">
                  <div
                    className="flex-1 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleTaskExpansion(task.id)}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="">{task.title}</h3>
                        {isOverdue && (
                          <TooltipWrapper content="This task is overdue">
                            <span>
                              <AlertTriangle className="size-4 text-destructive" />
                            </span>
                          </TooltipWrapper>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* <BadgeSelect
                      label="Status"
                      options={taskStatuses}
                      value={task.status}
                      variant={
                        task.status === 'done'
                          ? 'primary'
                          : task.status === 'in-progress'
                            ? 'secondary'
                            : task.status === 'review'
                              ? 'default'
                              : 'outline'
                      }
                      disabled
                    /> */}

                    <BadgeSelect
                      label="Priority"
                      options={priorityLevels}
                      value={task.priority}
                      variant={
                        task.priority === 'critical'
                          ? 'destructive'
                          : task.priority === 'high'
                            ? 'secondary'
                            : 'outline'
                      }
                      disabled
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <User className="size-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm ">Assignee</p>
                            <p className="text-sm text-muted-foreground">{getAssigneeName(task.assignee)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Calendar className="size-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm ">Due Date</p>
                            <p className={`text-sm ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>
                              {new Date(task.dueDate).toLocaleDateString()}
                              {isOverdue && ' (Overdue)'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <LinkIcon className="size-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm ">Related Project</p>
                            <p className="text-sm text-muted-foreground">{getProjectName(task.projectId)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <h4 className="text-sm  mb-2 flex items-center gap-2">
                            <Tag className="size-4" />
                            Tags
                          </h4>
                          <TagList tags={task.tags} />
                        </div>

                        <div>
                          <h4 className="text-sm  mb-2">Task ID</h4>
                          <div className="flex items-center">
                            <code className="bg-muted px-3 py-1 rounded text-xs mr-2 font-mono">{task.id}</code>
                            <Button variant="ghost" size="icon" onClick={() => copyTaskId(task.id)}>
                              <Clipboard className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-5 gap-2">
                      <Button variant="outline" size="sm">
                        Open Details
                      </Button>
                      {task.status !== 'done' && (
                        <Button variant="primary" size="sm">
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default TasksPanel
