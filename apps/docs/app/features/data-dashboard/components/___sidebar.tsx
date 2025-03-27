'use client'

import React from 'react'
import { BadgeSelect } from '@3a.solutions/ui/badge-select'
import { Badge } from '@3a.solutions/ui/badge'
import { Button } from '@3a.solutions/ui/button'
import { Switch } from '@3a.solutions/ui/switch'
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Users,
  BarChart2,
  Calendar,
  Settings,
  FileText,
  Clock,
} from 'lucide-react'
import { DashboardFilters } from './dashboard'

interface SidebarProps {
  timeRanges: { value: string; label: string }[]
  projectStatuses: { value: string; label: string }[]
  taskStatuses: { value: string; label: string }[]
  priorityLevels: { value: string; label: string }[]
  filters: DashboardFilters
  onFilterChange: (filterName: keyof DashboardFilters, value: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  timeRanges,
  projectStatuses,
  taskStatuses,
  priorityLevels,
  filters,
  onFilterChange,
}) => {
  return (
    <div className="h-full flex flex-col p-2 overflow-auto">
      {/* Navigation */}
      <nav className="space-y-1 mb-5">
        <NavItem icon={<LayoutDashboard className="size-4" />} label="Dashboard" active />
        <NavItem icon={<Briefcase className="size-4" />} label="Projects" count={5} />
        <NavItem icon={<CheckSquare className="size-4" />} label="Tasks" count={10} />
        <NavItem icon={<Users className="size-4" />} label="Team" />
        <NavItem icon={<BarChart2 className="size-4" />} label="Reports" />
        <NavItem icon={<Calendar className="size-4" />} label="Calendar" />
        <NavItem icon={<FileText className="size-4" />} label="Documents" />
        <NavItem icon={<Settings className="size-4" />} label="Settings" />
      </nav>

      <div className="h-px bg-border mb-5" />

      {/* Filters */}
      <div className="space-y-5">
        <h3 className="px-3  text-sm">Filters</h3>

        <div className="px-3 space-y-2">
          <div className="flex items-center justify-between">
            <BadgeSelect
              label="Time Period"
              options={timeRanges}
              value={filters.timeRange}
              onValueChange={(value) => onFilterChange('timeRange', value)}
              variant="outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <BadgeSelect
              label="Project Status"
              options={projectStatuses}
              value={filters.projectStatus}
              onValueChange={(value) => onFilterChange('projectStatus', value)}
              variant="outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <BadgeSelect
              label="Task Status"
              options={taskStatuses}
              value={filters.taskStatus}
              onValueChange={(value) => onFilterChange('taskStatus', value)}
              variant="outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <BadgeSelect
              label="Priority"
              options={priorityLevels}
              value={filters.priority}
              onValueChange={(value) => onFilterChange('priority', value)}
              variant="outline"
            />
          </div>
        </div>

        <div className="h-px bg-border my-5" />

        {/* Quick Settings */}
        <div className="px-3 space-y-2">
          <h3 className=" text-sm mb-2">Quick Settings</h3>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Show completed</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Only my tasks</span>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Group by project</span>
            <Switch />
          </div>
        </div>
      </div>

      <div className="mt-auto pt-5">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="size-4 text-muted-foreground" />
            <span className="text-sm">Time Tracking</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Track time spent on tasks and projects</p>
          <Button variant="outline" size="sm" className="w-full">
            Start Timer
          </Button>
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  active?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, count, active }) => {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
        active ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {count !== undefined && (
        <Badge variant={active ? 'default' : 'outline'} className="min-w-5 h-5 flex items-center justify-center">
          {count}
        </Badge>
      )}
    </div>
  )
}

export default Sidebar
