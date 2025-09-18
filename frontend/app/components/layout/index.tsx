import React, {FC} from 'react'
import {Header, Footer} from '../'
import {ReactLenis} from 'lenis/react'

const Layout: FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <main>
      <ReactLenis root />
      <Header />
      {children}
      <Footer />
    </main>
  )
}

export default Layout
