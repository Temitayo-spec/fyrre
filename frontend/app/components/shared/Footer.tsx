'use client'
import React, {useEffect, useRef} from 'react'
import {motion, Variants} from 'framer-motion'
import Marquee from 'react-fast-marquee'
import Link from 'next/link'
import Image from 'next/image'
import {FooterType} from '@/typings'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const marqueeVariants: Variants = {
  hidden: {opacity: 0, x: -100},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const footerContentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.4,
    },
  },
}

const footerSectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const linkVariants: Variants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const socialVariants: Variants = {
  hidden: {opacity: 0, scale: 0.8},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

const socialContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const Footer: React.FC<{footer: FooterType}> = ({footer}) => {
  const footerTextRef = useRef<HTMLHeadingElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const initGSAPAnimation = async () => {
      if (hasAnimated.current || !footerTextRef.current) return

      try {
        const gsap = (await import('gsap')).default
        const {SplitText} = await import('gsap/SplitText')

        gsap.registerPlugin(SplitText)

        const heroHeading = new SplitText(footerTextRef.current, {
          type: 'lines,words,chars',
          linesClass: 'split-line',
          wordsClass: 'split-word',
          charsClass: 'split-char',
        })

        gsap.set(footerTextRef.current, {perspective: 400})

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerTextRef.current,
            start: 'top 80%',
            once: true,
          },
        })

        tl.from(heroHeading.words, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: {
            each: 0.05,
            from: 'start',
          },
          duration: 1,
          ease: 'back.out(1.7)',
        })

        hasAnimated.current = true
      } catch (error) {
        console.log('GSAP not available, using Framer Motion fallback')
      }
    }

    initGSAPAnimation()
  }, [])

  return (
    <footer className="bg-black text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, amount: 0.2}}
        className="flex flex-col gap-32 pb-[4.06rem]"
      >
        <motion.div className="p-5" variants={marqueeVariants}>
          <Marquee>
            {Array.from({length: 10}).map((_, index) => (
              <p className="text-[1.375rem] text-white mr-6 uppercase font-semibold" key={index}>
                {footer.marquee?.text}
              </p>
            ))}
          </Marquee>
        </motion.div>

        <motion.div
          className="wrapper flex items-center justify-between gap-6"
          variants={footerContentVariants}
        >
          <h2
            ref={footerTextRef}
            className="split_hero_text max-w-[49.40131rem] text-[5rem] font-semibold leading-[110%] uppercase text-white-2"
          >
            {footer.newsletter?.title}
          </h2>

          <motion.h2
            className="gsap-fallback max-w-[49.40131rem] text-[5rem] font-semibold leading-[110%] uppercase text-white-2"
            variants={{
              hidden: {opacity: 0},
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.2,
                },
              },
            }}
            style={{display: 'none'}}
          >
            {'Design News to your inbox'.split(' ').map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-[0.5em] overflow-hidden"
                variants={{
                  hidden: {y: '100%', rotateX: -90},
                  visible: {
                    y: '0%',
                    rotateX: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.form
            action="#"
            className="flex items-center gap-3"
            variants={{
              hidden: {opacity: 0, x: 50},
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: 0.4,
                },
              },
            }}
          >
            <motion.input
              type="email"
              placeholder={footer.newsletter?.inputPlaceholder}
              className="max-w-[19.3125rem] min-h-[3.125rem] w-full py-2 px-[0.9375rem] bg-white placeholder:text-black text-black"
              whileHover={{scale: 1.02}}
              transition={{duration: 0.3, ease: 'easeOut'}}
            />
            <motion.button
              type="submit"
              className="min-h-[3.125rem] bg-white py-1 px-6 border border-white hover:bg-transparent hover:text-white transition-colors duration-200 flex items-center justify-center text-black uppercase text-sm font-medium flex-shrink-0"
              whileHover={{scale: 1.02}}
              transition={{duration: 0.3, ease: 'easeOut'}}
            >
              {footer.newsletter?.buttonText}
            </motion.button>
          </motion.form>
        </motion.div>

        <FooterBottom footer={footer} />
      </motion.div>
    </footer>
  )
}

export default Footer

const FooterBottom: React.FC<{footer: FooterType}> = ({footer}) => {
  return (
    <motion.div
      className="wrapper"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.3}}
    >
      {/* Brand Section */}
      <div className="flex gap-[18.75rem] w-full">
        <motion.div className="flex-1" variants={linkVariants}>
          <h2 className="text-xl font-semibold">
            <Image
              src={(footer.logo as any).asset?.url}
              alt={footer?.logo.alt || 'Logo'}
              width={220}
              height={20}
            />
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 flex-3"
          variants={footerSectionVariants}
        >
          {/* Navigation Links with Sequential Stagger */}
          <motion.div
            className="space-y-3 columns-1 w-full"
            variants={{
              hidden: {opacity: 0, y: 30},
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {footer?.navLinks?.slice(0, 3).map((navlink, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {opacity: 0, x: -20},
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.4,
                      ease: 'easeOut',
                    },
                  },
                }}
                whileHover={{x: 5}}
              >
                <Link
                  href={navlink.url}
                  className="text-white leading-[180%] text-base hover:text-gray-300 transition-colors duration-200"
                >
                  {navlink.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="space-y-3 columns-1 w-full"
            variants={{
              hidden: {opacity: 0, y: 30},
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {footer?.navLinks?.slice(3, 6).map((navlink, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {opacity: 0, x: -20},
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.4,
                      ease: 'easeOut',
                    },
                  },
                }}
                whileHover={{x: 5}}
              >
                <Link
                  href={navlink.url}
                  className="text-white leading-[180%] text-base hover:text-gray-300 transition-colors duration-200"
                >
                  {navlink.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="space-y-3 columns-1 w-full"
            variants={{
              hidden: {opacity: 0, y: 30},
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {footer?.navLinks?.slice(6, 9).map((navlink, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {opacity: 0, x: -20},
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.4,
                      ease: 'easeOut',
                    },
                  },
                }}
                whileHover={{x: 5}}
              >
                <Link
                  href={navlink.url}
                  className="text-white leading-[180%] text-base hover:text-gray-300 transition-colors duration-200"
                >
                  {navlink.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.4,
            },
          },
        }}
      >
        {/* Copyright */}
        <motion.div
          className="text-white leading-[160%] text-sm mb-6 md:mb-0"
          variants={linkVariants}
        >
          {footer.copyright}
        </motion.div>

        {/* Social Links */}
        <motion.div className="flex space-x-4" variants={socialContainerVariants}>
          {footer?.socialLinks?.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label={social.platform}
              target="_blank"
              variants={socialVariants}
              whileHover={{scale: 1.1}}
            >
              <Image
                src={(social?.icon as any)?.asset?.url || ''}
                width={24}
                height={24}
                className="object-contain"
                alt={social.platform}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
