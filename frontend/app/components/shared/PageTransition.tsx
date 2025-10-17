'use client'
import {useEffect, useRef, forwardRef} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {gsap} from 'gsap'
import { Logo } from './HeroTexts'

const PageTransition = ({children}: {children: React.ReactNode}) => {
  const router = useRouter()
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoOverlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement | null>(null)
  const blocksRef = useRef<HTMLDivElement[]>([])
  const isTransitioning = useRef(false)

  useEffect(() => {
    const createBlocks = () => {
      if (!overlayRef.current) return

      overlayRef.current.innerHTML = ''
      blocksRef.current = []

      for (let i = 0; i < 20; i++) {
        const block = document.createElement('div')
        block.className = 'block'
        overlayRef.current.appendChild(block)
        blocksRef.current.push(block)
      }
    }

    createBlocks()

    gsap.set(blocksRef.current, {scaleX: 0, transformOrigin: 'left'})

    if (logoRef.current) {
      const paths = logoRef.current.querySelectorAll('path')

      paths.forEach((path) => {
        const length = path.getTotalLength()

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: 'transparent',
          stroke: '#e3e4d8',
          strokeWidth: 1,
        })
      })
    }

    revealPage()

    const handleRouteChange = (url: string) => {
      if (isTransitioning.current) return
      isTransitioning.current = true
      coverPage(url)
    }

    const links = document.querySelectorAll('a[href^="/"]')

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.currentTarget as HTMLAnchorElement | null
        if (!target) return
        const href = target.href
        const url = new URL(href).pathname
        if (url && url !== pathname) {
          handleRouteChange(url)
        }
      })
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleRouteChange as unknown as EventListener)
      })
    }
  }, [pathname, router])

  const coverPage = (url: string) => {
    const paths = logoRef.current?.querySelectorAll('path')
    if (!paths) return

    const tl = gsap.timeline({
      defaults: {ease: 'power2.inOut'},
      onComplete: () => {
        router.push(url)
      },
    })

    tl.to(blocksRef.current, {
      scaleX: 1,
      stagger: 0.02,
      duration: 0.4,
      transformOrigin: 'left',
    })
      .set(logoOverlayRef.current, {opacity: 1}, '-=0.2')
      .set(
        paths as unknown as GSAPTweenTarget,
        {
          strokeDashoffset: (i: number, target: SVGPathElement) => target.getTotalLength(),
          fill: 'transparent',
          stroke: '#e3e4d8',
          strokeWidth: 1,
        },
        '-=0.25',
      )
      .to(
        paths as unknown as GSAPTweenTarget,
        {
          strokeDashoffset: 0,
          ease: 'power2.inOut',
          duration: 1.5,
          stagger: 0.02,
        },
        '-=0.5',
      )
      .to(
        paths as unknown as GSAPTweenTarget,
        {
          fill: '#e3e4d8',
          duration: 0.5,
          stagger: 0.01,
        },
        '-=0.5',
      )
      .to(logoOverlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
      })
  }

  const revealPage = () => {
    gsap.set(blocksRef.current, {scaleX: 1, transformOrigin: 'right'})

    gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.out',
      transformOrigin: 'right',
      onComplete: () => {
        isTransitioning.current = false
      },
    })
  }

  return (
    <>
      <div className="transition-overlay" ref={overlayRef}></div>
      <div className="logo-overlay" ref={logoOverlayRef}>
        <div className="logo-container">
          <Logo ref={logoRef} />
        </div>
      </div>
      {children}
    </>
  )
}

export default PageTransition
