import { cn } from '@3a-ui/ui/lib/utils';
import React from 'react';

interface StyleguideRenderProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  classNameContent?: string;
}

export const StyleguideRender: React.FC<StyleguideRenderProps> = ({
  children,
  label = 'Example',
  className,
  classNameContent,
}) => {
  return (
    <div className={cn('relative p-10 xl:p-20 mb-2 bg-muted rounded-md group border-border/10 border', className)}>
      {label && (
        <div className="absolute top-0 right-0 px-4 py-2 bg-background text-xs font-mono text-foreground rounded-bl-md rounded-tr-[.42rem] border-border/50  border-l border-b">
          {label}
        </div>
      )}
      <div className={classNameContent}>{children}</div>
    </div>
  );
};

export default StyleguideRender;
