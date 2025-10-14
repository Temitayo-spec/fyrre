'use client'
import Link from 'next/link'
import {motion, Variants} from 'framer-motion'
import {Instagram, RSS, Twitter, Youtube} from './Icons'
import {FC} from 'react'
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

const socialLinks = [
  {icon: <Instagram />, href: 'https://instagram.com', label: 'Instagram'},
  {icon: <Twitter />, href: 'https://x.com', label: 'X'},
  {icon: <Youtube />, href: 'https://youtube.com', label: 'YouTube'},
  {icon: <RSS />, href: '/rss', label: 'RSS Feed'},
]

const Header: FC<{navbar: NavbarType}> = ({navbar}) => {
  const pathname = usePathname()
  return (
    <nav>
      <motion.div
        className="wrapper flex items-center justify-between pt-16 pb-4 relative"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden">
          <motion.div variants={maskedTextVariants}>
            <Link href="/" className="text-xl font-semibold">
              <Image
                src={(navbar.logo as any)?.asset?.url || ''}
                alt={navbar?.logo?.alt || 'Logo'}
                width={220}
                height={20}
                className="object-contain"
              />
            </Link>
          </motion.div>
        </div>

        <ul className="flex items-center gap-6">
          {navbar?.navLinks?.map((link, idx) => {
            const isActive = pathname.includes(link.url)
            return (
              <motion.li key={link.url} className="relative flex items-center">
                <Link href={link.url} className="text-xl">
                  {link.text}
                </Link>
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
                />
              </motion.a>
            ))}
          </motion.div>
        </ul>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
          variants={borderVariants}
          style={{originX: 0}}
        />
      </motion.div>
    </nav>
  )
}

export default Header
