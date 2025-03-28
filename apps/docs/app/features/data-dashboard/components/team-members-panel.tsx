'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { Badge } from '@3a.solutions/ui/badge'
import { ChevronRight, Calendar, ClipboardList, User } from 'lucide-react'
import { getTasksByAssignee } from '../data-context/mock-data'
import { useTeamData } from '../data-context/data-provider'
import { getStatusBadgeColor } from '../utils/badge-colors'

const TeamMembersPanel: React.FC = () => {
  const [expandedMember, setExpandedMember] = useState<string | null>(null)
  const { teamMembers } = useTeamData()

  const toggleMemberExpansion = (userId: string) => {
    setExpandedMember(expandedMember === userId ? null : userId)
  }

  return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => {
              const memberTasks = getTasksByAssignee(member.id)
              const activeTasks = memberTasks.filter((task) => task.status !== 'done')
              const completedTasks = memberTasks.filter((task) => task.status === 'done')
              const isExpanded = expandedMember === member.id

              return (
                <div key={member.id} className="bg-accent/20 rounded-lg overflow-hidden">
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleMemberExpansion(member.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="size-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right mr-2">
                        <p className="text-sm">
                          <span className="font-medium">{activeTasks.length}</span> active
                        </p>
                        <p className="text-xs text-muted-foreground">{completedTasks.length} completed</p>
                      </div>
                      <Badge variant="outline">{new Date(member.lastActive).toLocaleDateString()}</Badge>
                      <ChevronRight className={`size-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t">
                      <h4 className="text-sm font-medium mb-3">Assigned Tasks</h4>
                      {memberTasks.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No tasks assigned</p>
                      ) : (
                        <div className="space-y-2">
                          {memberTasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center justify-between bg-background p-3 rounded-md"
                            >
                              <div className="flex items-start gap-2">
                                <ClipboardList className="size-4 text-muted-foreground mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium">{task.title}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-muted-foreground flex items-center">
                                      <Calendar className="size-3 mr-1" />
                                      {new Date(task.dueDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <Badge className={`${getStatusBadgeColor(task.status)}`}>
                                {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
  )
}

export default TeamMembersPanel
