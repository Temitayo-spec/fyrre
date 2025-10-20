'use client'
import CustomPortableText from '@/app/components/PortableText'
import {Instagram, Twitter, Youtube} from '@/app/components/shared/Icons'
import {formatDate} from '@/lib'
import {MagazineDetailQueryResult} from '@/sanity.types'
import Image from 'next/image'
import {FC, useEffect, useRef, useState} from 'react'
import {motion} from 'framer-motion'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const MagazineDetailsCoreSection: FC<{magazine: MagazineDetailQueryResult}> = ({magazine}) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const asideRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  const socialLinks = [
    {
      icon: <Instagram />,
      href: magazine?.socialShare?.instagram,
      label: 'Instagram',
    },
    {
      icon: <Twitter />,
      href: magazine?.socialShare?.twitter,
      label: 'X',
    },
    {
      icon: <Youtube />,
      href: magazine?.socialShare?.youtube,
      label: 'YouTube',
    },
  ].filter((link) => link.href)

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
    <section className="relative" ref={sectionRef}>
      <div className="max-w-[65rem] w-full mx-auto flex flex-col md:flex-row gap-8 md:gap-16 pt-12 md:pt-24 pb-24 md:pb-48 px-4 md:px-0">
        <aside ref={asideRef} className="w-full md:max-w-[20rem] flex flex-col">
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.6, ease: 'easeOut'}}
            className="pb-6 md:pb-8 border-b border-black mb-6 md:mb-8 flex items-center gap-4"
          >
            <motion.div
              initial={{opacity: 0, scale: 0.8}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.6, delay: 0.1, ease: 'easeOut'}}
              className="w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem] rounded-full overflow-hidden flex-shrink-0"
            >
              <Image
                src={magazine?.author?.image?.asset?.url as string}
                alt={magazine?.author?.image?.alt || magazine?.author?.name || 'Author'}
                className="w-full h-full object-cover"
                width={80}
                height={80}
                placeholder="blur"
                blurDataURL={magazine?.author?.image?.asset?.metadata?.lqip as string}
              />
            </motion.div>
            <motion.h3
              initial={{opacity: 0, x: -10}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.6, delay: 0.2, ease: 'easeOut'}}
              className="text-[1.5rem] md:text-[2rem] leading-[120%] max-w-[14.3125rem] font-semibold"
            >
              {magazine?.author?.name}
            </motion.h3>
          </motion.div>

          <div className="flex flex-col gap-3 md:gap-4">
            <motion.div
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.5, delay: 0.3, ease: 'easeOut'}}
              className="flex items-center justify-between"
            >
              <p className="text-sm md:text-base leading-[180%] font-semibold">Date</p>
              <p className="text-sm md:text-base leading-[180%]">
                {formatDate(magazine?.publishedAt as string)}
              </p>
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 10}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.5, delay: 0.4, ease: 'easeOut'}}
              className="flex items-center justify-between"
            >
              <p className="text-sm md:text-base leading-[180%] font-semibold">Read</p>
              <p className="text-sm md:text-base leading-[180%]">{magazine?.duration} Min</p>
            </motion.div>

            {socialLinks.length > 0 && (
              <motion.div
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.5, delay: 0.5, ease: 'easeOut'}}
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
                        delay: 0.6 + index * 0.1,
                        ease: 'easeOut',
                      }}
                      whileHover={{scale: 1.1}}
                      href={social.href as string}
                      className="text-black transition-colors duration-200 hover:opacity-70"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </aside>

        <article className="flex-1 w-full">
          {magazine?.content && <CustomPortableText value={magazine.content as any} />}
        </article>
      </div>
    </section>
  )
}

export default MagazineDetailsCoreSection
