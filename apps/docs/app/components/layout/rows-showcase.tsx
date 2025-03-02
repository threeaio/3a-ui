import React from 'react';
import { StyleguideSection } from '../../ui/styleguide-section';
import { StyleguideRender } from '../../ui/styleguide-render';
import { Button } from '@3a-ui/ui/button';
import StyleguideExplanation from '../../ui/styleguide-explanation';
import { MeasureIndicator } from '../../ui/measure-indicator';
import { RowVisualizer } from '../../ui/row-visualizer';
import { heightClasses } from '../../ui-config';
import { ButtonGroup } from '@3a-ui/ui/button';
import { Minus, Plus } from 'lucide-react';
// The RowVisualizer component has been moved to ../../ui/row-visualizer.tsx

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
          <MeasureIndicator left={heightClasses[2]}>
            <div className={`flex flex-col justify-center ${heightClasses[1]}`}>
              <div className="flex gap-2 px-5 justify-between">
                <ButtonGroup variant="outline">
                  <Button>Button</Button>
                  <Button>Button</Button>
                  <Button>Button</Button>
                </ButtonGroup>
                <ButtonGroup variant="outline">
                  <Button>
                    <Minus />
                  </Button>
                  <Button>
                    <Plus />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          </MeasureIndicator>
        </RowVisualizer>
      </StyleguideRender>
    </StyleguideSection>
  );
};

export default GridShowcase;
