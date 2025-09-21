'use client'
import Link from 'next/link'
import React from 'react'
import {motion, Variants} from 'framer-motion'

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

const Header = () => {
  return (
    <nav>
      <motion.div
        className="wrapper flex items-center pt-16 pb-4 relative"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden">
          <motion.div variants={maskedTextVariants}>
            <Link href="/" className="text-lg font-semibold">
              FYRRE MAGAZINE
            </Link>
          </motion.div>
        </div>

        <div></div>

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
