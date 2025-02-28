'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define the navigation item type
interface NavItem {
  title: string;
  href: string;
}

// Define the navigation group type
interface NavGroup {
  title: string;
  items: NavItem[];
}

// Define the navigation data
const navigationGroups: NavGroup[] = [
  {
    title: 'Foundations',
    items: [{ title: 'Colors', href: '/components/colors' }],
  },
  {
    title: 'Components',
    items: [{ title: 'Buttons', href: '/components/buttons' }],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-64 xl:w-64 xl:grow-0 h-full border-r border-border bg-card flex flex-col">
      <div className="flex-1  overflow-y-auto p-4 text-sm">
        {navigationGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <h3 className="px-3 mt-5 mb-3 font-semibold">{group.title}</h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-1 rounded-md  ${
                        isActive ? 'bg-muted text-primary font-medium' : 'text-foreground hover:bg-accent/50'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
