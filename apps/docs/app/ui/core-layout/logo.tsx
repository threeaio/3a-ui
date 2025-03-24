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
        {/* <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="3.63 1.2 35.56 30.33">
          <path d="M21.4131 20.1016L4.51416 30.9521" stroke="currentColor"></path>
          <path d="M21.4131 20.1016L38.3447 30.75" stroke="currentColor"></path>
          <path d="M21.4131 20.1016V2.39941" stroke="currentColor"></path>
          <path d="M4.13265 31.0323L21.4127 1.69895L38.6928 31.0323H4.13265Z" stroke="currentColor"></path>
          <path d="M10.7715 20.1357L32.0875 20.1357" stroke="currentColor"></path>
        </svg> */}
        <svg xmlns="http://www.w3.org/2000/svg" className="size-10" fill="none" viewBox="4.42 1.04 32.28 28.89">
          <g opacity="0.4">
            <path
              d="M8.97709 23.8573L16.7113 23.8573L33.1022 23.8573M25.6162 1.73564C24.0144 0.810832 21.9662 1.35965 21.0413 2.96147L12.8442 17.1593L8.97712 23.8573L16.7114 23.8573L33.1023 23.8573C34.9519 23.8573 36.4513 22.3579 36.4513 20.5083C36.4513 18.6587 34.9519 17.1593 33.1023 17.1593L20.5785 17.1593L26.842 6.3105C27.7668 4.70868 27.218 2.66045 25.6162 1.73564Z"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
            ></path>
          </g>
          <g opacity="0.7">
            <path
              d="M32.1449 23.8573L28.2778 17.1593L20.0824 2.96434M4.66745 20.5083C4.66745 22.3579 6.16686 23.8573 8.01648 23.8573L24.4107 23.8573L32.1449 23.8573L28.2778 17.1592L20.0824 2.9643C19.1576 1.36249 17.1093 0.813666 15.5075 1.73847C13.9057 2.66328 13.3569 4.71151 14.2817 6.31333L20.5436 17.1592L8.01648 17.1592C6.16686 17.1592 4.66745 18.6586 4.66745 20.5083Z"
              stroke="currentColor"
              strokeWidth="0.7"
              strokeLinecap="round"
            ></path>
          </g>
          <path
            d="M20.5166 3.75896L16.6495 10.457L8.45404 24.6519M31.355 29.2297C32.9568 28.3049 33.5056 26.2566 32.5808 24.6548L24.3837 10.457L20.5166 3.75898L16.6494 10.457L8.45401 24.6519C7.52921 26.2538 8.07803 28.302 9.67984 29.2268C11.2817 30.1516 13.3299 29.6028 14.2547 28.001L20.5166 17.1551L26.7801 28.0039C27.7049 29.6057 29.7531 30.1545 31.355 29.2297Z"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeLinecap="round"
          ></path>
        </svg>
      </div>
      {/* <p className="text-xs font-mono">Design Systems</p> */}
    </Link>
  )
}

export default Logo
