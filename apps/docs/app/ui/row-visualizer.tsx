import React from 'react';
import { heightClasses } from '../ui-config';
import { MeasureIndicator } from './measure-indicator';

interface RowVisualizerProps {
  rows: 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
}

export const RowVisualizer: React.FC<RowVisualizerProps> = ({ rows = 1, className = '', children }) => {
  // Create an array of the specified length for rows
  const rowsArray = Array.from({ length: rows }, (_, i) => i);

  return (
    <div className={`relative ${className}`}>
      <MeasureIndicator left={heightClasses[rows]}>
        {/* The row overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(${rows})`,
            gap: '1px',
          }}
        >
          {rowsArray.map((row) => (
            <div key={`row-${row}`} className="bg-destructive/10" />
          ))}
        </div>

        {/* The actual content */}
        <div className="relative z-10 h-full">{children}</div>
      </MeasureIndicator>
    </div>
  );
};
