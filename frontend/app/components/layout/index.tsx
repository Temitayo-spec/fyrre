import React, {FC} from 'react'
import {Header, Footer} from '../'
import {ReactLenis} from 'lenis/react'
import {FooterType, NavbarType} from '@/typings'
import PageTransition from '../shared/PageTransition'

const Layout: FC<{navbar: NavbarType; footer: FooterType; children: React.ReactNode}> = ({
  navbar,
  footer,
  children,
}) => {
  return (
    <main>
      <ReactLenis root />
      <Header navbar={navbar} />
      {children}
      <Footer footer={footer} />
    </main>
  )
}

export default Layout
