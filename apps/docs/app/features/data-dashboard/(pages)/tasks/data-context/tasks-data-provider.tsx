import { ReactNode, createContext, useContext } from 'react'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { Epic, Task } from '@/features/data-dashboard/types/domain'

interface TasksDataContextValue {
  epics: Epic[]
  tasks: Task[]
  getTasksByEpic: (epicId: string) => Task[]
  orphanedTasks: Task[]
}

const TasksDataContext = createContext<TasksDataContextValue | undefined>(undefined)

export function TasksDataProvider({ children }: { children: ReactNode }) {
  const { epics, tasks, getTasksByEpic } = useProjectDataContext()

  // Get orphaned tasks (tasks without an epic)
  const orphanedTasks = tasks.filter((task) => !task.epicId)

  const value: TasksDataContextValue = {
    epics,
    tasks,
    getTasksByEpic,
    orphanedTasks,
  }

  return <TasksDataContext.Provider value={value}>{children}</TasksDataContext.Provider>
}

export function useTasksData() {
  const context = useContext(TasksDataContext)
  if (!context) {
    throw new Error('useTasksData must be used within a TasksDataProvider')
  }
  return context
}
