'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { Badge } from '@3a.solutions/ui/badge'
import { Progress } from '@3a.solutions/ui/progress'
import { Project } from '../types'
import { format } from 'date-fns'
import { getStatusBadgeColor, getPriorityBadgeColor } from '../utils'

type ProjectPanelProps = {
  project: Project
}

const ProjectPanel: React.FC<ProjectPanelProps> = ({ project }) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy')
  }

  const getDaysRemaining = () => {
    const endDate = new Date(project.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const formatBudget = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Project Overview</CardTitle>
          <div className="flex gap-2">
            <Badge className={`${getStatusBadgeColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
            </Badge>
            <Badge className={`${getPriorityBadgeColor(project.priority)}`}>
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <h2 className="font-semibold mb-2">{project.name}</h2>
        <p className="text-muted-foreground mb-6">{project.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="">{formatDate(project.startDate)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">End Date</p>
            <p className="">{formatDate(project.endDate)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Days Remaining</p>
            <p className="">{getDaysRemaining()} days</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Team Size</p>
            <p className="">{project.teamSize} members</p>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-sm ">{project.progress}%</p>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="text-sm ">
                  {formatBudget(project.currentSpend)} / {formatBudget(project.budget)}
                </p>
              </div>
              <Progress value={(project.currentSpend / project.budget) * 100} className="h-2" />
            </div>
          </div> */}

        <div>
          <p className="text-sm text-muted-foreground mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectPanel
