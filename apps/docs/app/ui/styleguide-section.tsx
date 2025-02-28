import React, { ReactNode } from 'react';

interface StyleguideSectionProps {
  /**
   * The title of the section
   */
  title: string;

  /**
   * Optional subline text that appears below the title
   */
  subline?: string;

  /**
   * The content of the section
   */
  children: ReactNode;

  /**
   * Optional additional CSS classes for the section container
   */
  className?: string;
}

/**
 * A wrapper component for styleguide sections that provides consistent styling
 * with a title, optional subline, and content area.
 */
export const StyleguideSection: React.FC<StyleguideSectionProps> = ({ title, subline, children, className = '' }) => {
  return (
    <section className={`mb-12 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subline && <p className="mt-2 text-muted-foreground">{subline}</p>}
      </div>
      <div className="p-6 border rounded-lg bg-card">{children}</div>
    </section>
  );
};

export default StyleguideSection;
