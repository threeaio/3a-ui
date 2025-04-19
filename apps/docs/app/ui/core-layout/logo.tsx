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
        {/* <svg width="1266" height="1079" viewBox="0 0 1266 1079" fill="none" className="size-12 max-w-[90%]" xmlns="http://www.w3.org/2000/svg">
<path d="M81.4756 938.627L509.696 191.716C570.129 86.3082 704.569 49.8485 809.977 110.281L862.261 140.257L324.617 1078.03L81.4756 938.627Z" fill="#171C1A"/>
<path d="M81.4756 938.627L509.696 191.716C570.129 86.3082 704.569 49.8485 809.977 110.281L862.261 140.257L324.617 1078.03L81.4756 938.627Z" fill="#171C1A"/>
<path d="M81.4756 938.627L509.696 191.716C570.129 86.3082 704.569 49.8485 809.977 110.281L862.261 140.257L324.617 1078.03L81.4756 938.627Z" fill="#171C1A"/>
<path d="M491.166 938.627L716.137 546.229C776.569 440.821 911.01 404.361 1016.42 464.794L1068.7 494.769L734.308 1078.03L491.166 938.627Z" fill="#171C1A"/>
<path d="M491.166 938.627L716.137 546.229C776.569 440.821 911.01 404.361 1016.42 464.794L1068.7 494.769L734.308 1078.03L491.166 938.627Z" fill="#171C1A"/>
<path d="M491.166 938.627L716.137 546.229C776.569 440.821 911.01 404.361 1016.42 464.794L1068.7 494.769L734.308 1078.03L491.166 938.627Z" fill="#171C1A"/>
<path d="M895.119 928.607L912.833 897.711C973.265 792.303 1107.71 755.843 1213.11 816.276L1265.4 846.252L1138.26 1068.01L895.119 928.607Z" fill="#171C1A"/>
<path d="M895.119 928.607L912.833 897.711C973.265 792.303 1107.71 755.843 1213.11 816.276L1265.4 846.252L1138.26 1068.01L895.119 928.607Z" fill="#171C1A"/>
<path d="M895.119 928.607L912.833 897.711C973.265 792.303 1107.71 755.843 1213.11 816.276L1265.4 846.252L1138.26 1068.01L895.119 928.607Z" fill="#171C1A"/>
<path d="M475.093 816.455L234.122 672.552L0.698242 1078.78H320.066L475.093 816.455Z" fill="#171C1A"/>
<path d="M884.465 816.455L643.494 672.552L410.07 1078.78H729.438L884.465 816.455Z" fill="#171C1A"/>
<path d="M1139.74 1065.44L895.589 928.556L806.833 1078.78H1131.54L1139.74 1065.44Z" fill="#171C1A"/>
</svg> */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="size-12 max-w-[90%]"
          viewBox="0.1 0.41 1185.93 1077.17"
        >
          <rect
            x="0.0979004"
            y="938.181"
            width="1080.96"
            height="280.268"
            rx="140.134"
            transform="rotate(-60.1734 0.0979004 938.181)"
            fill="currentColor"
          ></rect>
          <rect
            x="409.789"
            y="938.181"
            width="672.315"
            height="280.268"
            rx="140.134"
            transform="rotate(-60.1734 409.789 938.181)"
            fill="currentColor"
          ></rect>
          <rect
            x="807.997"
            y="938.181"
            width="271.197"
            height="280.268"
            rx="135.599"
            transform="rotate(-60.1734 807.997 938.181)"
            fill="currentColor"
          ></rect>
        </svg>
      </div>
      {/* <p className="text-xs font-mono">Design Systems</p> */}
    </Link>
  )
}

export default Logo
