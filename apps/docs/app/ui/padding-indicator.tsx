import React from 'react';
import { paddingClasses } from '../ui-config';

type LabelPosition = 'top' | 'right' | 'bottom' | 'left';

interface PaddingLabelProps {
  text: string;
  position: LabelPosition;
  className?: string;
  style?: React.CSSProperties;
}

const PaddingLabel = ({ text, position, className = '', style = {} }: PaddingLabelProps) => {
  // Base styles for all labels
  const baseStyles = 'text-[11px] rounded bg-destructive/50 text-white whitespace-nowrap absolute py-[0px] px-[5px]';

  // Apply different padding based on orientation
  // const paddingClass =
  //   position === 'left' || position === 'right'
  //     ? 'py-[1px] px-[5px]' // Vertical padding
  //     : 'px-[5px] pb-[1px]'; // Horizontal padding

  // Use fully inline styles for precise positioning
  let positionStyle: React.CSSProperties = {};

  switch (position) {
    case 'top':
      positionStyle = {
        top: '2px',
        left: '50%',
        transform: 'translateX(-50%)',
      };
      break;
    case 'right':
      // For right label, position it on the right edge with vertical text
      positionStyle = {
        top: '50%',
        right: '2px',
        transform: 'translateY(-50%)',
        writingMode: 'vertical-rl',
      };
      break;
    case 'bottom':
      positionStyle = {
        bottom: '2px',
        left: '50%',
        transform: 'translateX(-50%)',
      };
      break;
    case 'left':
      // For left label, position it on the left edge with vertical text
      positionStyle = {
        top: '50%',
        left: '2px',
        // Flip text for left side
        transform: 'translateY(-50%) rotate(180deg)',
        writingMode: 'vertical-rl',
      };
      break;
  }

  // Merge the position styles with any custom styles passed in
  const mergedStyles = { ...positionStyle, ...style };

  return (
    <span className={`${baseStyles} ${className}`} style={mergedStyles}>
      {text}
    </span>
  );
};

export interface PaddingIndicatorProps {
  children: React.ReactNode;
  paddingSize?: 1 | 2 | 3 | 4;
  paddingType?: 'full' | 'top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical';
  showLabels?: boolean;
  className?: string;
}

export const PaddingIndicator = ({
  children,
  paddingSize = 2,
  paddingType = 'full',
  showLabels = true,
  className = '',
}: PaddingIndicatorProps) => {
  // Get the appropriate padding class from the config
  const paddingClass = paddingClasses[paddingType][paddingSize];

  return (
    <div className={`relative ${className}`}>
      {/* The content with the actual padding applied */}
      {children}

      <div className="absolute inset-0">
        <div className={`w-full h-full  ${paddingClass}`}>
          <div className="w-full h-full border border-destructive/50 border-dashed"></div>
        </div>
      </div>
      {showLabels && (
        <>
          {/* Left padding indicator */}
          {(paddingType === 'full' || paddingType === 'left' || paddingType === 'horizontal') && (
            <PaddingLabel text={paddingClass} position="left" />
          )}

          {/* Top padding indicator */}
          {(paddingType === 'full' || paddingType === 'top' || paddingType === 'vertical') && (
            <PaddingLabel text={paddingClass} position="top" />
          )}

          {/* Right padding indicator */}
          {(paddingType === 'full' || paddingType === 'right' || paddingType === 'horizontal') && (
            <PaddingLabel text={paddingClass} position="right" />
          )}

          {/* Bottom padding indicator */}
          {(paddingType === 'full' || paddingType === 'bottom' || paddingType === 'vertical') && (
            <PaddingLabel text={paddingClass} position="bottom" />
          )}
        </>
      )}
    </div>
  );
};
