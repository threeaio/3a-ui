import React from 'react';
import { Badge } from '@3a-ui/ui/badge';
import { StyleguideSection } from '../../../ui/styleguide-section';
import { StyleguideRender } from '../../../ui/styleguide-render';
import StyleguideExplanation from '../../../ui/styleguide-explanation';
import { Check, X, AlertCircle, Info, Loader2 } from 'lucide-react';

export const BadgeShowcase: React.FC = () => {
  return (
    <StyleguideSection title="Badge Component" subline="All available badge variants and use cases">
      <StyleguideExplanation>
        <p className="text-muted-foreground max-w-2xl leading-tight mb-5">
          Badges are compact elements that represent an attribute, status, or category. The badge system provides
          <span className="text-foreground"> various variants</span> to accommodate different UI needs:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground max-w-2xl leading-tight mb-5 space-y-2">
          <li>
            <span className="text-foreground font-medium">Variants:</span> Default (primary), secondary, destructive,
            and outline styles
          </li>
          <li>
            <span className="text-foreground font-medium">Icons:</span> Can be combined with text for enhanced visual
            communication
          </li>
          <li>
            <span className="text-foreground font-medium">Use Cases:</span> Status indicators, labels, counts, and
            categories
          </li>
        </ul>
      </StyleguideExplanation>

      <StyleguideRender label="Variants" classNameContent="flex justify-start flex-wrap gap-2.5">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="secondary">Secondary</Badge>
      </StyleguideRender>

      <StyleguideRender label="With Icons" classNameContent="flex justify-start flex-wrap gap-2.5">
        <Badge>
          <Loader2 className="size-3 animate-spin" />
          Rendering
        </Badge>
        <Badge variant="primary">
          <Check />
          Completed
        </Badge>
        <Badge variant="destructive">
          <X />
          Rejected
        </Badge>
        <Badge variant="outline">
          <AlertCircle />
          Warning
        </Badge>
        <Badge variant="secondary">
          <Info />
          Info
        </Badge>
      </StyleguideRender>

      <StyleguideRender label="Use Cases" classNameContent="flex justify-start flex-wrap gap-2.5">
        <Badge>Info</Badge>
        <Badge variant="primary">New</Badge>
        <Badge variant="destructive">Deprecated</Badge>
        <Badge variant="outline">Beta</Badge>
        <Badge variant="secondary">In Progress</Badge>
      </StyleguideRender>
    </StyleguideSection>
  );
};

export default BadgeShowcase;
