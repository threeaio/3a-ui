import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@3a-ui/ui/button';
import ColorPalette from './components/colors/color-palette';

function Gradient({ conic, className, small }: { small?: boolean; conic?: boolean; className?: string }) {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${
        small ? 'blur-[32px]' : 'blur-[75px]'
      } ${conic ? 'bg-glow-conic' : ''} ${className ?? ''}`}
    />
  );
}

const LINKS = [
  {
    title: 'Docs',
    href: 'https://turbo.build/repo/docs',
    description: 'Find in-depth information about Turborepo features and API.',
  },
];

export default function Page() {
  return (
    <main className="flex flex-col p-6">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">3A UI Components</h1>
        <p className="text-muted-foreground mb-8">
          Explore the UI components and design system used throughout the application.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/components/colors"
            className="block p-6 border rounded-lg bg-card hover:bg-card/80 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Color Palette</h2>
            <p className="text-muted-foreground">Explore the complete color system used throughout the application.</p>
          </Link>

          <Link
            href="/components/buttons"
            className="block p-6 border rounded-lg bg-card hover:bg-card/80 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Buttons</h2>
            <p className="text-muted-foreground">View all button variants, sizes, and states available in the UI.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
