import React from 'react';
import { StyleguideSection } from '../../ui/styleguide-section';
import { StyleguideRender } from '../../ui/styleguide-render';
import { StyleguideExplanation } from '../../ui/styleguide-explanation';

interface RowVisualizerProps {
  rows: 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
}

const RowVisualizer: React.FC<RowVisualizerProps> = ({ rows = 1, className = '', children }) => {
  // Create an array of the specified length for rows
  const rowsArray = Array.from({ length: rows }, (_, i) => i);

  // Calculate the container height class based on the number of rows
  const getContainerHeightClass = () => {
    switch (rows) {
      case 1:
        return 'h-20';
      case 2:
        return 'h-40';
      case 3:
        return 'h-60';
      case 4:
        return 'h-80';
      default:
        return 'h-20';
    }
  };

  const containerHeightClass = getContainerHeightClass();

  return (
    <div className={`relative ${containerHeightClass} ${className}`}>
      {/* The row overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${rows}, 5rem)`,
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

const RowSystemExplanation: React.FC = () => {
  const heightClasses = {
    1: 'h-20',
    2: 'h-40',
    3: 'h-60',
    4: 'h-80',
  };

  return (
    <>
      <h3 className="text-lg font-medium mb-2">Row System</h3>
      <p className="mb-4">
        The row system provides a consistent vertical rhythm for your layouts. Each row has a height of 5rem (h-20) with
        a 1px gap between rows.
      </p>

      <h4 className="text-md font-medium mb-2">Available Row Heights</h4>
      <ul className="list-disc pl-6 mb-4">
        {Object.entries(heightClasses).map(([rows, heightClass]) => (
          <li key={rows}>
            <code className="bg-muted px-1 py-0.5 rounded text-sm">
              {rows} row{Number(rows) > 1 ? 's' : ''}
            </code>
            : {heightClass} ({Number(rows) * 5}rem)
          </li>
        ))}
      </ul>

      <h4 className="text-md font-medium mb-2">Usage</h4>
      <p>
        Use the row system to create consistent vertical spacing in your layouts. The visualizer helps you see how
        content fits within the row constraints.
      </p>
    </>
  );
};

const GridShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Row System" subline="Constraints using rows">
      <StyleguideExplanation>
        <RowSystemExplanation />
      </StyleguideExplanation>

      <StyleguideRender label="Single Row">
        <RowVisualizer rows={1} className="w-full">
          <div className="h4">
            <h1 className="font-semibold">Headline</h1>
            <p className="mt-1 text-muted-foreground">Subline that is a bit longer</p>
          </div>
        </RowVisualizer>
      </StyleguideRender>

      <StyleguideRender label="Two Rows">
        <RowVisualizer rows={2} className="w-full">
          <div className="h4">
            <h1 className="font-semibold">Headline</h1>
            <p className="mt-1 text-muted-foreground">Content spanning multiple rows</p>
          </div>
        </RowVisualizer>
      </StyleguideRender>

      <StyleguideRender label="Three Rows">
        <RowVisualizer rows={3} className="w-full">
          <div className="h4">
            <h1 className="font-semibold">Headline</h1>
            <p className="mt-1 text-muted-foreground">Content spanning multiple rows</p>
            <p className="mt-4 text-muted-foreground">Additional content in the third row</p>
          </div>
        </RowVisualizer>
      </StyleguideRender>

      <StyleguideRender label="Four Rows">
        <RowVisualizer rows={4} className="w-full">
          <div className="h4">
            <h1 className="font-semibold">Headline</h1>
            <p className="mt-1 text-muted-foreground">Content spanning multiple rows</p>
            <p className="mt-4 text-muted-foreground">Additional content in the third row</p>
            <p className="mt-4 text-muted-foreground">Even more content in the fourth row</p>
          </div>
        </RowVisualizer>
      </StyleguideRender>
    </StyleguideSection>
  );
};

export default GridShowcase;
