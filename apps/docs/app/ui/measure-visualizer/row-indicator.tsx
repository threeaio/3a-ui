'use client';

import React from 'react';
import { heightClasses } from '../../ui-config';
import { useVisualizer } from './visualizer-toggle';
import { DimensionIndicator } from './dimension-indicator';

interface RowVisualizerProps {
  rows: 0 | 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
}

export const RowVisualizer: React.FC<RowVisualizerProps> = ({ rows = 1, className = '', children }) => {
  // Get visibility from context
  const { visible } = useVisualizer();

  // Create an array of the specified length for rows
  const rowsArray = Array.from({ length: rows || 1 }, (_, i) => i);

  return (
    <div className={`relative ${className}`}>
      <DimensionIndicator left={heightClasses[rows]}>
        {/* The row overlay */}
        {/* The row overlay */}
        <div
          className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 delay-0 ease-in-out ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${rows || 1}, 1fr)`,
            gap: '1px',
          }}
        >
          {rowsArray.map((row) => (
            <div key={`row-${row}`} className="bg-destructive/10" />
          ))}
        </div>

        {/* The actual content */}
        <div className="relative z-10 h-full">{children}</div>
      </DimensionIndicator>
    </div>
  );
};
