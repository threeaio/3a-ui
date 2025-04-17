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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@3a-ui/ui/tabs'
import { Badge } from '@3a-ui/ui/badge'
import { getDomainBadgeColor } from '@/features/data-dashboard/utils'

export function EmployeeDetailsContent({ employeeId }: { employeeId: string }) {
  const { getEmployeeById, getExpertiseDomainsByEmployeeId } = useEmployeeContext()
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
        <div className="grid grid-cols-2 w-full">
          <div className="flex items-center gap-2">
            <div className="w-20">
              <Link href="/features/data-dashboard/team">
                <Button variant="ghost" size="icon" className="p-3 size-12">
                  <ArrowLeft className="size-9" strokeWidth={1} />
                  <span className="sr-only">Back to Team</span>
                </Button>
              </Link>
            </div>
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
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          {getExpertiseDomainsByEmployeeId(employeeId).map((domain) => (
            <Badge key={domain} variant="secondary" className={getDomainBadgeColor(domain)}>
              {domain}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="flex items-center justify-center mb-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="project-metrics">Project Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <EmployeeSkillsSection employee={employee} />
        </TabsContent>

        <TabsContent value="project-metrics">
          <div className="grid grid-cols-2 gap-10 mb-10">
            <EmployeeWorkloadSection employeeId={employeeId} />
            <EmployeeWorkloadOverTimeSection employeeId={employeeId} />
          </div>
          <EmployeeAssignmentsSection
            employeeId={employeeId}
            assignedTasks={assignedTasks}
            assignedEpics={assignedEpics}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
