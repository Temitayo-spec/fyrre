'use client'

import {motion, Variants, useInView} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {ArrowRight} from '../../shared/Icons'
import {FC, useRef} from 'react'
import {AuthorsQueryResult} from '@/sanity.types'

const itemVariants: Variants = {
  hidden: {opacity: 0, y: 50},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const lineVariants: Variants = {
  hidden: {scaleX: 0, originX: 0},
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.87, 0, 0.13, 1],
      delay: 0.3,
    },
  },
}

const AuthorItem: FC<{
  author: any
  index: number
  isLast: boolean
}> = ({author, index, isLast}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, amount: 0.3})

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={itemVariants}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between relative py-8 md:py-12 gap-6 md:gap-0">
        <div className="flex flex-row items-center gap-4 md:gap-12">
          <div className="flex-shrink-0">
            <Image
              src={author?.image?.asset?.url as string}
              alt="author photo"
              className="object-cover h-[6rem] w-[6rem] sm:h-[7.5rem] sm:w-[7.5rem] md:h-[9.375rem] md:w-[9.375rem] group-hover:brightness-110 transition-all duration-300 rounded-full"
              quality={100}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={author?.image?.asset?.metadata?.lqip as string}
            />
          </div>
          <h2 className="max-w-full md:max-w-[32.375rem] text-xl sm:text-[1.5rem] md:text-[2rem] font-semibold leading-[120%]">
            {author.name}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-16">
          <p className="flex gap-2 text-xs sm:text-sm leading-[160%]">
            <span className="font-semibold">Job</span>
            <span className="text-gray-700">{author.job}</span>
          </p>
          <p className="flex gap-2 text-xs sm:text-sm leading-[160%]">
            <span className="font-semibold">City</span>
            <span className="text-gray-700">{author.city}</span>
          </p>

          <Link
            href={`/authors/${author.slug}`}
            className="inline-flex items-center gap-2 self-end sm:self-auto"
          >
            <span className="text-sm md:text-base uppercase font-semibold">About</span>
            <ArrowRight />
          </Link>
        </div>

        {!isLast && (
          <motion.div
            className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={lineVariants}
          />
        )}
      </div>
    </motion.div>
  )
}

const AuthorsCoreSection: FC<{authors: AuthorsQueryResult}> = ({authors}) => {
  return (
    <section>
      <div className="wrapper">
        <div>
          {authors.map((author, index) => {
            const isLast = index === authors.length - 1
            return <AuthorItem key={index} author={author} index={index} isLast={isLast} />
          })}
        </div>
      </div>
    </section>
  )
}

export default AuthorsCoreSection
