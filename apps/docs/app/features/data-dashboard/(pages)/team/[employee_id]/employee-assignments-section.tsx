'use client'

import { Epic, Task } from '@/features/data-dashboard/types/domain'
import { Card, CardContent, CardHeader, CardTitle } from '@3a-ui/ui/card'
import { Badge } from '@3a-ui/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3a-ui/ui/accordion'
import { getStatusBadgeColor } from '@/features/data-dashboard/utils'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { Progress } from '@3a-ui/ui/progress'
import { TaskStatusWidget } from '@/features/data-dashboard/components/widgets/task-status-bar/task-status-widget'

interface EmployeeAssignmentsSectionProps {
  employeeId: string
  assignedTasks: Task[]
  assignedEpics: Epic[]
}

export function EmployeeAssignmentsSection({
  employeeId,
  assignedTasks,
  assignedEpics,
}: EmployeeAssignmentsSectionProps) {
  const { getEpicCost } = useTasksData()

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Epics Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Assigned Epics</CardTitle>
            <Badge variant="secondary">{assignedEpics.length} epics</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {assignedEpics.map((epic) => {
              const epicCost = getEpicCost(epic.id)
              const percentage = epic.budget ? Math.round((epicCost / epic.budget) * 100) : 0

              return (
                <AccordionItem key={epic.id} value={epic.id}>
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadgeColor(epic.status)}>{epic.status}</Badge>
                      <span>{epic.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <p className="text-sm text-muted-foreground">{epic.description}</p>

                      {/* Budget Progress */}
                      {epic.budget > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span>Budget Usage</span>
                            <span className={percentage > 100 ? 'text-destructive' : ''}>
                              {epicCost.toLocaleString('de-DE')} € / {epic.budget.toLocaleString('de-DE')} €
                            </span>
                          </div>
                          <Progress
                            value={percentage}
                            className={percentage > 100 ? 'bg-destructive/20' : undefined}
                            classNameIndicator={percentage > 100 ? 'bg-destructive' : undefined}
                          />
                        </div>
                      )}

                      {/* Task Status Distribution */}
                      <div className="pt-2">
                        <TaskStatusWidget size="sm" mode="epic" epicId={epic.id} showLegend={false} />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Tasks Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Assigned Tasks</CardTitle>
            <Badge variant="secondary">{assignedTasks.length} tasks</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {assignedTasks.map((task) => (
              <AccordionItem key={task.id} value={task.id}>
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusBadgeColor(task.status)}>{task.status}</Badge>
                    <span>{task.name}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <p className="text-sm text-muted-foreground">{task.description}</p>

                    {/* Task Type and Priority */}
                    <div className="flex gap-2">
                      <Badge variant="outline">{task.type}</Badge>
                      <Badge
                        variant="outline"
                        className={task.priority === 'critical' ? 'border-destructive text-destructive' : ''}
                      >
                        {task.priority}
                      </Badge>
                    </div>

                    {/* Expertise Domains */}
                    <div className="flex flex-wrap gap-2">
                      {task.relatedExpertiseDomains.map((domain) => (
                        <Badge key={domain} variant="secondary">
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
