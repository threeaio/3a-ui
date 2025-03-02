import React from 'react';
import { Button, ButtonGroup } from '@3a-ui/ui/button';
import { StyleguideSection } from '../../ui/styleguide-section';
import { StyleguideRender } from '../../ui/styleguide-render';
import { ArrowRight, Save, Plus, Loader2, Settings, Download, Trash, Mail, Pen, Minus } from 'lucide-react';
import { RowVisualizer } from '../../ui/row-visualizer';
import { heightClasses } from '../../ui-config';

interface ButtonVariantProps {
  title: string;
  children: React.ReactNode;
}

export const ButtonShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Button Component" subline="All available button variants and sizes">
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
          <ArrowRight className="h-4 w-4" />
          Next Step
        </Button>
        <Button variant="outline">
          <Save className="h-4 w-4" />
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
          <Settings className="h-4 w-4" />
        </Button>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </StyleguideRender>

      <StyleguideRender label="States">
        <Button size="lg" variant="outline" disabled>
          Disabled
        </Button>
        <Button size="lg" variant="outline" className="opacity-90">
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
