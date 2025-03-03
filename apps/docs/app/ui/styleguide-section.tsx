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
    <section className={`mb-12  ${className}`}>
      <div className="px-10 h-40 flex flex-col justify-center">
        <h2 className="font-semibold">{title}</h2>
        {subline && <p className="mt-1 text-muted-foreground">{subline}</p>}
      </div>
      <div className="border-t p-10 mb-5">{children}</div>
    </section>
  );
};

export default StyleguideSection;
