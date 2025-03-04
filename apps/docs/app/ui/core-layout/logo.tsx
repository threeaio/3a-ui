import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface LogoProps {
  href?: string
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ href = '/', className = '' }) => {
  return (
    <Link href={href} className={`flex items-center gap-4 no-underline ${className}`} data-zone="same">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="3.63 1.2 35.56 30.33">
          <path d="M21.4131 20.1016L4.51416 30.9521" stroke="currentColor"></path>
          <path d="M21.4131 20.1016L38.3447 30.75" stroke="currentColor"></path>
          <path d="M21.4131 20.1016V2.39941" stroke="currentColor"></path>
          <path d="M4.13265 31.0323L21.4127 1.69895L38.6928 31.0323H4.13265Z" stroke="currentColor"></path>
          <path d="M10.7715 20.1357L32.0875 20.1357" stroke="currentColor"></path>
        </svg>
      </div>
      <p className="text-xs font-mono">Design Systems</p>
    </Link>
  )
}

export default Logo
