'use client';

import React from 'react';
import { useVisualizer } from './visualizer-toggle';

export interface DimensionIndicatorProps {
  children: React.ReactNode;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  className?: string;
}

interface MeasurementLabelProps {
  value: string;
  className: string;
}

const MeasurementLabel = ({ value, className }: MeasurementLabelProps) => (
  <span className={`text-xs px-1.5 py-0.5 rounded bg-black text-white whitespace-nowrap ${className}`}>{value}</span>
);

interface MeasurementContainerProps {
  visible: boolean;
  className: string;
  children: React.ReactNode;
}

const MeasurementContainer = ({ visible, className, children }: MeasurementContainerProps) => (
  <div
    className={`absolute transition-opacity duration-300 delay-100 ease-in-out ${
      visible ? 'opacity-100' : 'opacity-0'
    } ${className}`}
  >
    {children}
  </div>
);

interface MeasurementBorderProps {
  orientation: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

const MeasurementBorder = ({ orientation, className = '' }: MeasurementBorderProps) => {
  const borderClasses = {
    top: 'w-full h-6 mb-1 [&>div]:bottom-0 [&>div]:left-0 [&>div]:w-full [&>div]:h-4 [&>div]:border-t [&>div]:border-l [&>div]:border-r',
    right:
      'h-full w-6 ml-1 [&>div]:top-0 [&>div]:left-0 [&>div]:w-4 [&>div]:h-full [&>div]:border-r [&>div]:border-t [&>div]:border-b',
    bottom:
      'w-full h-6 mt-1 [&>div]:top-0 [&>div]:left-0 [&>div]:w-full [&>div]:h-4 [&>div]:border-b [&>div]:border-l [&>div]:border-r',
    left: 'h-full w-6 mr-1 [&>div]:top-0 [&>div]:right-0 [&>div]:w-4 [&>div]:h-full [&>div]:border-l [&>div]:border-t [&>div]:border-b',
  };

  return (
    <div className={`relative ${borderClasses[orientation]} ${className}`}>
      <div className="absolute border-foreground/50 border-dashed"></div>
    </div>
  );
};

export const DimensionIndicator = ({ children, top, right, bottom, left, className = '' }: DimensionIndicatorProps) => {
  const { visible } = useVisualizer();

  return (
    <div className={`relative ${className}`}>
      {children}

      {/* Top measurement */}
      {top && (
        <MeasurementContainer visible={visible} className="w-full -top-8 flex justify-center">
          <MeasurementBorder orientation="top" />
          <MeasurementLabel value={top} className="absolute -top-0.5" />
        </MeasurementContainer>
      )}

      {/* Right measurement */}
      {right && (
        <MeasurementContainer visible={visible} className="h-full -right-8 top-0">
          <MeasurementBorder orientation="right" />
          <MeasurementLabel value={right} className="absolute -right-2.5 top-1/2 -translate-y-1/2 -rotate-90" />
        </MeasurementContainer>
      )}

      {/* Bottom measurement */}
      {bottom && (
        <MeasurementContainer visible={visible} className="w-full -bottom-8 flex justify-center">
          <MeasurementBorder orientation="bottom" />
          <MeasurementLabel value={bottom} className="absolute -bottom-0.5" />
        </MeasurementContainer>
      )}

      {/* Left measurement */}
      {left && (
        <MeasurementContainer visible={visible} className="top-0 h-full -left-8">
          <MeasurementBorder orientation="left" />
          <MeasurementLabel value={left} className="absolute -left-2.5 top-1/2 -translate-y-1/2 -rotate-90" />
        </MeasurementContainer>
      )}
    </div>
  );
};
