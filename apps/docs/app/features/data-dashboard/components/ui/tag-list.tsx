import React from 'react'
import { Badge } from '@3a.solutions/ui/badge'

interface TagListProps {
  tags: string[]
}

export const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge key={index} variant="outline">
          {tag}
        </Badge>
      ))}
      {tags.length === 0 && <span className="text-xs text-muted-foreground">No tags</span>}
    </div>
  )
}

export default TagList
