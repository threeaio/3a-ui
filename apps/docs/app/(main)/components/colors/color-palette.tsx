import React from 'react';
import { StyleguideSection } from '../../../ui/styleguide-section';
import { StyleguideRender } from '../../../ui/styleguide-render';

interface ColorSwatchProps {
  name: string;
  bgClass: string;
  className?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, bgClass, className, isFirst, isLast }) => {
  return (
    <div className={`flex flex-col  items-start ${className || ''}`}>
      <div
        className={`${bgClass} h-8 w-full ${isFirst ? 'rounded-l-md border-l' : 'border-l-0'} ${
          isLast ? 'rounded-r-md' : ''
        } border border-border mb-2`}
      ></div>
      <span className={`text-xs block w-full text-muted-foreground font-mono truncate`}>{name}</span>
    </div>
  );
};

interface ColorPairProps {
  title: string;
  colors: Array<{ name: string; bgClass: string }>;
}

const ColorPair: React.FC<ColorPairProps> = ({ title, colors }) => {
  return (
    <div className="mb-4 w-full flex-1 min-w-[320px]">
      <h4 className="text-sm mb-2">{title}</h4>
      <div className="flex flex-row w-full">
        {colors.map((color, index) => (
          <ColorSwatch
            key={color.name}
            name={color.name}
            bgClass={color.bgClass}
            className="flex-1"
            isFirst={index === 0}
            isLast={index === colors.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

interface ColorGroupProps {
  title: string;
  pairs: Array<{ title: string; colors: Array<{ name: string; bgClass: string }> }>;
}

const ColorGroup: React.FC<ColorGroupProps> = ({ title, pairs }) => {
  return (
    <StyleguideRender label={title}>
      <div className="flex gap-5 w-full flex-row flex-wrap">
        {pairs.map((pair) => (
          <ColorPair key={pair.title} title={pair.title} colors={pair.colors} />
        ))}
      </div>
    </StyleguideRender>
  );
};

export const ColorPalette: React.FC = () => {
  const baseColors = [
    {
      title: 'Background/Foreground',
      colors: [
        { name: 'background', bgClass: 'bg-background' },
        { name: 'foreground', bgClass: 'bg-foreground' },
      ],
    },
  ];

  const accentColors = [
    {
      title: 'Primary',
      colors: [
        { name: 'primary', bgClass: 'bg-primary' },
        { name: 'primary-foreground', bgClass: 'bg-primary-foreground' },
      ],
    },
    {
      title: 'Default',
      colors: [
        { name: 'default', bgClass: 'bg-default' },
        { name: 'default-foreground', bgClass: 'bg-default-foreground' },
      ],
    },
    {
      title: 'Secondary',
      colors: [
        { name: 'secondary', bgClass: 'bg-secondary' },
        { name: 'secondary-foreground', bgClass: 'bg-secondary-foreground' },
      ],
    },
    {
      title: 'Accent',
      colors: [
        { name: 'accent', bgClass: 'bg-accent' },
        { name: 'accent-foreground', bgClass: 'bg-accent-foreground' },
      ],
    },
  ];

  const utilityColors = [
    {
      title: 'Muted',
      colors: [
        { name: 'muted', bgClass: 'bg-muted' },
        { name: 'muted-foreground', bgClass: 'bg-muted-foreground' },
      ],
    },
    {
      title: 'Destructive',
      colors: [
        { name: 'destructive', bgClass: 'bg-destructive' },
        { name: 'destructive-foreground', bgClass: 'bg-destructive-foreground' },
      ],
    },
    {
      title: 'UI Elements',
      colors: [
        { name: 'border', bgClass: 'bg-border' },
        { name: 'input', bgClass: 'bg-input' },
        { name: 'ring', bgClass: 'bg-ring' },
      ],
    },
  ];

  const componentColors = [
    {
      title: 'Card',
      colors: [
        { name: 'card', bgClass: 'bg-card' },
        { name: 'card-foreground', bgClass: 'bg-card-foreground' },
      ],
    },
    {
      title: 'Popover',
      colors: [
        { name: 'popover', bgClass: 'bg-popover' },
        { name: 'popover-foreground', bgClass: 'bg-popover-foreground' },
      ],
    },
  ];

  const sidebarColors = [
    {
      title: 'Sidebar Base',
      colors: [
        { name: 'sidebar', bgClass: 'bg-sidebar' },
        { name: 'sidebar-foreground', bgClass: 'bg-sidebar-foreground' },
      ],
    },
    {
      title: 'Sidebar Primary',
      colors: [
        { name: 'sidebar-primary', bgClass: 'bg-sidebar-primary' },
        { name: 'sidebar-primary-foreground', bgClass: 'bg-sidebar-primary-foreground' },
      ],
    },
    {
      title: 'Sidebar Accent',
      colors: [
        { name: 'sidebar-accent', bgClass: 'bg-sidebar-accent' },
        { name: 'sidebar-accent-foreground', bgClass: 'bg-sidebar-accent-foreground' },
      ],
    },
    {
      title: 'Sidebar Elements',
      colors: [
        { name: 'sidebar-border', bgClass: 'bg-sidebar-border' },
        { name: 'sidebar-ring', bgClass: 'bg-sidebar-ring' },
      ],
    },
  ];

  const chartColors = [
    {
      title: 'Chart Colors',
      colors: [
        { name: 'chart-1', bgClass: 'bg-chart-1' },
        { name: 'chart-2', bgClass: 'bg-chart-2' },
        { name: 'chart-3', bgClass: 'bg-chart-3' },
        { name: 'chart-4', bgClass: 'bg-chart-4' },
        { name: 'chart-5', bgClass: 'bg-chart-5' },
      ],
    },
  ];

  return (
    <StyleguideSection title="Color Palette" subline="The complete color system used throughout the application">
      <ColorGroup title="Base Colors" pairs={baseColors} />
      <ColorGroup title="Accent Colors" pairs={accentColors} />
      <ColorGroup title="Utility Colors" pairs={utilityColors} />
      <ColorGroup title="Component Colors" pairs={componentColors} />
      <ColorGroup title="Sidebar Colors" pairs={sidebarColors} />
      <ColorGroup title="Chart Colors" pairs={chartColors} />
    </StyleguideSection>
  );
};

export default ColorPalette;
