'use client'
import React, {FC} from 'react'
import {motion, Variants} from 'framer-motion'
import LinkWithSVG from '../../shared/LinkWithSVG'
import arrow from '@/public/svgs/arrow.svg'
import Image from 'next/image'
import Link from 'next/link'
import {Podcast, PodcastSection as PodcastSectionType} from '@/sanity.types'
import { formatDate } from '@/lib'


const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

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

const PodcastSection: FC<{props: PodcastSectionType}> = ({props}) => {
  return (
    <section className="mt-24">
      <div className="wrapper flex flex-col gap-24">
        <motion.header
          className="flex justify-between items-center pt-12 relative"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-[6.5rem] font-semibold leading-[110%] uppercase"
              variants={maskedTextVariants}
            >
              {props?.sectionTitle}
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.div variants={linkContainerVariants}>
              <LinkWithSVG
                text={props?.allEpisodesLinkText || 'All Episodes'}
                href={props?.allEpisodesLinkUrl || '/podcast'}
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

        <motion.div
          className="flex relative border-[0.5px] border-x-0 border-black"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
        >
          {props?.episodes?.map((podcast, index) => (
            <motion.div key={index} variants={itemVariants} className="flex-1 relative">
              <PodcastCard
                {...(podcast as unknown as Podcast)}
                podcastBranding={props.podcastBranding}
              />
              {index < props?.episodes?.length - 1 && (
                <motion.div
                  className="absolute top-0 right-0 w-[1px] h-full bg-black"
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once: true, amount: 0.5}}
                />
              )}
            </motion.div>
          ))}
          <motion.div
            className="absolute top-0 left-0 h-full w-[0.5px] bg-black"
            variants={{
              hidden: {scaleY: 0, originY: 0},
              visible: {
                scaleY: 1,
                transition: {
                  duration: 0.8,
                  ease: 'easeOut',
                  delay: 0.6,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
          />
          <motion.div
            className="absolute top-0 right-0 h-full w-[0.5px] bg-black"
            variants={{
              hidden: {scaleY: 0, originY: 0},
              visible: {
                scaleY: 1,
                transition: {
                  duration: 0.8,
                  ease: 'easeOut',
                  delay: 0.6,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default PodcastSection

export const PodcastCard: FC<Podcast & {
  podcastBranding?: {
    name?: string
    subtitle?: string
  }
}> = ({
  thumbnail,
  title,
  episodeNumber,
  publishedAt,
  duration,
  slug,
  podcastBranding
}) => {
  return (
    <Link href={`/podcast/${slug}`} className="flex flex-1 h-full">
      <motion.div
        className="p-[2.5rem] border-[0.5px] border-black space-y-8 group hover:shadow-lg transition-shadow duration-300"
        transition={{duration: 0.3, ease: 'easeOut'}}
      >
        <div className="relative max-w-[25.5965rem] flex-1">
          <Image
            src={(thumbnail.asset as any).url}
            alt="podcast"
            className="object-cover h-[25.4375rem] group-hover:brightness-110 transition-all duration-300"
            quality={100}
            width={400}
            height={500}
          />

          <div className="absolute top-4 left-4">
            <h3 className="text-[3.17969rem] uppercase font-semibold text-white">{podcastBranding?.name}</h3>
            <p className="text-[1.58981rem] uppercase font-semibold text-white -translate-y-6 inline-flex">
              {podcastBranding?.subtitle}
            </p>
          </div>

          <div className="absolute bottom-[1.47rem] px-4 flex items-end justify-between w-full">
            <h4 className="text-[1.58981rem] font-semibold text-white uppercase">
              EP{episodeNumber}
            </h4>
            <Image src={arrow} alt="arrow" />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <h3 className="text-[2rem] font-semibold leading-[120%]">{title}</h3>

          <div className="flex gap-4">
            <p className="flex gap-2 text-sm leading-[160%]">
              <span className="font-semibold">Date</span>
              {formatDate(publishedAt as string)}
            </p>
            <p className="flex gap-2 text-sm leading-[160%]">
              <span className="font-semibold">Duration</span>
              {duration}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
