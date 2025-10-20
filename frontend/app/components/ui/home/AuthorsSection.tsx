'use client'
import React, {FC} from 'react'
import {motion, Variants} from 'framer-motion'
import LinkWithSVG from '../../shared/LinkWithSVG'
import Image from 'next/image'
import {Author, AuthorsSection as AuthorsSectionType} from '@/sanity.types'
import Link from 'next/link'

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

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

const linkContainerVariants: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.1,
    },
  },
}

const lineVariants: Variants = {
  hidden: {scaleX: 0, originX: 0},
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.6,
    },
  },
}

const AuthorsSection: FC<{props: AuthorsSectionType}> = ({props}) => {
  return (
    <section className="my-24 md:my-48">
      <div className="wrapper flex flex-col gap-12 md:gap-24">
        <motion.header
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 md:pt-12 relative gap-6"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5rem] font-semibold leading-[110%] uppercase"
              variants={maskedTextVariants}
            >
              {props?.sectionTitle}
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.div variants={linkContainerVariants}>
              <LinkWithSVG
                text={props?.allAuthorsLinkText || 'All Authors'}
                href={props?.allAuthorsLinkUrl || '/authors'}
              />
            </motion.div>
          </div>

          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-black"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
          />
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[0.5px] border-black">
          {props?.authors?.map((authorRef) => {
            const author = authorRef as unknown as Author
            return (
              <motion.div
                key={author._id}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.3}}
              >
                <AuthorCard {...author} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AuthorsSection

const AuthorCard: FC<Author> = ({image, name, slug, city, job}) => {
  return (
    <Link href={`/authors/${slug}`}>
      <motion.div
        className="border-[0.5px] border-black p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 md:gap-12 group hover:shadow-lg transition-shadow duration-300"
        transition={{duration: 0.3, ease: 'easeOut'}}
      >
        <div className="w-[7rem] h-[7rem] sm:w-[8rem] sm:h-[8rem] md:w-[9.375rem] md:h-[9.375rem] rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={(image?.asset as any)?.url}
            alt={(image?.alt as string) || ''}
            className="object-cover w-full h-full group-hover:brightness-110 transition-all duration-300"
            quality={100}
            width={400}
            height={500}
            priority
            placeholder="blur"
            blurDataURL={(image?.asset as any)?.metadata?.lqip as string}
          />
        </div>

        <div className="space-y-3 md:space-y-4 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl md:text-[2rem] font-semibold leading-[120%]">
            {name}
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <p className="flex gap-2 text-xs sm:text-sm leading-[160%] justify-center sm:justify-start">
              <span className="font-semibold">Job</span>
              {job}
            </p>
            <p className="flex gap-2 text-xs sm:text-sm leading-[160%] justify-center sm:justify-start">
              <span className="font-semibold">City</span>
              {city}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
