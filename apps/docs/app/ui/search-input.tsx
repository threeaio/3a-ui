import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className = '' }) => {
  return (
    <>
      {/* Search Button - Desktop */}
      <button
        className={`hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring hidden h-8 w-[220px] cursor-pointer items-center justify-between rounded-md border border-input bg-transparent pl-2 pr-1.5 font-sans text-sm text-foreground outline-none xl:flex ${className}`}
        type="button"
      >
        Search 3A
        <kbd className="rounded-sm bg-muted text-muted-foreground min-w-[1em] px-1 py-0.5 text-xs">
          <span style={{ minWidth: '1em', display: 'inline-block' }}>⌘</span>
          <span>K</span>
        </kbd>
      </button>

      {/* Mobile Search Button */}
      <button
        type="submit"
        aria-label="Open search"
        className="bg-transparent xl:hidden rounded-full p-2 hover:bg-muted"
      >
        <Search size={16} className="text-foreground" />
      </button>
    </>
  );
};

export default SearchInput;
