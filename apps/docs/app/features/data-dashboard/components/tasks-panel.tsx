'use client'

import React, { useState } from 'react'
import { Button } from '@3a.solutions/ui/button'
import { BadgeSelect } from '@3a.solutions/ui/badge-select'
import { Plus, FilterX, AlertTriangle, User, Calendar, Tag, Link as LinkIcon, ChevronRight } from 'lucide-react'
import { taskStatusOptions, priorityLevels } from '../data-context/mock-data'
import { useTasksData, useFilterControls } from '../data-context'
import { TagList } from './ui/tag-list'
import { TooltipWrapper } from './ui/tooltip-wrapper'
import { TaskStatus, TaskPriority } from '../types'

const TasksPanel: React.FC = () => {
  const { tasks, updateTaskStatus, updateTaskPriority } = useTasksData()
  const { resetFilters } = useFilterControls()
  const [selectedTask, setSelectedTask] = useState<string | null>(null)

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTask(selectedTask === taskId ? null : taskId)
  }

  // Function to handle priority changes
  const handlePriorityChange = (taskId: string, newPriority: TaskPriority) => {
    updateTaskPriority(taskId, newPriority)
  }

  // Function to handle status changes
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    updateTaskStatus(taskId, newStatus)
  }

  // Function to add a new task (simplified for demo)
  const handleAddTask = () => {
    console.log('Adding new task')
    // In a real app, this would add through our context/API
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="">Tasks ({tasks.length})</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <FilterX className="size-4 mr-2" />
            Clear Filters
          </Button>
          <Button size="sm" onClick={handleAddTask}>
            <Plus className="size-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No tasks match the current filters</div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => {
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'
            const completedClass = task.status === 'done' ? 'opacity-70' : ''

            return (
              <div key={task.id} className={`bg-card rounded-lg overflow-hidden ${completedClass}`}>
                <div className="py-5 px-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
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
                      <p className="text-muted-foreground text-xs">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <BadgeSelect
                      label="Status"
                      options={taskStatusOptions}
                      value={task.status}
                      onValueChange={(newValue) => handleStatusChange(task.id, newValue as TaskStatus)}
                      variant={
                        task.status === 'done'
                          ? 'primary'
                          : task.status === 'in-progress'
                            ? 'secondary'
                            : task.status === 'review'
                              ? 'default'
                              : 'outline'
                      }
                    />

                    <BadgeSelect
                      label="Priority"
                      options={priorityLevels}
                      value={task.priority}
                      onValueChange={(newValue) => handlePriorityChange(task.id, newValue as TaskPriority)}
                      variant={
                        task.priority === 'critical' ? 'destructive' : task.priority === 'high' ? 'default' : 'outline'
                      }
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleTaskSelection(task.id)}
                      className=""
                    >
                      <ChevronRight
                        className={`size-5 transition-transform ${selectedTask === task.id ? 'rotate-90' : ''}`}
                      />
                    </Button>
                  </div>
                </div>

                {selectedTask === task.id && (
                  <div className="p-5 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <User className="size-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm ">Assignee</p>
                            <p className="text-sm text-muted-foreground">{task.assignee}</p>
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
                            <p className="text-sm ">Project</p>
                            <p className="text-sm text-muted-foreground">{task.projectId}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <h4 className="text-sm mb-2 flex items-center gap-2">
                            <Tag className="size-4" />
                            Tags
                          </h4>
                          <TagList tags={task.tags} />
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm">Estimate vs Actual</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-muted-foreground">Estimated</p>
                              <p className="text-sm">{task.estimatedHours || 0} hours</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Actual</p>
                              <p className="text-sm">{task.actualHours || 0} hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      {task.status !== 'done' && (
                        <Button size="sm" onClick={() => handleStatusChange(task.id, 'done')}>
                          Mark Complete
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
