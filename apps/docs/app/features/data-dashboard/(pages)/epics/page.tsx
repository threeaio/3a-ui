'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@3a-ui/ui/card'
import { Accordion } from '@3a-ui/ui/accordion'
import { EpicTaskGroup } from './epic-task-group'
import { TaskItem } from './task-details/task'
import { useTasksData } from '../../data-context/tasks-data-provider'
import { EpicsTasksHeader } from './epic-tasks-header'
import { EpicTaskGroupCards } from '@/features/data-dashboard/(pages)/epics/epic-task-group-cards'
import { useAutoAnimate } from '@formkit/auto-animate/react'

function TasksPageContent() {
  const { epics, getTasksByEpic, orphanedTasks } = useTasksData()
  const [parent] = useAutoAnimate(/* optional config */)

  return (
    <main className="flex-1 bg-background">
      <EpicsTasksHeader />
      <div className="flex flex-col h-full gap-5 p-5">
        {/* Filters and sorting */}

        {/* <div className="h-20 flex items-center justify-between">
          <h2 className=" font-semibold leading-none">Epics</h2>
        </div> */}

        {/* Epic groups */}
        <div ref={parent} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-fr">
          {epics.map((epic) => (
            <EpicTaskGroupCards className="h-120" key={epic.id} epic={epic} tasks={getTasksByEpic(epic.id)} />
          ))}
        </div>

        {/* Orphaned tasks */}
        {orphanedTasks.length > 0 && (
          <Card>
            <CardHeader className="border-b !pb-2.5">
              <CardTitle className="font-normal my-2.5">Other Tasks</CardTitle>
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
