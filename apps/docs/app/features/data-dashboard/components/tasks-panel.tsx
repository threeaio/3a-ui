'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@3a.solutions/ui/button'
import { Badge } from '@3a.solutions/ui/badge'
import { BadgeSelect } from '@3a.solutions/ui/badge-select'
import { Progress } from '@3a.solutions/ui/progress'
import {
  Plus,
  FilterX,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Tag,
  Link as LinkIcon,
  Clipboard,
  ChevronRight,
  Pencil,
  Trash,
} from 'lucide-react'
import {
  tasks as initialTasks,
  taskStatuses,
  priorityLevels,
  getAssigneeName,
  getProjectName,
  Task,
} from '../mock-data'
import { DashboardFilters } from './dashboard'
import { TagList } from './ui/tag-list'
import { TooltipWrapper } from './ui/tooltip-wrapper'
import { Code } from '@3a.solutions/ui/code'

interface TasksPanelProps {
  filters: DashboardFilters
}

const TasksPanel: React.FC<TasksPanelProps> = ({ filters }) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

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

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTask(selectedTask === taskId ? null : taskId)
  }

  const copyTaskId = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent expanding/collapsing when clicking copy button
    navigator.clipboard.writeText(taskId)
  }

  // Function to handle priority changes
  const handlePriorityChange = (taskId: string, newPriority: string) => {
    // Update tasks state with the new priority
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: newPriority as 'low' | 'medium' | 'high' | 'critical' } : task,
      ),
    )
  }

  // Function to handle status changes
  const handleStatusChange = (taskId: string, newStatus: string) => {
    // Update tasks state with the new status
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus as 'todo' | 'in-progress' | 'review' | 'done' } : task,
      ),
    )
  }

  // Function to handle clear filters
  const handleClearFilters = () => {
    // Implement filter clearing in a real app by calling a parent function
    console.log('Clearing filters')
  }

  // Function to add a new task (simplified for demo)
  const handleAddTask = () => {
    const today = new Date()
    const dueDate = new Date()
    dueDate.setDate(today.getDate() + 14) // Due in 2 weeks

    // Format date as YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    const newTask: Task = {
      id: `task-${tasks.length + 1}`,
      title: `New Task ${tasks.length + 1}`,
      description: 'A newly created task',
      status: 'todo',
      priority: 'medium',
      assignee: 'u1', // Assign to first user by default
      dueDate: formatDate(dueDate),
      projectId: 'p1', // Assign to first project by default
      tags: ['new'],
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
    // Auto-select the new task
    setSelectedTask(newTask.id)
  }

  // Function to mark task as complete
  const handleMarkComplete = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent expanding/collapsing when clicking button
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, status: 'done' } : task)))
  }

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="">Tasks ({filteredTasks.length})</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            <FilterX className="size-4 mr-2" />
            Clear Filters
          </Button>
          <Button size="sm" onClick={handleAddTask}>
            <Plus className="size-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">No tasks match the current filters</div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => {
            const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done'

            return (
              <div key={task.id} className="bg-card rounded-lg overflow-hidden">
                <div
                  className="py-5 px-5 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleTaskSelection(task.id)}
                >
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
                    {/* <BadgeSelect
                      label="Status"
                      options={taskStatuses}
                      value={task.status}
                      onValueChange={(newValue) => handleStatusChange(task.id, newValue)}
                      variant={
                        task.status === 'done'
                          ? 'primary'
                          : task.status === 'in-progress'
                            ? 'secondary'
                            : task.status === 'review'
                              ? 'default'
                              : 'outline'
                      }
                    /> */}

                    <BadgeSelect
                      label="Priority"
                      options={priorityLevels}
                      value={task.priority}
                      onValueChange={(newValue) => handlePriorityChange(task.id, newValue)}
                      variant={
                        task.priority === 'critical' ? 'destructive' : task.priority === 'high' ? 'default' : 'outline'
                      }
                    />

                    <ChevronRight
                      className={`size-5 transition-transform ${selectedTask === task.id ? 'rotate-90' : ''}`}
                    />
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
                          <h4 className="text-sm mb-2 flex items-center gap-2">
                            <Tag className="size-4" />
                            Tags
                          </h4>
                          <TagList tags={task.tags} />
                        </div>

                        <div>
                          <h4 className="text-sm mb-2">Task ID</h4>
                          <div className="flex items-center">
                            <code className="bg-muted px-3 py-1 rounded text-xs mr-2 font-mono">{task.id}</code>
                            <Button variant="ghost" size="icon" onClick={(e) => copyTaskId(task.id, e)}>
                              <Clipboard className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Code
                      language="json"
                      code={JSON.stringify(
                        {
                          id: task.id,
                          title: task.title,
                          status: task.status,
                          priority: task.priority,
                          assignee: getAssigneeName(task.assignee),
                          due_date: task.dueDate,
                          tags: task.tags,
                        },
                        null,
                        2,
                      )}
                    />

                    <div className="flex justify-end mt-5 gap-2">
                      <Button variant="outline" size="sm">
                        <Pencil className="size-4 mr-2" />
                        Edit Task
                      </Button>
                      {task.status !== 'done' ? (
                        <Button variant="primary" size="sm" onClick={(e) => handleMarkComplete(task.id, e)}>
                          Mark as Complete
                        </Button>
                      ) : (
                        <Button variant="destructive" size="sm">
                          <Trash className="size-4 mr-2" />
                          Delete Task
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
