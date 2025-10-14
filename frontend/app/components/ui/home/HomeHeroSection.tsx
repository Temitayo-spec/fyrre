'use client'
import {FC, useEffect, useRef} from 'react'
import Marquee from 'react-fast-marquee'
import hero_banner from '@/public/images/hero_banner.jpg'
import Image from 'next/image'
import gsap from 'gsap'
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin'
import {SplitText} from 'gsap/SplitText'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {HeroSection} from '@/sanity.types'
import { formatDate } from '@/lib'

gsap.registerPlugin(DrawSVGPlugin, SplitText, ScrollTrigger)

const HomeHeroSection: FC<{props: HeroSection}> = ({props}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.set('.hero_text path', {
        fill: 'none',
        stroke: 'black',
        strokeWidth: 2,
        drawSVG: '0%',
        opacity: 0,
      })

      masterTl
        .to('.hero_text path', {
          opacity: 1,
          drawSVG: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
          stagger: {
            each: 0.08,
            from: 'start',
          },
        })
        .to(
          '.hero_text path',
          {
            fill: 'black',
            stroke: 'transparent',
            strokeWidth: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: {
              each: 0.03,
              from: 'start',
            },
          },
          '-=0.5',
        )

      const marqueeContent = marqueeRef.current
      if (marqueeContent) {
        masterTl
          .from(
            marqueeContent,
            {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 1,
              ease: 'power3.out',
            },
            '-=0.8',
          )
          .from(
            marqueeContent.querySelectorAll('h3, p'),
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
            },
            '-=0.5',
          )
      }

      const heroHeading = new SplitText('.split_hero_text', {
        type: 'lines,words,chars',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
      })

      gsap.set('.split_hero_text', {perspective: 400})

      masterTl.from(
        heroHeading.words,
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: {
            each: 0.05,
            from: 'start',
          },
          duration: 1,
          ease: 'back.out(1.7)',
        },
        '-=0.5',
      )

      const paragraph = new SplitText('.split', {
        type: 'lines,words',
        linesClass: 'split-line-p',
      })

      gsap.set(paragraph.lines, {overflow: 'hidden'})

      masterTl.from(
        paragraph.words,
        {
          y: 100,
          opacity: 0,
          stagger: {
            each: 0.02,
            from: 'start',
          },
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3',
      )

      masterTl
        .from(
          '.meta-info > div',
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4',
        )
        .from(
          '.label-badge',
          {
            scale: 0,
            rotation: -180,
            duration: 0.6,
            ease: 'back.out(1.7)',
          },
          '-=0.3',
        )

      if (imageRef.current) {
        masterTl.from(
          imageRef.current.querySelector('img'),
          {
            scale: 1.3,
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out',
          },
          '-=0.5',
        )

        gsap.to(imageRef.current.querySelector('img'), {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }

      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
      })

      return () => {
        heroHeading.revert()
        paragraph.revert()
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="overflow-hidden">
      <div className="wrapper">
        <div className="py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1520"
            height="216"
            viewBox="0 0 1520 216"
            fill="none"
            className="w-full h-full hero_text"
          >
            <path
              d="M160.207 212.622H208.476L129.113 0H79.9553L0 212.622H45.308L61.5952 167.018H144.216L160.207 212.622ZM103.35 49.1577L131.778 131.186H74.3288L103.35 49.1577Z"
              fill="none"
            />
            <path
              d="M279.39 212.622V137.405H307.523L355.496 212.622H409.095L354.311 130.594C384.517 120.525 402.284 97.7232 402.284 68.9985C402.284 24.875 371.191 0 317.591 0H234.378V212.622H279.39ZM279.39 37.3125H315.518C342.762 37.3125 357.273 47.9732 357.273 68.9985C357.273 89.7276 342.762 100.388 315.518 100.388H279.39V37.3125Z"
              fill="none"
            />
            <path
              d="M528.688 212.622V40.5699H595.91V0H416.751V40.5699H483.676V212.622H528.688Z"
              fill="none"
            />
            <path
              d="M759.865 96.5387C746.539 82.0283 740.616 74.0327 740.616 63.0759C740.616 50.9345 749.204 42.3467 760.753 42.3467C772.894 42.3467 781.482 49.75 782.963 63.6681H821.164C820.868 31.0937 796.881 9.47619 760.753 9.47619C724.921 9.47619 698.269 31.9821 698.269 62.7797C698.269 74.9211 701.823 85.5818 709.226 95.9464C686.72 108.68 673.098 127.632 673.098 150.138C673.098 189.82 701.527 215.287 745.947 215.287C765.491 215.287 783.555 207.884 799.546 193.966L817.018 212.622H867.656L823.237 164.649C832.121 148.065 838.043 127.632 838.339 109.865H800.731C800.435 119.341 799.546 128.817 797.769 137.405L759.865 96.5387ZM712.484 147.769C712.484 135.628 719.295 125.856 730.252 120.229L778.521 171.46C770.229 178.271 759.865 181.824 748.908 181.824C724.921 181.824 712.484 166.722 712.484 147.769Z"
              fill="none"
            />
            <path d="M1089.26 212.622V172.052H996.871V0H951.859V212.622H1089.26Z" fill="none" />
            <path d="M1165.18 212.622V0H1120.17V212.622H1165.18Z" fill="none" />
            <path
              d="M1253.67 212.622V131.482H1331.55V92.6889H1253.67V39.0893H1346.06V0H1208.66V212.622H1253.67Z"
              fill="none"
            />
            <path
              d="M1520 173.533H1421.98V122.598H1509.04V83.805H1421.98V39.0893H1517.93V0H1376.97V212.622H1520V173.533Z"
              fill="none"
            />
          </svg>
        </div>

        <div ref={marqueeRef} className="bg-black p-5 gap-6 flex items-center overflow-hidden">
          <div className="flex-shrink-0">
            <h3 className="text-[1.375rem] text-white font-semibold uppercase">
              {props.newsTicker?.label}
            </h3>
          </div>
          <div className="flex-1">
            <Marquee gradient={false} className="overflow-hidden">
              {props.newsTicker?.items.map((item, index) => (
                <p className="text-xl text-white mr-6" key={index}>
                  {item.text}
                </p>
              ))}
            </Marquee>
          </div>
        </div>

        <div className="mt-[4.73rem] flex items-center gap-12">
          <h2 className="text-[6.5vw] font-semibold leading-[110%] uppercase text-black flex-1 split_hero_text">
            {props.heroHeading}
          </h2>

          <div className="space-y-16 flex-1">
            <p className="text-lg leading-[180%] text-black split">{props?.description}</p>

            <div className="flex items-center justify-between meta-info">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold leading-[160%]">
                    {props.metadata?.author?.label}
                  </h4>
                  <p className="text-sm leading-[160%]">{props.metadata?.author?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold leading-[160%]">
                    {props.metadata?.date?.label}
                  </h4>
                  <p className="text-sm leading-[160%]">{formatDate(props.metadata?.date?.value as string)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold leading-[160%]">
                    {props?.metadata?.duration?.label}
                  </h4>
                  <p className="text-sm leading-[160%]">{props?.metadata?.duration?.value}</p>
                </div>
              </div>

              <div className="grid place-items-center text-xs uppercase py-2 px-3 border border-black rounded-full label-badge">
                {props?.label?.text}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative min-h-[44.5rem] max-h-[45rem] overflow-hidden mt-12"
        >
          <Image
            src={(props.heroImage as any)?.asset?.url ?? ''}
            alt="hero banner"
            className="w-full h-full object-cover will-change-transform object-top"
            width={1440}
            height={1000}
          />
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection
