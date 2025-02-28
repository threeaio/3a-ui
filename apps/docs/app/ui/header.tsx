import React from 'react';
import { Search, Monitor, Sun, Moon } from 'lucide-react';
import Logo from './logo';

interface HeaderProps {
  className?: string;
}

/**
 * TODO REFACTOR !
 */

export const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`z-100 fixed top-0 mx-auto w-full  md:sticky ${className}`}>
      <div className="border bg-background flex w-full  border-b border-l border-r pl-6 ">
        {/* Logo Section */}
        <div className=" flex grow items-center gap-4 border-r py-4 pr-6  xl:w- xl:grow-0">
          <Logo href="/geist" />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-between p-4 xl:grow">
          {/* Search Button - Desktop */}
          <button
            className="hover:bg-background-200 focus-visible:shadow-focus-ring hidden h-8 w-[220px] cursor-pointer items-center justify-between rounded border border-gray-400 bg-transparent pl-2 pr-1.5 font-sans text-sm text-gray-700 outline-none xl:flex"
            type="button"
          >
            Search 3A
            <kbd className="rounded text-gray-900 min-w-[1em] px-1 py-0.5 text-xs bg-gray-100">
              <span style={{ minWidth: '1em', display: 'inline-block' }}>⌘</span>
              <span>K</span>
            </kbd>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="submit"
            aria-label="Open menu"
            className="!bg-transparent xl:hidden rounded-full p-2 hover:bg-gray-100"
          >
            <Search size={16} />
          </button>

          {/* Theme Switcher - Desktop */}
          <div className="hidden xl:block">
            <fieldset className="flex items-center border rounded-full p-1 bg-gray-50">
              <legend className="sr-only">Select a display theme:</legend>

              {/* System Theme */}
              <span className="h-full">
                <input aria-label="system" id="theme-switch-system" type="radio" value="system" className="sr-only" />
                <label
                  htmlFor="theme-switch-system"
                  className="flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-gray-200"
                >
                  <span className="sr-only">system</span>
                  <Monitor size={16} />
                </label>
              </span>

              {/* Light Theme */}
              <span className="h-full">
                <input
                  aria-label="light"
                  id="theme-switch-light"
                  type="radio"
                  value="light"
                  defaultChecked
                  className="sr-only"
                />
                <label
                  htmlFor="theme-switch-light"
                  className="flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-gray-200 bg-white"
                >
                  <span className="sr-only">light</span>
                  <Sun size={16} />
                </label>
              </span>

              {/* Dark Theme */}
              <span className="h-full">
                <input aria-label="dark" id="theme-switch-dark" type="radio" value="dark" className="sr-only" />
                <label
                  htmlFor="theme-switch-dark"
                  className="flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-gray-200"
                >
                  <span className="sr-only">dark</span>
                  <Moon size={16} />
                </label>
              </span>
            </fieldset>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
