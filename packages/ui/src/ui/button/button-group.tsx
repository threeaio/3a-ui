import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from './button';

interface ButtonGroupProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
  size?: VariantProps<typeof buttonVariants>['size'];
  variant?: VariantProps<typeof buttonVariants>['variant'] | 'primary';
}

function ButtonGroup({ className, children, size, variant, ...props }: ButtonGroupProps) {
  // Process children to modify their styling
  const childrenArray = React.Children.toArray(children);

  const processedChildren = childrenArray.map((child, index) => {
    // Skip non-element children
    if (!React.isValidElement(child)) return child;

    // Apply special styling to first and last buttons
    const isFirst = index === 0;
    const isLast = index === childrenArray.length - 1;

    // Type assertion for React element
    const buttonElement = child as React.ReactElement<{
      className?: string;
      size?: VariantProps<typeof buttonVariants>['size'];
      variant?: VariantProps<typeof buttonVariants>['variant'];
    }>;

    return React.cloneElement(buttonElement, {
      className: cn(
        buttonElement.props.className,
        // Remove border radius except on the ends
        'rounded-none',
        isFirst && 'rounded-l-md',
        isLast && 'rounded-r-md',
        // Remove borders between buttons
        !isLast && 'border-r-0',
        // Ensure focus ring doesn't break the connected appearance
        'focus-visible:relative focus-visible:z-10',
      ),
      // Pass down size and variant if not explicitly set on the button
      size: buttonElement.props.size || size,
      variant: buttonElement.props.variant || variant,
    });
  });

  return (
    <div className={cn('inline-flex', className)} {...props}>
      {processedChildren}
    </div>
  );
}

export { ButtonGroup };
