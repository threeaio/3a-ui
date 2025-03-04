'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Define the navigation item type
interface NavItem {
  title: string
  href: string
}

// Define the navigation group type
interface NavGroup {
  title: string
  items: NavItem[]
}

// Define the navigation data
const navigationGroups: NavGroup[] = [
  {
    title: 'Foundations',
    items: [
      { title: 'Colors', href: '/components/colors' },
      { title: 'Rhythm', href: '/components/rhythm' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Buttons', href: '/components/buttons' },
      { title: 'Badges', href: '/components/badges' },
      { title: 'Forms', href: '/components/forms' },
    ],
  },
  {
    title: 'Features',
    items: [{ title: 'Staff Scheduling', href: '/features/staff-scheduler' }],
  },
]

export const Sidebar: React.FC = () => {
  const pathname = usePathname()

  return (
    <nav className="w-64 xl:w-64 xl:grow-0 h-full border-r border-border bg-card flex flex-col">
      <div className="flex-1 overflow-y-auto p-2.5 text-sm">
        {navigationGroups.map((group) => (
          <div key={group.title} className="mb-10">
            <h3 className="px-3 mt-5 mb-3 font-semibold">{group.title}</h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`px-3 h-10 flex items-center rounded-md transition-colors duration-300  ${
                        isActive ? 'bg-secondary' : 'text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}

export default Sidebar
