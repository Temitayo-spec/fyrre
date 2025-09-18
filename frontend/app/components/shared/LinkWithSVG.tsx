import Link from 'next/link'
import React, {FC} from 'react'

const LinkWithSVG: FC<{text: string; href: string}> = ({text, href}) => {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-base font-semibold uppercase">
      {text}
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M16.172 11.2873L10.808 5.92328L12.222 4.50928L20 12.2873L12.222 20.0653L10.808 18.6513L16.172 13.2873H4V11.2873H16.172Z"
            fill="black"
          />
        </svg>
      </span>
    </Link>
  )
}

export default LinkWithSVG
