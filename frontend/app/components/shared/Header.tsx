'use client'
import Link from 'next/link'
import {motion, Variants} from 'framer-motion'
import {Instagram, RSS, Twitter, Youtube} from './Icons'

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

const Header = () => {
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
              FYRRE MAGAZINE
            </Link>
          </motion.div>
        </div>

        <ul className="flex items-center gap-6">
          <Link href="/magazine" className="text-xl">
            Magazine
          </Link>
          <Link href="/authors" className="text-xl">
            Authors
          </Link>
          <Link href="/authors" className="text-xl">
            Podcast
          </Link>

          <div className="w-[0.9375rem] h-px bg-black"></div>

          <motion.div className="flex space-x-4" variants={socialContainerVariants}>
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-black transition-colors duration-200"
                aria-label={social.label}
                target="_blank"
                variants={socialVariants}
                whileHover={{scale: 1.1}}
              >
                {social.icon}
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
