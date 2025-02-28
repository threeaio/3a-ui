import Image from 'next/image';
import { Button } from '@3a-ui/ui/button';
import ColorPalette from './color-palette';

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">UI Components</h1>
        <div className="flex gap-2">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>

      <ColorPalette />
    </main>
  );
}
