import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from './ui/header';
import Sidebar from './nav';

import '@3a-ui/ui/styles.css';
import './styles.css';

// Initialize the fonts
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans', // This maps the font to the CSS variable
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono', // This maps the font to the CSS variable
});

export const metadata: Metadata = {
  title: '3a-ui - docs',
  description: '3a-ui documentation',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans`}>
        <Header />
        <div className="flex h-[calc(100vh-4.5rem)] pt-16 md:pt-0">
          <Sidebar />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
