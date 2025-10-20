'use client'
import Link from 'next/link'
import {motion, Variants, AnimatePresence} from 'framer-motion'
import {FC, useState} from 'react'
import {NavbarType} from '@/typings'
import Image from 'next/image'
import {usePathname} from 'next/navigation'

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const maskedTextVariants: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const borderVariants: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.4,
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

const navItemVariants: Variants = {
  hidden: {opacity: 0, y: -10},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

const underlineVariants: Variants = {
  initial: {scaleX: 0, originX: 0},
  hover: {
    scaleX: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  active: {
    scaleX: 1,
  },
}

const mobileMenuVariants: Variants = {
  hidden: {
    x: '100%',
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      delay: 0.5,
    },
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
}

const mobileNavItemVariants: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const Header: FC<{navbar: NavbarType}> = ({navbar}) => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav>
      <motion.div
        className="wrapper flex items-center justify-between pt-8 md:pt-16 pb-4 relative"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden z-20">
          <motion.div variants={maskedTextVariants}>
            <Link href="/" className="text-xl font-semibold">
              <Image
                src={(navbar.logo as any)?.asset?.url || ''}
                alt={navbar?.logo?.alt || 'Logo'}
                width={220}
                height={20}
                className="object-contain w-auto h-4 sm:h-5"
              />
            </Link>
          </motion.div>
        </div>

        <ul className="hidden lg:flex items-center gap-6">
          {navbar?.navLinks?.map((link, idx) => {
            const isActive =
              pathname === link.url || (link.url !== '/' && pathname.startsWith(link.url))

            return (
              <motion.li
                key={link.url}
                className="relative flex items-center"
                variants={navItemVariants}
              >
                {isActive ? (
                  <span
                    className="text-base xl:text-xl cursor-default relative"
                    style={{pointerEvents: 'none'}}
                  >
                    {link.text}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
                      variants={underlineVariants}
                      initial="initial"
                      animate="active"
                    />
                  </span>
                ) : (
                  <motion.div className="relative" initial="initial" whileHover="hover">
                    <Link href={link.url} className="text-base xl:text-xl">
                      {link.text}
                    </Link>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
                      variants={underlineVariants}
                    />
                  </motion.div>
                )}
              </motion.li>
            )
          })}

          <div className="w-[0.9375rem] h-px bg-black"></div>

          <motion.div className="flex space-x-4" variants={socialContainerVariants}>
            {navbar?.socialLinks?.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                className="text-black transition-colors duration-200"
                aria-label={social.platform}
                target="_blank"
                variants={socialVariants}
                whileHover={{scale: 1.1}}
              >
                <Image
                  src={(social?.icon as any).asset?.url}
                  alt={social.platform}
                  width={24}
                  height={24}
                  className="w-5 h-5 xl:w-6 xl:h-6"
                />
              </motion.a>
            ))}
          </motion.div>
        </ul>

        <motion.button
          className="lg:hidden z-20 flex flex-col gap-[5px] w-8 h-6 justify-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.5}}
        >
          <motion.span
            className="w-full h-px bg-black inline-block"
            animate={isMobileMenuOpen ? {rotate: 45, y: 8} : {rotate: 0, y: 0}}
            transition={{duration: 0.3}}
          />
          <motion.span
            className="w-full h-px bg-black inline-block"
            animate={isMobileMenuOpen ? {opacity: 0} : {opacity: 1}}
            transition={{duration: 0.3}}
          />
          <motion.span
            className="w-full h-px bg-black inline-block"
            animate={isMobileMenuOpen ? {rotate: -45, y: -8} : {rotate: 0, y: 0}}
            transition={{duration: 0.3}}
          />
        </motion.button>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
          variants={borderVariants}
          style={{originX: 0}}
        />
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={closeMobileMenu}
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-40 shadow-2xl lg:hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col h-full p-8 pt-24">
                <motion.ul
                  className="flex flex-col gap-6"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: {
                      transition: {
                        staggerChildren: 0.08,
                        staggerDirection: -1,
                      },
                    },
                    visible: {
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                >
                  {navbar?.navLinks?.map((link) => {
                    const isActive =
                      pathname === link.url || (link.url !== '/' && pathname.startsWith(link.url))

                    return (
                      <motion.li key={link.url} className="overflow-hidden">
                        <motion.div variants={mobileNavItemVariants}>
                          <Link
                            href={link.url}
                            className={`text-2xl font-medium text-black ${
                              isActive ? 'underline pointer-events-none' : ''
                            }`}
                            onClick={closeMobileMenu}
                          >
                            {link.text}
                          </Link>
                        </motion.div>
                      </motion.li>
                    )
                  })}
                </motion.ul>

                <motion.div
                  className="mt-auto pt-8 border-t border-gray-200"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{
                    duration: 0.3,
                    delay: isMobileMenuOpen ? 0.6 : 0,
                  }}
                >
                  <p className="text-sm text-gray-500 mb-4 uppercase font-semibold">Follow Us</p>
                  <div className="flex space-x-6">
                    {navbar?.socialLinks?.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="text-black hover:text-gray-600 transition-colors duration-200"
                        aria-label={social.platform}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={(social?.icon as any).asset?.url}
                          alt={social.platform}
                          width={28}
                          height={28}
                          className="w-7 h-7"
                        />
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Header
