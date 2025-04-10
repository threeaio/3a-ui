'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@3a-ui/ui/card'
import { Accordion } from '@3a-ui/ui/accordion'
import { EpicTaskGroup } from './epic-task-group'
import { TaskItem } from './task-details/task'
import { useTasksData } from '../../data-context/tasks-data-provider'
import { EpicsTasksHeader } from './epic-tasks-header'

function TasksPageContent() {
  const { epics, getTasksByEpic, orphanedTasks } = useTasksData()

  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full px-5 pt-10 gap-5 pb-5">
        {/* Filters and sorting */}
        <EpicsTasksHeader />

        {/* Epic groups */}
        {epics.map((epic) => (
          <EpicTaskGroup key={epic.id} epic={epic} tasks={getTasksByEpic(epic.id)} />
        ))}

        {/* Orphaned tasks */}
        {orphanedTasks.length > 0 && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="font-normal my-5">Other Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {orphanedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

export default function TasksPage() {
  return <TasksPageContent />
}
