'use client'
import React, {useEffect, useRef} from 'react'
import {motion, Variants} from 'framer-motion'
import Marquee from 'react-fast-marquee'
import Link from 'next/link'
import Image from 'next/image'
import {FooterType} from '@/typings'
import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, ScrollTrigger)
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
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
      staggerChildren: 0.2,
      delayChildren: 0.8,
    },
  },
}

const footerSectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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
      delayChildren: 0.3,
    },
  },
}

const Footer: React.FC<{footer: FooterType}> = ({footer}) => {
  const [words, setWords] = React.useState<string[]>([])

  useEffect(() => {
    if (footer.newsletter?.title) {
      setWords(footer.newsletter.title.split(' '))
    }
  }, [footer.newsletter?.title])

  return (
    <div
      className="relative h-screen sm:h-screen md:h-[800px]"
      style={{clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)'}}
    >
      <div className="fixed bottom-0 h-full sm:h-screen md:h-[800px] w-full">
        <div>
          <footer className="bg-black text-white h-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true, amount: 0.2, margin: '0px 0px -200px 0px'}}
              className="flex flex-col gap-12 sm:gap-20 md:gap-32 pb-8 sm:pb-12 md:pb-[4.06rem] h-full justify-center px-4 sm:px-0"
            >
              <motion.div className="p-3 sm:p-4 md:p-5" variants={marqueeVariants}>
                <Marquee>
                  {Array.from({length: 10}).map((_, index) => (
                    <p
                      className="text-base sm:text-lg md:text-[1.375rem] text-white mr-4 sm:mr-5 md:mr-6 uppercase font-semibold"
                      key={index}
                    >
                      {footer.marquee?.text}
                    </p>
                  ))}
                </Marquee>
              </motion.div>

              <motion.div
                className="wrapper flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-6"
                variants={footerContentVariants}
              >
                <h2 className="w-full lg:max-w-[49.40131rem] text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[5rem] font-semibold leading-[110%] uppercase text-white-2 text-left">
                  {words.map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-[0.25em]"
                      initial={{
                        opacity: 0,
                        y: 100,
                        rotateX: -90,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                      }}
                      viewport={{once: true, amount: 0.8}}
                      transition={{
                        duration: 1,
                        ease: [0.175, 0.885, 0.32, 1.275],
                        delay: index * 0.05 + 1.2,
                      }}
                      style={{
                        display: 'inline-block',
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h2>

                <motion.form
                  action="#"
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto"
                  variants={{
                    hidden: {opacity: 0, x: 50},
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        ease: 'easeOut',
                      },
                    },
                  }}
                >
                  <motion.input
                    type="email"
                    placeholder={footer.newsletter?.inputPlaceholder}
                    className="w-full sm:max-w-[19.3125rem] min-h-[3.125rem] py-2 px-[0.9375rem] bg-white placeholder:text-black text-black text-sm md:text-base"
                    whileHover={{scale: 1.02}}
                    transition={{duration: 0.3, ease: 'easeOut'}}
                  />
                  <motion.button
                    type="submit"
                    className="min-h-[3.125rem] bg-white py-1 px-6 border border-white hover:bg-transparent hover:text-white transition-colors duration-200 flex items-center justify-center text-black uppercase text-sm font-medium flex-shrink-0 w-full sm:w-auto"
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
        </div>
      </div>
    </div>
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
            staggerChildren: 0.25,
            delayChildren: 0.6,
          },
        },
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[18.75rem] w-full">
        <motion.div className="flex-1" variants={linkVariants}>
          <h2 className="text-xl font-semibold">
            <Image
              src={(footer.logo as any).asset?.url}
              alt={footer?.logo.alt || 'Logo'}
              width={220}
              height={20}
              className="w-auto h-4 sm:h-5"
            />
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 flex-3"
          variants={footerSectionVariants}
        >
          <motion.div
            className="space-y-3 columns-1 w-full max-md:flex max-md:gap-4"
            variants={{
              hidden: {opacity: 0, y: 30},
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                  staggerChildren: 0.08,
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
                  className="text-white leading-[180%] text-sm md:text-base hover:text-gray-300 transition-colors duration-200"
                >
                  {navlink.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="space-y-3 columns-1 w-full max-md:flex max-md:gap-4"
            variants={{
              hidden: {opacity: 0, y: 30},
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                  staggerChildren: 0.08,
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
                  className="text-white leading-[180%] text-sm md:text-base hover:text-gray-300 transition-colors duration-200"
                >
                  {navlink.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="space-y-3 columns-1 w-full max-md:flex max-md:gap-4"
            variants={{
              hidden: {opacity: 0, y: 30},
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: 'easeOut',
                  staggerChildren: 0.08,
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
                  className="text-white leading-[180%] text-sm md:text-base hover:text-gray-300 transition-colors duration-200"
                >
                  {navlink.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mt-12 md:mt-16 pt-6 md:pt-8 gap-6"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.5,
            },
          },
        }}
      >
        <motion.div
          className="text-white leading-[160%] text-xs sm:text-sm text-center md:text-left"
          variants={linkVariants}
        >
          {footer.copyright}
        </motion.div>

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
                className="object-contain w-5 h-5 sm:w-6 sm:h-6"
                alt={social.platform}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
