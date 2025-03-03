import React from 'react';
import GridShowcase from './rows-showcase';
export default function GridPage() {
  return (
    <main>
      <div className="h-80 pt-10 flex flex-col px-10 justify-start">
        <h1 className="text-2xl font-semibold mb-5">Rhythm</h1>
        <p className="text-muted-foreground max-w-2xl">
          Rhythm is the art of creating a harmonious and balanced layout. It is the key to creating a visually appealing
          and user-friendly design. I also helps to keep uniformity and composability of the components you create.
          Technically it is about how to apply paddings, margins and height values to your components.
        </p>
      </div>
      <GridShowcase />
    </main>
  );
}
