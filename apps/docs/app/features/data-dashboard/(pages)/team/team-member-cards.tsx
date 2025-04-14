'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@3a-ui/ui/card'
import { Badge } from '@3a-ui/ui/badge'
import { Employee } from '@/features/data-dashboard/types/domain'
import { cn } from '@3a-ui/ui/lib/utils'
import { TeamMemberWorkloadChart } from './team-member-workload-chart'
import { useProjectDataContext } from '@/features/data-dashboard/data-context/project-data-provider'
import { useTasksData } from '@/features/data-dashboard/data-context/tasks-data-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@3a-ui/ui/avatar'
import { Button } from '@3a-ui/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { sectionLabelClassName } from '@/ui/core-layout/section-label'
import { MetricValue } from '@/ui/core-layout/metric-value'
import { getDomainBadgeColor } from '@/features/data-dashboard/utils'

interface TeamMemberCardsProps {
  employee: Employee
  className?: string
}

export function TeamMemberCards({ employee, className }: TeamMemberCardsProps) {
  const { tasks } = useProjectDataContext()
  const { epics } = useTasksData()

  // Get tasks assigned to this employee
  const assignedTasks = tasks.filter((task) => task.assignedEmployeeIds.includes(employee.id) && task.status !== 'completed')

  // Get epics where the employee is assigned
  const assignedEpics = epics.filter((epic) => epic.assignedEmployeeIds.includes(employee.id) && epic.status !== 'completed') 

  // Get unique expertise domains
  const expertiseDomains = Array.from(new Set(employee.skills.flatMap((skill) => skill.relatedExpertiseDomains)))

  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader className="border-b">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={employee.avatar} />
            <AvatarFallback>{employee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-normal">{employee.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{employee.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-5 justify-between">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-muted-foreground">Assigned Tasks</p>
            <MetricValue value={assignedTasks.length.toString()} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Assigned Epics</p>
            <MetricValue value={assignedEpics.length.toString()} />
          </div>
        </div>

        {/* Expertise Domains */}
        <div>
          <h3 className={cn('mb-2 text-muted-foreground text-sm')}>Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {expertiseDomains.map((domain) => (
              <Badge key={domain} variant="secondary" className={getDomainBadgeColor(domain)}>
                {domain}
              </Badge>
            ))}
          </div>
        </div>

        {/* Workload Preview */}
        <div className="mt-5">
          <h3 className="text-muted-foreground text-sm mb-2">Workload</h3>
          <TeamMemberWorkloadChart employeeId={employee.id} />
        </div>
      </CardContent>
      <CardFooter className="border-t justify-end">
        <Link href={`/features/data-dashboard/team/${employee.id}`} className="">
          <Button variant="secondary" size="sm" className="w-full">
            <ArrowRightIcon className="size-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
