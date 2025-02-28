import React from 'react';

interface ColorSwatchProps {
  name: string;
  bgClass: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, bgClass }) => {
  return (
    <div className="flex w-16 flex-col items-start group">
      <div
        className={`${bgClass} aspect-square w-full group-first:rounded-l-lg group-last:rounded-r-lg border border-border/40 mb-2`}
      ></div>
      <span className={`text-xs block w-[90%] truncate`}>{name}</span>
    </div>
  );
};

interface ColorGroupProps {
  title: string;
  colors: Array<{ name: string; bgClass: string }>;
}

const ColorGroup: React.FC<ColorGroupProps> = ({ title, colors }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="flex flex-row">
        {colors.map((color) => (
          <ColorSwatch key={color.name} name={color.name} bgClass={color.bgClass} />
        ))}
      </div>
    </div>
  );
};

export const ColorPalette: React.FC = () => {
  const baseColors = [
    { name: 'background', bgClass: 'bg-background', textClass: 'text-foreground' },
    { name: 'foreground', bgClass: 'bg-foreground', textClass: 'text-background' },
  ];

  const accentColors = [
    { name: 'primary', bgClass: 'bg-primary', textClass: 'text-primary-foreground' },
    { name: 'primary-foreground', bgClass: 'bg-primary-foreground', textClass: 'text-primary' },
    { name: 'secondary', bgClass: 'bg-secondary', textClass: 'text-secondary-foreground' },
    { name: 'secondary-foreground', bgClass: 'bg-secondary-foreground', textClass: 'text-secondary' },
    { name: 'accent', bgClass: 'bg-accent', textClass: 'text-accent-foreground' },
    { name: 'accent-foreground', bgClass: 'bg-accent-foreground', textClass: 'text-accent' },
  ];

  const utilityColors = [
    { name: 'muted', bgClass: 'bg-muted', textClass: 'text-muted-foreground' },
    { name: 'muted-foreground', bgClass: 'bg-muted-foreground', textClass: 'text-muted' },
    { name: 'destructive', bgClass: 'bg-destructive', textClass: 'text-destructive-foreground' },
    { name: 'destructive-foreground', bgClass: 'bg-destructive-foreground', textClass: 'text-destructive' },
    { name: 'border', bgClass: 'bg-border', textClass: 'text-foreground' },
    { name: 'input', bgClass: 'bg-input', textClass: 'text-foreground' },
    { name: 'ring', bgClass: 'bg-ring', textClass: 'text-foreground' },
  ];

  const componentColors = [
    { name: 'card', bgClass: 'bg-card', textClass: 'text-card-foreground' },
    { name: 'card-foreground', bgClass: 'bg-card-foreground', textClass: 'text-card' },
    { name: 'popover', bgClass: 'bg-popover', textClass: 'text-popover-foreground' },
    { name: 'popover-foreground', bgClass: 'bg-popover-foreground', textClass: 'text-popover' },
  ];

  const sidebarColors = [
    { name: 'sidebar', bgClass: 'bg-sidebar', textClass: 'text-sidebar-foreground' },
    { name: 'sidebar-foreground', bgClass: 'bg-sidebar-foreground', textClass: 'text-sidebar' },
    { name: 'sidebar-primary', bgClass: 'bg-sidebar-primary', textClass: 'text-sidebar-primary-foreground' },
    { name: 'sidebar-primary-foreground', bgClass: 'bg-sidebar-primary-foreground', textClass: 'text-sidebar-primary' },
    { name: 'sidebar-accent', bgClass: 'bg-sidebar-accent', textClass: 'text-sidebar-accent-foreground' },
    { name: 'sidebar-accent-foreground', bgClass: 'bg-sidebar-accent-foreground', textClass: 'text-sidebar-accent' },
    { name: 'sidebar-border', bgClass: 'bg-sidebar-border', textClass: 'text-sidebar-foreground' },
    { name: 'sidebar-ring', bgClass: 'bg-sidebar-ring', textClass: 'text-sidebar-foreground' },
  ];

  const chartColors = [
    { name: 'chart-1', bgClass: 'bg-chart-1', textClass: 'text-foreground' },
    { name: 'chart-2', bgClass: 'bg-chart-2', textClass: 'text-foreground' },
    { name: 'chart-3', bgClass: 'bg-chart-3', textClass: 'text-foreground' },
    { name: 'chart-4', bgClass: 'bg-chart-4', textClass: 'text-foreground' },
    { name: 'chart-5', bgClass: 'bg-chart-5', textClass: 'text-foreground' },
  ];

  return (
    <div className="p-6 text-foreground bg-NIKO">
      <h2 className="text-2xl font-bold mb-6">Color Palette</h2>

      <ColorGroup title="Base Colors" colors={baseColors} />
      <ColorGroup title="Accent Colors" colors={accentColors} />
      <ColorGroup title="Utility Colors" colors={utilityColors} />
      <ColorGroup title="Component Colors" colors={componentColors} />
      <ColorGroup title="Sidebar Colors" colors={sidebarColors} />
      <ColorGroup title="Chart Colors" colors={chartColors} />
    </div>
  );
};

export default ColorPalette;
