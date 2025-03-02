import React from 'react';
import { StyleguideSection } from '../../ui/styleguide-section';
import { StyleguideRender } from '../../ui/styleguide-render';
import { Button } from '@3a-ui/ui/button';
import StyleguideExplanation from '../../ui/styleguide-explanation';
import { MeasureIndicator } from '../../ui/measure-indicator';

interface RowVisualizerProps {
  rows: 1 | 2 | 3 | 4;
  className?: string;
  children?: React.ReactNode;
}

const heightClasses = {
  1: 'h-20',
  2: 'h-40',
  3: 'h-60',
  4: 'h-80',
};

const RowVisualizer: React.FC<RowVisualizerProps> = ({ rows = 1, className = '', children }) => {
  // Create an array of the specified length for rows
  const rowsArray = Array.from({ length: rows }, (_, i) => i);

  return (
    <div className={`relative ${className}`}>
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
    </div>
  );
};

const GridShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Row System" subline="Constraints using rows">
      <StyleguideExplanation>
        <p className="text-muted-foreground max-w-2xl leading-tight mb-5">
          The row system is a way to constrain the height of the content. It is recommended to use the following{' '}
          <span className="text-foreground">tailwind utility-classes</span> to constrain the height of the content:
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(heightClasses).map(([key, value]) => (
            <code key={key}>
              <pre className="text-xs px-1.5 py-0.5 rounded bg-black text-white">{value}</pre>
            </code>
          ))}
        </div>
      </StyleguideExplanation>
      <StyleguideRender label="Single Row with Headline">
        <RowVisualizer rows={2} className="w-full">
          <MeasureIndicator left={heightClasses[1]}>
            <div className={`flex flex-col justify-center ${heightClasses[1]}`}>
              <h1 className="font-semibold">Headline</h1>
              <p className="mt-1 text-muted-foreground">Subline that is a bit longer</p>
            </div>
          </MeasureIndicator>
        </RowVisualizer>
      </StyleguideRender>
      <StyleguideRender label="Double Row with Headline">
        <RowVisualizer rows={2} className="w-full">
          <MeasureIndicator left={heightClasses[2]}>
            <div className={`flex flex-col justify-center ${heightClasses[2]}`}>
              <h1 className="font-semibold">Headline</h1>
              <p className="mt-1 text-muted-foreground">Subline that is a bit longer</p>
            </div>
          </MeasureIndicator>
        </RowVisualizer>
      </StyleguideRender>

      <StyleguideRender label="Single Row with UI">
        <RowVisualizer rows={1} className="w-full">
          <div className={`flex flex-col justify-center ${heightClasses[1]}`}>
            <div className="flex gap-2 px-5">
              <Button variant="outline">Button</Button>
              <Button variant="outline">Button</Button>
              <Button variant="outline">Button</Button>
            </div>
          </div>
        </RowVisualizer>
      </StyleguideRender>
    </StyleguideSection>
  );
};

export default GridShowcase;
