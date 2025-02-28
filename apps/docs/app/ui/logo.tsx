import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  href?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ href = '/', className = '' }) => {
  return (
    <Link href={href} className={`flex items-center gap-4 no-underline ${className}`} data-zone="same">
      <div className="">
        <Image src="/logo.svg" alt="Logo" width={27} height={27} className="text-current" />
      </div>
      <p className="font-semibold text-base leading-6 tracking-[-0.32px]">Design System</p>
    </Link>
  );
};

export default Logo;
