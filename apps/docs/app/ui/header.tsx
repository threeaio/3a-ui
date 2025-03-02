import React from 'react';
import Logo from './logo';
import ThemeSwitcher from './theme-switcher';
import SearchInput from './search-input';

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
        <div className="-ml-px flex grow xl:w-58 xl:grow-0 items-center justify-center gap-4 border-r py-4 pr-6  xl:w- ">
          <Logo href="/" />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end p-4 xl:grow">
          {/* Search Input Component */}
          {/* <SearchInput /> */}

          {/* Theme Switcher - Desktop */}
          <div className="hidden xl:block">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
