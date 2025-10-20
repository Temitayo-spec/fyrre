'use client'
import CustomPortableText from '@/app/components/PortableText'
import {
  AppleIcon,
  Instagram,
  SoundcloudIcon,
  SpotifyIcon,
  Twitter,
  Youtube,
} from '@/app/components/shared/Icons'
import {LineReveal} from '@/app/components/shared/LineReveal'
import {formatDate} from '@/lib'
import arrow from '@/public/svgs/arrow.svg'
import {PodcastDetailQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import {FC, useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PodcastDetailsSection: FC<{podcast: PodcastDetailQueryResult}> = ({podcast}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const asideRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const socialLinks = [
    {icon: <Instagram />, href: podcast?.socialShare?.instagram!, label: 'Instagram'},
    {icon: <Twitter />, href: podcast?.socialShare?.twitter!, label: 'X'},
    {icon: <Youtube />, href: podcast?.socialShare?.youtube!, label: 'YouTube'},
  ]

  const platforms = [
    {icon: <SpotifyIcon />, href: podcast?.podcastLinks?.spotify as string, label: 'Spotify'},
    {icon: <AppleIcon />, href: podcast?.podcastLinks?.apple as string, label: 'Apple Podcasts'},
    {
      icon: <SoundcloudIcon />,
      href: podcast?.podcastLinks?.soundcloud as string,
      label: 'Soundcloud',
    },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !asideRef.current || isMobile)
      return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: asideRef.current,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section className="mb-24 md:mb-48 pt-4 md:pt-6" ref={sectionRef}>
      <div className="max-w-[75rem] w-[90%] mx-auto flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24">
        <aside ref={asideRef} className="max-w-full md:max-w-[21.875rem] w-full">
          <motion.div
            initial={{opacity: 0, scale: 0.95}}
            whileInView={{opacity: 1, scale: 1}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.8, ease: [0.33, 1, 0.68, 1]}}
            className="relative max-w-full md:max-w-[21.875rem] flex-1 mb-6 md:mb-8"
          >
            <Image
              src={podcast?.thumbnail?.asset?.url as string}
              alt="podcast"
              className="object-cover w-full h-auto aspect-square md:h-[21.875rem] group-hover:brightness-110 transition-all duration-300"
              quality={100}
              placeholder="blur"
              blurDataURL={podcast?.thumbnail?.asset?.metadata?.lqip as string}
              width={500}
              height={500}
            />

            <motion.div
              initial={{opacity: 0, y: -10}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.6, delay: 0.2, ease: 'easeOut'}}
              className="absolute top-3 left-3 md:top-4 md:left-4"
            >
              <h3 className="text-[1.5rem] sm:text-[2rem] md:text-[2.73438rem] uppercase font-semibold text-white">
                Fyrre
              </h3>
              <p className="text-[0.75rem] sm:text-[1rem] md:text-[1.36719rem] uppercase font-semibold text-white -translate-y-2 md:-translate-y-3 inline-flex">
                Podcast
              </p>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.6, delay: 0.3, ease: 'easeOut'}}
              className="absolute bottom-3 md:bottom-[1.47rem] px-3 md:px-4 flex items-end justify-between w-full"
            >
              <h4 className="text-base sm:text-lg md:text-[1.36719rem] font-semibold text-white uppercase">
                EP{podcast?.episodeNumber || '05'}
              </h4>
              <Image src={arrow} alt="arrow" className="w-6 sm:w-8 md:w-[2.72669rem]" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.6, delay: 0.2, ease: 'easeOut'}}
            className="flex items-center justify-between mb-8 md:mb-12"
          >
            <motion.p
              initial={{opacity: 0, x: -10}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.5, delay: 0.3, ease: 'easeOut'}}
              className="text-base md:text-xl font-semibold leading-[160%]"
            >
              Listen On
            </motion.p>

            <div className="flex items-center gap-3 md:gap-4">
              {platforms.map((platform, index) => (
                <motion.div
                  key={index}
                  initial={{opacity: 0, scale: 0.8}}
                  whileInView={{opacity: 1, scale: 1}}
                  viewport={{once: true, amount: 0.3}}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                    ease: 'easeOut',
                  }}
                  whileHover={{scale: 1.15}}
                  whileTap={{scale: 0.95}}
                >
                  <Link
                    href={platform.href || '#'}
                    aria-label={platform.label}
                    target="_blank"
                    rel="noopener"
                    className="block"
                  >
                    <div className="scale-90 md:scale-100">{platform.icon}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.6, delay: 0.4, ease: 'easeOut'}}
            className="pt-6 md:pt-8 border-t border-black"
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <motion.div
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.5, delay: 0.5, ease: 'easeOut'}}
                className="flex items-center justify-between"
              >
                <p className="text-sm md:text-base leading-[180%] font-semibold">Date</p>
                <p className="text-sm md:text-base leading-[180%]">
                  {formatDate(podcast?.publishedAt as string)}
                </p>
              </motion.div>

              <motion.div
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.5, delay: 0.6, ease: 'easeOut'}}
                className="flex items-center justify-between"
              >
                <p className="text-sm md:text-base leading-[180%] font-semibold">Duration</p>
                <p className="text-sm md:text-base leading-[180%]">{podcast?.duration}</p>
              </motion.div>

              <motion.div
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.5, delay: 0.7, ease: 'easeOut'}}
                className="flex items-center justify-between"
              >
                <p className="text-sm md:text-base leading-[180%] font-semibold">Share</p>

                <div className="flex space-x-3 md:space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      initial={{opacity: 0, scale: 0.8}}
                      whileInView={{opacity: 1, scale: 1}}
                      viewport={{once: true, amount: 0.3}}
                      transition={{
                        duration: 0.4,
                        delay: 0.8 + index * 0.1,
                        ease: 'easeOut',
                      }}
                      whileHover={{scale: 1.15, rotate: 5}}
                      whileTap={{scale: 0.95}}
                      href={social?.href as string}
                      className="text-black transition-colors duration-200"
                      aria-label={social.label}
                      target="_blank"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </aside>

        <div className="space-y-12 md:space-y-16 flex-2 w-full">
          <header className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-sm md:text-base font-semibold uppercase">
                <LineReveal
                  text={`Episode ${podcast?.episodeNumber}`}
                  className="text-sm md:text-base font-semibold uppercase"
                />
              </h4>
              <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.25rem] font-semibold leading-[100%] uppercase">
                <LineReveal
                  text={podcast?.title as string}
                  className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.25rem] font-semibold leading-[100%] uppercase"
                  delay={0.3}
                />
              </h2>
            </div>

            <p className="font-medium text-base sm:text-lg md:text-[1.375rem] leading-[180%]">
              <LineReveal
                text={podcast?.excerpt as string}
                className="font-medium text-base sm:text-lg md:text-[1.375rem] leading-[180%]"
                delay={0.5}
              />
            </p>
          </header>

          <article className="flex-1">
            {podcast?.content && <CustomPortableText value={podcast.content as any} />}
          </article>
        </div>
      </div>
    </section>
  )
}

export default PodcastDetailsSection
