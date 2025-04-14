'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'
import { TeamMemberCards } from './team-member-cards'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'

function TeamPageContent() {
  const { employees } = useEmployeeContext()
  const { epics, tasks } = useProjectDataContext()
  const [parent] = useAutoAnimate(/* optional config */)

  const employeesWithEpicsOrTasks = employees.filter((employee) => {
    const isAssignedToEpics = epics.some((epic) => epic.assignedEmployeeIds.includes(employee.id))
    const isAssignedToTasks = tasks.some((task) => task.assignedEmployeeIds.includes(employee.id))
    return isAssignedToEpics || isAssignedToTasks
  })

  const employeesWithoutEpicsOrTasks = employees.filter((employee) => {
    const isAssignedToEpics = epics.some((epic) => epic.assignedEmployeeIds.includes(employee.id))
    const isAssignedToTasks = tasks.some((task) => task.assignedEmployeeIds.includes(employee.id))
    return !isAssignedToEpics && !isAssignedToTasks
  })

  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full gap-5 p-5">
        <div ref={parent} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-fr">
          {employeesWithEpicsOrTasks.map((employee) => (
            <TeamMemberCards key={employee.id} employee={employee} />
          ))}
        </div>
        <div>
          {employeesWithoutEpicsOrTasks.length > 0 && (
            <>
              <div className="flex items-center h-20 border-t mt-5">
                <h2>Employees without Epics or Tasks</h2>
              </div>

              <div ref={parent} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 auto-rows-fr">
                {employeesWithoutEpicsOrTasks.map((employee) => (
                  <TeamMemberCards key={employee.id} employee={employee} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default function TeamPage() {
  return <TeamPageContent />
}
