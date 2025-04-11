import { useMemo } from 'react'
import { Accordion, AccordionContent, AccordionItem } from '@3a.solutions/ui/accordion'
import { useTasksData } from '../../../data-context/tasks-data-provider'
import { EpicTaskDistribution } from './epic-task-distribution'
import { EpicDetailsProps } from './epic-details'
import { Badge } from '@3a.solutions/ui/badge'

export function EpicDetailsPlanned({ epic, isOpen, onOpenChange }: EpicDetailsProps) {
  const { getTasksByEpic } = useTasksData()

  // Get tasks for this epic
  const epicTasks = useMemo(() => getTasksByEpic(epic.id), [epic.id, getTasksByEpic])

  // Calculate domain expertise requirements
  const domainExpertiseNeeded = useMemo(() => {
    const domains = new Map<string, number>()
    epicTasks.forEach((task) => {
      task.relatedExpertiseDomains.forEach((domain) => {
        domains.set(domain, (domains.get(domain) || 0) + 1)
      })
    })
    return Array.from(domains.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([domain, count]) => ({ domain, count }))
  }, [epicTasks])

  // Collect unique tags from all tasks
  const taskTags = useMemo(() => {
    const tags = new Map<string, number>()
    epicTasks.forEach((task) => {
      task.tags.forEach((tag) => {
        tags.set(tag, (tags.get(tag) || 0) + 1)
      })
    })
    return Array.from(tags.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }))
  }, [epicTasks])

  return (
    <Accordion
      type="single"
      value={isOpen ? 'details' : ''}
      onValueChange={(value) => onOpenChange(value === 'details')}
    >
      <AccordionItem value="details" className="border-none mt-5">
        <AccordionContent>
          <div className="py-7.5 px-5">
            <div className="grid grid-cols-12 gap-5">
              {/* Budget Overview */}
              <div className="col-span-4 pr-10 border-r">
                <h3 className="font-medium mb-4">Budget Overview</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Budget:</span>
                    <span className="font-mono">{epic.budget.toLocaleString('de-DE')} €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tasks Planned:</span>
                    <span>{epicTasks.length}</span>
                  </div>
                </div>
              </div>

              {/* Domain Expertise Requirements */}
              <div className="col-span-4 border-r">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Required Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {domainExpertiseNeeded.map(({ domain, count }) => (
                        <Badge key={domain} variant="default" className="text-xs">
                          {domain} ({count})
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {taskTags.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-4">Task Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {taskTags.map(({ tag, count }) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag} ({count})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Task Distribution */}
              <div className="col-span-4">
                <EpicTaskDistribution tasks={epicTasks} />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
