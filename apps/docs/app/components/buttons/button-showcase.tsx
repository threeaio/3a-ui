import React from 'react';
import { Button, ButtonGroup } from '@3a-ui/ui/button';
import { StyleguideSection } from '../../ui/styleguide-section';
import { StyleguideRender } from '../../ui/styleguide-render';
import StyleguideExplanation from '../../ui/styleguide-explanation';
import { ArrowRight, Save, Plus, Loader2, Settings, Download, Trash, Mail, Pen, Minus } from 'lucide-react';

export const ButtonShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Button Component" subline="All available button variants and sizes">
      <StyleguideExplanation>
        <p className="text-muted-foreground max-w-2xl leading-tight mb-5">
          Buttons are interactive elements that trigger actions when clicked. The button system provides various
          <span className="text-foreground"> variants, sizes, and states</span> to accommodate different UI needs:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground max-w-2xl leading-tight mb-5 space-y-2">
          <li>
            <span className="text-foreground font-medium">Variants:</span> Default (primary), destructive, outline,
            secondary, ghost, and link styles
          </li>
          <li>
            <span className="text-foreground font-medium">Sizes:</span> Small, default, large, and icon-only options
          </li>
          <li>
            <span className="text-foreground font-medium">States:</span> Normal, disabled, and loading states
          </li>
          <li>
            <span className="text-foreground font-medium">Icons:</span> Can be combined with text or used alone
          </li>
          <li>
            <span className="text-foreground font-medium">Button Groups:</span> For related actions that should be
            visually connected
          </li>
        </ul>
      </StyleguideExplanation>

      <StyleguideRender label="Variants">
        <Button>Call to Action</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </StyleguideRender>

      <StyleguideRender label="Sizes">
        <Button variant="outline" size="sm">
          Small
        </Button>
        <Button variant="outline" size="default">
          Default
        </Button>
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </StyleguideRender>

      <StyleguideRender label="With Icons">
        <Button>
          <ArrowRight className="size-4" />
          Next Step
        </Button>
        <Button variant="outline">
          <Save className="size-4" />
          Save
        </Button>
        <Button variant="secondary">
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button variant="destructive">
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </StyleguideRender>

      <StyleguideRender label="Icon Only">
        <Button size="icon" variant="outline">
          <Mail className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary">
          <Settings className="size-4" />
        </Button>
        <Button size="icon">
          <Plus className="size-4" />
        </Button>
      </StyleguideRender>

      <StyleguideRender label="States">
        <Button variant="outline" disabled>
          Disabled
        </Button>
        <Button variant="outline" className="opacity-90">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Loading
        </Button>
      </StyleguideRender>

      <StyleguideRender label="Button-Group">
        <ButtonGroup variant="default">
          <Button>Action 1</Button>
          <Button>Action 2</Button>
          <Button>Action 3</Button>
        </ButtonGroup>
        <ButtonGroup variant="outline">
          <Button>Action 1</Button>
          <Button>Action 2</Button>
          <Button>Action 3</Button>
        </ButtonGroup>
        <ButtonGroup variant="outline" size="icon">
          <Button>
            <Minus className="size-4" />
          </Button>
          <Button>
            <Plus className="size-4" />
          </Button>
          <Button>
            <Pen className="size-4" />
          </Button>
        </ButtonGroup>
      </StyleguideRender>
    </StyleguideSection>
  );
};

export default ButtonShowcase;
