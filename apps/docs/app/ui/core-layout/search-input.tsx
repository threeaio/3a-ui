import React from 'react'
import { Search } from 'lucide-react'
import { Button } from '@3a-ui/ui/button'
import { cn } from '@3a-ui/ui/lib/utils'

interface SearchInputProps {
  className?: string
}

export const SearchInput: React.FC<SearchInputProps> = ({ className = '' }) => {
  return (
    <>
      {/* Search Button - Desktop */}
      <Button type="button" variant="outline" className={cn('hidden cursor-pointer xl:flex pr-2', className)}>
        Search 3A
        <kbd className="rounded-sm bg-muted text-muted-foreground min-w-[1em] ml-24 px-1 py-0.5 text-xs">
          <span style={{ minWidth: '1em', display: 'inline-block' }}>⌘</span>
          <span>K</span>
        </kbd>
      </Button>

      {/* Mobile Search Button */}
      <button
        type="submit"
        aria-label="Open search"
        className="bg-transparent xl:hidden rounded-full p-2 hover:bg-muted"
      >
        <Search size={16} className="text-foreground" />
      </button>
    </>
  )
}

export default SearchInput
