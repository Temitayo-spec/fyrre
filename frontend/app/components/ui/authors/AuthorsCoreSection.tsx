'use client'

import {motion, Variants, useInView} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {ArrorwRight} from '../../shared/Icons'
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
      <div className="flex items-center justify-between relative py-12">
        <div className="flex items-center gap-12">
          <div className="">
            <Image
              src={author?.image?.asset?.url as string}
              alt="author photo"
              className="object-cover h-[9.375rem] w-[9.375rem] group-hover:brightness-110 transition-all duration-300 rounded-full"
              quality={100}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={author?.image?.asset?.metadata?.lqip as string}
            />
          </div>
          <h2 className="max-w-[32.375rem] text-[2rem] font-semibold leading-[120%]">
            {author.name}
          </h2>
        </div>

        <div className="flex items-center gap-16">
          <p className="flex gap-2 text-sm leading-[160%]">
            <span className="font-semibold">Job</span>
            {author.job}
          </p>
          <p className="flex gap-2 text-sm leading-[160%]">
            <span className="font-semibold">City</span>
            {author.city}
          </p>

          <Link href={`/authors/${author.slug}`} className="inline-flex items-center gap-2">
            <span className="text-base uppercase font-semibold">About</span>
            <ArrorwRight />
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
