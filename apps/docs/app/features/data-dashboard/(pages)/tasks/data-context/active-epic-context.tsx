'use client'

import { createContext, useContext, useState } from 'react'
import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'
import { useTasksData } from '../../../data-context/tasks-data-provider'
import { Task } from '@/features/data-dashboard/types/domain/task'

type ActiveEpicContextType = {
  activeEpicIds: Set<string>
  setEpicActive: (epicId: string, isActive: boolean) => void
  getEpicAssignees: (epicId: string) => { id: string; name: string; avatar?: string }[]
}

const ActiveEpicContext = createContext<ActiveEpicContextType | null>(null)

export function ActiveEpicProvider({ children }: { children: React.ReactNode }) {
  const [activeEpicIds, setActiveEpicIds] = useState<Set<string>>(new Set())
  const { getEmployeesByIds } = useEmployeeContext()
  const { getTasksByEpic } = useTasksData()

  const setEpicActive = (epicId: string, isActive: boolean) => {
    setActiveEpicIds((prev) => {
      const next = new Set(prev)
      if (isActive) {
        next.add(epicId)
      } else {
        next.delete(epicId)
      }
      return next
    })
  }

  const getEpicAssignees = (epicId: string) => {
    const tasks = getTasksByEpic(epicId)
    const assigneeIds = new Set(tasks.flatMap((task: Task) => task.assignedEmployeeIds))
    const employees = getEmployeesByIds([...assigneeIds])
    return employees.map(({ id, name, avatar }) => ({ id, name, avatar }))
  }

  return (
    <ActiveEpicContext.Provider
      value={{
        activeEpicIds,
        setEpicActive,
        getEpicAssignees,
      }}
    >
      {children}
    </ActiveEpicContext.Provider>
  )
}

export function useActiveEpic() {
  const context = useContext(ActiveEpicContext)
  if (!context) {
    throw new Error('useActiveEpic must be used within an ActiveEpicProvider')
  }
  return context
}
