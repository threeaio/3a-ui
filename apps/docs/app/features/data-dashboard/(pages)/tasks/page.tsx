'use client'

import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { EpicTaskGroup } from './epic-task-group'
import { TaskCard } from './task-card'

export default function TasksPage() {
  const { epics, getTasksByEpic, tasks } = useProjectDataContext()

  // Group orphaned tasks (tasks without an epic)
  const orphanedTasks = tasks.filter((task) => !task.epicId)

  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full px-5 pt-10 gap-10">
        {/* Epic groups */}
        {epics.map((epic) => (
          <EpicTaskGroup key={epic.id} epic={epic} tasks={getTasksByEpic(epic.id)} />
        ))}

        {/* Orphaned tasks */}
        {orphanedTasks.length > 0 && (
          <div className="space-y-5">
            <h2 className="font-semibold">Other Tasks</h2>
            <div className="space-y-5">
              {orphanedTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
