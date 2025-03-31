'use client'

import React from 'react'
import { Card } from '@3a.solutions/ui/card'
import { Box, ArrowDownRight, ArrowUpRight } from 'lucide-react' // Added trend icons
import { EpicDetail, Task, useEpicDetails, useTasksData } from '../../../data-context'
import { Skeleton } from '@3a.solutions/ui/skeleton'
import { Progress } from '@3a.solutions/ui/progress'

// Helper to format currency
const formatCurrency = (value: number) => {
  return value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}

export const EpicCostCard: React.FC = () => {
  const epicDetails: EpicDetail[] = useEpicDetails()
  const { tasks } = useTasksData()
  // Find the most recently completed epic
  const lastCompletedEpic = epicDetails?.find((epic) => epic.isCompleted)

  const tasksInThisEpic = tasks.filter((task) => task.tags.includes(`epic:${lastCompletedEpic?.name}`))

  const tasksByTags = tasksInThisEpic.reduce(
    (acc, task) => {
      task.tags.forEach((tag) => {
        if (!tag.startsWith('epic:')) {
          acc[tag] = (acc[tag] || 0) + task.estimatedHours
        }
      })
      return acc
    },
    {} as Record<string, number>,
  )

  const renderContent = () => {
    if (!epicDetails) {
      return <Skeleton className="h-full w-full" /> // Adjusted skeleton size
    }

    if (!lastCompletedEpic) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Box className="size-6 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No epics completed yet.</p>
        </div>
      )
    }

    const costDifference = lastCompletedEpic.totalCost - lastCompletedEpic.estimatedCost
    const isOverBudget = costDifference > 0

    return (
      <>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <Box className="size-4" />
            <span className="text-sm">Last Completed Epic Breakdown</span>
          </div>
          {/* Optional: Add date completed? lastCompletedEpic.lastDueDate?.toLocaleDateString() */}
        </div>

        <div className="flex flex-col">
          {/* Epic Details */}
          <div className="grid grid-cols-3 gap-5">
            <div className="flex col-span-2 flex-col gap-1 border-r pb-5">
              <h3 className="text-lg  truncate " title={lastCompletedEpic.name}>
                {lastCompletedEpic.name}
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl">
                This Epic was completed on{' '}
                <span className="font-bold">{lastCompletedEpic.lastDueDate?.toLocaleDateString('de-DE')}</span>. It was
                about creating the foundations in design and data-structure for the analytics dashboard. While being a
                bit over budget it was completed in time. Customer appreciated the work and the feedback was positive.
              </p>
            </div>
            <div className="flex flex-col gap-2 pb-5">
              {Object.entries(tasksByTags).map(([tag, hours]) => {
                const hoursMax = Math.max(...Object.values(tasksByTags))
                const hoursPercentage = (hours / hoursMax) * 100
                return (
                  <dl className="grid grid-cols-12 justify-between gap-2" key={tag}>
                    <dt className="col-span-2 text-xs text-muted-foreground w-40">{tag}</dt>
                    <dd className="col-span-10 w-full flex flex-row gap-1 items-center">
                      <Progress value={hoursPercentage} />
                      <span className="text-xs font-mono tabular-nums w-10 text-right">{hours} h</span>
                    </dd>
                  </dl>
                )
              })}
            </div>
          </div>

          {/* Costs */}
          {/* Actual Cost */}
          <div className="grid grid-cols-3 gap-5 border-t">
            <div className="flex flex-col  gap-1 items-start justify-between border-r pt-5">
              <span className="text-xs text-muted-foreground ml-1">Actual</span>
              <span className="text-4xl font-extralight font-mono tabular-nums">
                {formatCurrency(lastCompletedEpic.totalCost)}
              </span>
            </div>

            <div className="flex flex-col gap-1 items-start justify-between border-r pt-5">
              <span className="text-xs text-muted-foreground ml-1">Estimated</span>
              <span className="text-4xl font-extralight font-mono tabular-nums text-muted-foreground">
                {formatCurrency(lastCompletedEpic.estimatedCost)} est.
              </span>
            </div>

            <div className="flex flex-col items-start justify-end pt-5">
              <div
                className={`flex items-center text-4xl font-extralight font-mono tabular-nums ${isOverBudget ? 'text-destructive' : 'text-green-600'}`}
              >
                {isOverBudget ? (
                  <ArrowUpRight className="size-10 mr-0.5" strokeWidth={1} />
                ) : (
                  <ArrowDownRight className="size-10 mr-0.5" strokeWidth={1} />
                )}
                {formatCurrency(Math.abs(costDifference))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return <Card className="p-5 h-auto flex flex-col justify-between">{renderContent()}</Card> // Adjusted padding
}
