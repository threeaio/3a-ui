'use client'

import { Employee, ExpertiseDomain } from '@/features/data-dashboard/types/domain'
import { Card, CardContent, CardHeader, CardTitle } from '@3a-ui/ui/card'
import { Badge } from '@3a-ui/ui/badge'
import { Progress } from '@3a-ui/ui/progress'
import { cn } from '@3a.solutions/ui/lib/utils'
import { DOMAIN_COLORS, getDomainBadgeColor } from '@/features/data-dashboard/utils'

interface EmployeeSkillsSectionProps {
  employee: Employee
}

export function EmployeeSkillsSection({ employee }: EmployeeSkillsSectionProps) {
  // Group skills by expertise domain
  const skillsByDomain = employee.skills.reduce(
    (acc, skill) => {
      skill.relatedExpertiseDomains.forEach((domain) => {
        if (!acc[domain]) {
          acc[domain] = []
        }
        acc[domain].push(skill)
      })
      return acc
    },
    {} as Record<string, typeof employee.skills>,
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Object.entries(skillsByDomain)
        .sort(([, skillsA], [, skillsB]) => skillsB.length - skillsA.length)
        .map(([domain, skills]) => {
          const avgLevel = skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length
          return (
            <Card key={domain}>
              <CardHeader className="border-b !pb-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <span>{domain}</span>
                    <Badge variant="secondary">{skills.length} skills</Badge>
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{avgLevel.toFixed(1)}/5</span>
                  </div>
                </div>
                <Progress
                  value={avgLevel * 20}
                  classNameIndicator={cn(DOMAIN_COLORS[domain as ExpertiseDomain].bg)}
                  className={cn('h-2 mt-2')}
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">Level {skill.level}/5</span>
                      </div>
                      <Progress value={skill.level * 20} className="h-1" />
                      {skill.description && (
                        <p className="text-sm text-muted-foreground text-xs">{skill.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
