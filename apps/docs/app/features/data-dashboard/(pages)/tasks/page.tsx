'use client'

import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { EpicTaskGroup } from './epic-task-group'
import { TaskItem } from '@/features/data-dashboard/(pages)/tasks/task'
import { Accordion } from '@3a-ui/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@3a-ui/ui/card'
import { ActiveTaskProvider } from '@/features/data-dashboard/data-context/active-task-context'

export default function TasksPage() {
  const { epics, getTasksByEpic, tasks } = useProjectDataContext()

  // Group orphaned tasks (tasks without an epic)
  const orphanedTasks = tasks.filter((task) => !task.epicId)

  return (
    <ActiveTaskProvider>
      <main className="flex-1 bg-background">
        <div className="flex flex-col h-full px-5 pt-10 gap-5 pb-5">
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
    </ActiveTaskProvider>
  )
}
