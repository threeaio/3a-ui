import React from 'react';
import { Button } from '@3a-ui/ui/button';
import { StyleguideSection } from '../../ui/styleguide-section';
import { StyleguideRender } from '../../ui/styleguide-render';
import { ArrowRight, Save, Plus, Loader2, Settings, Download, Trash, Mail } from 'lucide-react';

interface ButtonVariantProps {
  title: string;
  children: React.ReactNode;
}

const ButtonVariant: React.FC<ButtonVariantProps> = ({ title, children }) => {
  return <StyleguideRender label={title}>{children}</StyleguideRender>;
};

export const ButtonShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Button Component" subline="All available button variants and sizes">
      <ButtonVariant title="Variants">
        <Button>Call to Action</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </ButtonVariant>

      <ButtonVariant title="Sizes">
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
      </ButtonVariant>

      <ButtonVariant title="With Icons">
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
      </ButtonVariant>

      <ButtonVariant title="Icon Only">
        <Button size="icon" variant="outline">
          <Mail className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary">
          <Settings className="h-4 w-4" />
        </Button>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </ButtonVariant>

      <ButtonVariant title="States">
        <Button size="lg" variant="outline" disabled>
          Disabled
        </Button>
        <Button size="lg" variant="outline" className="opacity-90">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          Loading
        </Button>
      </ButtonVariant>
    </StyleguideSection>
  );
};

export default ButtonShowcase;
