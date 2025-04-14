'use client'

import { useEmployeeContext } from '@/features/data-dashboard/data-context/employee-provider'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { Button } from '@3a-ui/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@3a-ui/ui/avatar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { EmployeeSkillsSection } from './employee-skills-section'
import { EmployeeWorkloadSection } from './employee-workload-section'
import { EmployeeWorkloadOverTimeSection } from './employee-workload-over-time-section'
import { EmployeeAssignmentsSection } from './employee-assignments-section'

export function EmployeeDetailsContent({ employeeId }: { employeeId: string }) {
  const { getEmployeeById } = useEmployeeContext()
  const { tasks } = useProjectDataContext()
  const { epics } = useTasksData()

  const employee = getEmployeeById(employeeId)

  if (!employee) {
    return <div>Employee not found</div>
  }

  // Get tasks assigned to this employee
  const assignedTasks = tasks.filter((task) => task.assignedEmployeeIds.includes(employeeId))

  // Get epics where the employee is assigned
  const assignedEpics = epics.filter((epic) => epic.assignedEmployeeIds.includes(employeeId))

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div className="flex items-center h-40 justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="size-20">
            <AvatarImage src={employee.avatar} />
            <AvatarFallback>{employee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">{employee.name}</h1>
            </div>
            <div className="text-muted-foreground">{employee.email}</div>
          </div>
        </div>
        <div>
          <Link href="/features/data-dashboard/team">
            <Button variant="ghost">
              <ArrowLeft className="size-4" />
              Back to Team
            </Button>
          </Link>
        </div>
      </div>

      {/* Skills and Expertise Section */}
      {/* <div className="flex items-center h-20">
        <h2 className="">Skills and Expertise</h2>
      </div> */}

      <EmployeeSkillsSection employee={employee} />

      {/* Workload Analysis */}

      {/* <div className="flex items-center h-20">
        <h2 className="">Workload</h2>
      </div> */}
      <div className="grid grid-cols-2 gap-4">
        <EmployeeWorkloadSection employeeId={employeeId} />
        <EmployeeWorkloadOverTimeSection employeeId={employeeId} />
      </div>

      {/* Assignments Section */}
      {/* <div className="flex items-center h-20">
        <h2 className="">Assignments</h2>
      </div> */}
      <EmployeeAssignmentsSection employeeId={employeeId} assignedTasks={assignedTasks} assignedEpics={assignedEpics} />
    </div>
  )
}
