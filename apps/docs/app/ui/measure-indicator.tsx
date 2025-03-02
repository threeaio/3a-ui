import React from 'react';

export interface MeasureIndicatorProps {
  children: React.ReactNode;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  className?: string;
}

export const MeasureIndicator = ({ children, top, right, bottom, left, className = '' }: MeasureIndicatorProps) => {
  return (
    <div className={`relative ${className}`}>
      {children}

      {/* Top measurement */}
      {top && (
        <div className="absolute w-full -top-8 flex justify-center">
          <div className="relative w-full h-6 mb-1">
            <div className="absolute bottom-0 left-0 w-full h-4 border-t border-l border-r border-destructive/50 border-dashed"></div>
          </div>
          <span className="absolute -top-0.5 text-xs px-1.5 py-0.5 rounded bg-black text-white whitespace-nowrap">
            {top}
          </span>
        </div>
      )}

      {/* Right measurement */}
      {right && (
        <div className="absolute h-full -right-8 top-0">
          <div className="relative h-full w-6 ml-1">
            <div className="absolute top-0 left-0 w-4 h-full border-r border-t border-b border-destructive/50 border-dashed"></div>
          </div>
          <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 -rotate-90  text-xs px-1.5 py-0.5 rounded bg-black text-white whitespace-nowrap">
            {right}
          </span>
        </div>
      )}

      {/* Bottom measurement */}
      {bottom && (
        <div className="absolute w-full -bottom-8 flex justify-center">
          <div className="relative w-full h-6 mt-1">
            <div className="absolute top-0 left-0 w-full h-4 border-b border-l border-r border-destructive/50 border-dashed"></div>
          </div>
          <span className="absolute -bottom-0.5 text-xs px-1.5 py-0.5 rounded bg-black text-white whitespace-nowrap">
            {bottom}
          </span>
        </div>
      )}

      {/* Left measurement */}
      {left && (
        <div className="absolute top-0 h-full -left-8">
          <div className="relative h-full w-6 mr-1">
            <div className="absolute top-0 right-0 w-4 h-full border-l border-t border-b border-destructive/50 border-dashed"></div>
          </div>
          <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 text-xs -rotate-90 px-1.5 py-0.5 rounded bg-black text-white whitespace-nowrap">
            {left}
          </span>
        </div>
      )}
    </div>
  );
};
