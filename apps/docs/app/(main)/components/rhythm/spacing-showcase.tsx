import React from 'react'
import { StyleguideSection } from '../../../ui/styleguide-section'
import { StyleguideRender } from '../../../ui/styleguide-render'
import StyleguideExplanation from '../../../ui/styleguide-explanation'
import { heightClasses, paddingClasses } from '../../../ui-config'
import { PaddingIndicator } from '../../../ui/measure-visualizer/padding-indicator'
import { Button, ButtonGroup } from '@3a-ui/ui/button'
import { Check, Plus } from 'lucide-react'
import { RowVisualizer } from '../../../ui/measure-visualizer/row-indicator'
import { Badge } from '@3a-ui/ui/badge'

type PaddingSize = 1 | 2 | 3 | 4

const SpacingShowcase: React.FC = () => {
  // Extract values from the full padding classes to get just the numbers
  const spacingSizes = Object.entries(paddingClasses.full).map(([key, value]) => ({
    size: Number(key) as PaddingSize,
    value: value.replace('p-', ''),
  }))

  return (
    <StyleguideSection title="Spacing System" subline="Consistent spacing throughout the app">
      <StyleguideExplanation>
        <div className="text-muted-foreground max-w-2xl">
          <p className="mb-5">
            The spacing system helps to keep a consistent spacing between components. It aligns with the «Row System»
            and keeps things in sync. Please be aware, that espcially in situations where small spaces are needed,
            eyeballing is the better approach.
          </p>
          <p className="mb-5">
            It is recommended to use the following base values for all paddings, margins and gap-values:
          </p>
          <div className="flex flex-col gap-5 mb-5">
            {spacingSizes.map(({ size, value }) => (
              <div key={size} className="flex items-center gap-4">
                <div className="w-10 text-right">
                  <code>
                    <pre className="text-xs px-1.5 py-0.5 rounded bg-black text-white">{value}</pre>
                  </code>
                </div>
                <div
                  className={`relative w-0 h-5 overflow-hidden border-l border-r border-destructive/50 bg-destructive/10 ${paddingClasses.left[size]}`}
                >
                  <div
                    className={`h-px left-0 top-1/2 -translate-y-px w-full absolute border-b border-dashed border-destructive/50`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs mb-5 ">
            These values can be applied in different directions using the appropriate prefix. For example for paddings:
            <span className="text-foreground ml-1 font-mono">p-</span> (all sides),
            <span className="text-foreground ml-1 font-mono">px-</span> (horizontal),
            <span className="text-foreground ml-1 font-mono">py-</span> (vertical),
            <span className="text-foreground ml-1 font-mono">pt-</span> (top),
            <span className="text-foreground ml-1 font-mono">pr-</span> (right),
            <span className="text-foreground ml-1 font-mono">pb-</span> (bottom),
            <span className="text-foreground ml-1 font-mono">pl-</span> (left)
          </p>
          <p className="text-xs text-muted-foreground">
            Avoid using direct neighbours of the values described here, like{' '}
            <span className="font-mono text-foreground">p-{Number(spacingSizes[1]!.value) + 1}</span> or{' '}
            <span className="font-mono text-foreground">gap-{Number(spacingSizes[1]!.value) - 1}</span>.
          </p>
        </div>
      </StyleguideExplanation>

      <StyleguideRender label="Padding with Row System (Size 2)">
        <RowVisualizer rows={1} className="w-full">
          <PaddingIndicator paddingSize={2} paddingType="horizontal" showLabels={true}>
            <div className={`rounded-2xl bg-background flex flex-col justify-center ${heightClasses[1]}`}>
              <div className={`${paddingClasses.horizontal[2]}`}>
                <div className="flex items-center justify-between">
                  <ButtonGroup variant="outline">
                    <Button>Action</Button>
                    <Button>Settings</Button>
                  </ButtonGroup>
                  <ButtonGroup variant="outline">
                    <Button size="icon">
                      <Plus />
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </PaddingIndicator>
        </RowVisualizer>
      </StyleguideRender>

      <StyleguideRender label="Padding with Row System (Size 1)" className="">
        <RowVisualizer rows={0} className="w-full">
          <PaddingIndicator paddingSize={1} paddingType="horizontal" showLabels={true}>
            <div className={`flex flex-col rounded-xl bg-background justify-center ${heightClasses[0]}`}>
              <div className={`${paddingClasses.horizontal[1]}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <ButtonGroup variant="outline">
                      <Button>Action</Button>
                      <Button>Settings</Button>
                    </ButtonGroup>
                    <span className="text-muted-foreground text-xs">|</span>
                    <Badge>
                      <Check className="size-3" />
                      Successfully created item
                    </Badge>
                  </div>

                  <ButtonGroup variant="outline">
                    <Button size="icon">
                      <Plus />
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </PaddingIndicator>
        </RowVisualizer>
      </StyleguideRender>

      <StyleguideRender label="Padding with Double Row (Size 3)">
        <RowVisualizer rows={2} className="w-full">
          <PaddingIndicator paddingSize={3} paddingType="horizontal" showLabels={true}>
            <div className={`border rounded-xl bg-background flex flex-col justify-center ${heightClasses[2]}`}>
              <div className={`${paddingClasses.horizontal[3]}`}>
                <div className="flex flex-col gap-2.5 max-w-2xl">
                  <h2 className="font-semibold">Content Section</h2>
                  <p className="text-muted-foreground">
                    Here we have a fixed height row with a content section that spans multiple rows. Be aware, that the
                    content does not exceed the height of the row.
                  </p>
                </div>
              </div>
            </div>
          </PaddingIndicator>
        </RowVisualizer>
      </StyleguideRender>
      <StyleguideRender label="Only Padding">
        <PaddingIndicator paddingSize={3} paddingType="full" showLabels={true}>
          <div className={`border rounded-xl bg-background w-full`}>
            <div className={`${paddingClasses.full[3]}`}>
              <div className="flex flex-col gap-2.5 max-w-2xl">
                <h2 className="font-semibold ">Content Section</h2>
                <p className="text-muted-foreground mb-2.5">
                  This example shows how padding creates comfortable spacing in a content section that has an unknown
                  height. So a lot of content can be added without breaking the padding. When dealing with texts or
                  lists, just applying paddings is prefered over setting fixed heights to elements.
                </p>
                <p className="text-muted-foreground mb-10">
                  This example shows how padding creates comfortable spacing in a content section that has an unknown
                  height. So a lot of content can be added without breaking the padding. When dealing with texts or
                  lists, just applying paddings is prefered over setting fixed heights to elements.
                </p>
                <h2 className="font-semibold ">Content Section</h2>
                <p className="text-muted-foreground mb-2.5">
                  This example shows how padding creates comfortable spacing in a content section that has an unknown
                  height. So a lot of content can be added without breaking the padding. When dealing with texts or
                  lists, just applying paddings is prefered over setting fixed heights to elements.
                </p>
                <p className="text-muted-foreground">
                  This example shows how padding creates comfortable spacing in a content section that has an unknown
                  height. So a lot of content can be added without breaking the padding. When dealing with texts or
                  lists, just applying paddings is prefered over setting fixed heights to elements.
                </p>
              </div>
            </div>
          </div>
        </PaddingIndicator>
      </StyleguideRender>
    </StyleguideSection>
  )
}

export default SpacingShowcase
