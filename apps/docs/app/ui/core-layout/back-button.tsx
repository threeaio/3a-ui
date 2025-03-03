'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-4 left-4 p-2 rounded-full bg-card border border-border hover:bg-secondary transition-colors duration-200"
      aria-label="Go back"
    >
      <ArrowLeft size={24} className="text-foreground" />
    </button>
  );
};

export default BackButton;
