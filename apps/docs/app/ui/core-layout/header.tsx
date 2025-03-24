import React from 'react'
import Logo from './logo'
import ThemeSwitcher from './theme-switcher'
import { VisualizerToggleButton } from '../measure-visualizer/visualizer-toggle'

interface HeaderProps {
  className?: string
}

/**
 * TODO REFACTOR !
 */

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`z-100 fixed top-0 mx-auto w-full  md:sticky ${className}`}>
      <div className="border bg-background flex w-full  border-b justify-between">
        {/* Logo Section */}
        <div className="-ml-px flex w-30 xl:w-64 xl:grow-0 items-center justify-center xl:border-r">
          <Logo href="/" />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-between gap-4 px-5 h-20 xl:grow">
          {/* Visualizer Toggle Button */}
          <VisualizerToggleButton />

          {/* Search Input Component */}
          {/* <SearchInput /> */}

          {/* Theme Switcher - Desktop */}
          <div className="hidden xl:block">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
