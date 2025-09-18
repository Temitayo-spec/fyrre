import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav>
      <div className="wrapper flex items-center pt-16 pb-4 border-b border-b-black">
        <Link href="/" className="text-lg font-semibold">FYRRE MAGAZINE</Link>

        <div></div>
      </div>
    </nav>
  )
}

export default Header
