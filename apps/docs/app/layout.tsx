import './globals.css';
import '@3a-ui/ui/styles.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Header from './ui/header';

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '3a-ui - docs',
  description: '3a-ui documentation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Header />
        <main className="pt-16 md:pt-0">{children}</main>
      </body>
    </html>
  );
}
