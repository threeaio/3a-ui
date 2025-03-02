import React from 'react';
import { StyleguideSection } from '../../ui/styleguide-section';
import { StyleguideRender } from '../../ui/styleguide-render';
import { Button } from '@3a-ui/ui/button';
import StyleguideExplanation from '../../ui/styleguide-explanation';
import { heightClasses } from '../../ui-config';
import { ButtonGroup } from '@3a-ui/ui/button';
import { Minus, Plus } from 'lucide-react';
import { VisualizerToggle } from '../../ui/visualizer-toggle';
import { RowVisualizer } from '../../ui/row-visualizer';
import { PaddingIndicator } from '../../ui/padding-indicator';

const GridShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Row System" subline="Constraints using rows">
      <StyleguideExplanation>
        <div className="text-muted-foreground max-w-2xl">
          <p className="mb-5">
            A simple row system that allows you to create a consistent layout, espcially when it comes to small reusable
            components. It is not as rigid as a classical typographical grid, but it is a good compromise to ensure that
            the components are aligned to each other and some rythm is applied.
          </p>
          <p className="mb-5">
            Please be aware that it is your job to ensure that the content does not epxand the height of the elements.
            It is recommended to use the following <span className="text-foreground">tailwind utility-classes</span> to
            constrain the height of the content:
          </p>
          <div className="flex flex-wrap gap-1 mb-5">
            {Object.entries(heightClasses).map(([key, value]) => (
              <code key={key}>
                <pre className="text-xs px-1.5 py-0.5 rounded bg-black text-white">{value}</pre>
              </code>
            ))}
          </div>
        </div>
      </StyleguideExplanation>

      
        <div className="space-y-6">
          <StyleguideRender label="Single Row with Headline">
            <RowVisualizer rows={1} className="w-full">
              <div className={`flex flex-col justify-center ${heightClasses[1]}`}>
                <h1 className="font-semibold">Headline</h1>
                <p className="mt-1 text-muted-foreground">Subline that is a bit longer</p>
              </div>
            </RowVisualizer>
          </StyleguideRender>

          <StyleguideRender label="Double Row with Headline">
            <RowVisualizer rows={2} className="w-full">
              <div className={`flex flex-col justify-center ${heightClasses[2]}`}>
                <h1 className="font-semibold">Headline</h1>
                <p className="mt-1 text-muted-foreground">Subline that is a bit longer</p>
              </div>
            </RowVisualizer>
          </StyleguideRender>

          <StyleguideRender label="Single Row with UI">
            <RowVisualizer rows={1} className="w-full">
              <PaddingIndicator paddingSize={2} paddingType="full" showLabels={true}>
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
              </PaddingIndicator>
            </RowVisualizer>
          </StyleguideRender>
        </div>
    </StyleguideSection>
  );
};

export default GridShowcase;
