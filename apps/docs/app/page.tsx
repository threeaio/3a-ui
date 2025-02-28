import Image from 'next/image';
import { Button } from '@3a-ui/ui/button';

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
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Button>Hallo</Button>
      <Button variant="outline">Hallo</Button>
    </main>
  );
}
