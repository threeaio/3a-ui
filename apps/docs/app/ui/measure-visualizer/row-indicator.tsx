'use client';

import React from 'react';
import { heightClasses } from '../../ui-config';
import { useVisualizer } from './visualizer-toggle';

interface RowVisualizerProps {
  rows: 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
}

export const RowVisualizer: React.FC<RowVisualizerProps> = ({ rows = 1, className = '', children }) => {
  // Get visibility from context
  const { visible } = useVisualizer();

  // Create an array of the specified length for rows
  const rowsArray = Array.from({ length: rows }, (_, i) => i);

  return (
    <div className={`relative ${className}`}>
      {/* Left measurement */}
      <div
        className={`absolute h-full -left-8 transition-opacity duration-300 ease-in-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 text-xs -rotate-90 px-1.5 py-0.5 rounded bg-black text-white whitespace-nowrap">
          {heightClasses[rows]}
        </span>
      </div>

      {/* The row overlay */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 ease-in-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '1px',
        }}
      >
        {rowsArray.map((row) => (
          <div key={`row-${row}`} className="bg-destructive/10" />
        ))}
      </div>

      {/* The actual content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
