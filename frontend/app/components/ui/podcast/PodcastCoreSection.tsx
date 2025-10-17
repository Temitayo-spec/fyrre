'use client'
import arrow from '@/public/svgs/arrow.svg'
import Image from 'next/image'
import Link from 'next/link'
import {ArrorwRight} from '../../shared/Icons'
import {AnimatePresence, motion, Variants} from 'framer-motion'
import { FC } from 'react'
import { PodcastsQueryResult } from '@/sanity.types'

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
    },
  },
}

const PodcastCoreSection:FC<{podcasts: PodcastsQueryResult}> = ({podcasts}) => {
  return (
    <section>
      <div className="wrapper">
        <AnimatePresence>
          {podcasts.map((podcast, index) => {
            const isLast = index === podcasts.length - 1
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.3}}
              >
                <div className="flex items-center justify-between relative py-12">
                  <div className="flex items-center gap-16">
                    <h4 className="text-2xl font-semibold leading-[120%]">
                      {podcast.episodeNumber}
                    </h4>
                    <div className="relative max-w-[15rem] flex-1">
                      <Image
                        src={podcast?.thumbnail?.asset?.url as string}
                        alt="podcast"
                        className="object-cover h-[15rem] group-hover:brightness-110 transition-all duration-300"
                        quality={100}
                        width={500}
                        height={500}
                      />

                      <div className="absolute top-4 left-4">
                        <h3 className="text-[1.875rem] uppercase font-semibold text-white">
                          {podcast.podcastBranding?.name}
                        </h3>
                        <p className="text-[0.9375rem] uppercase font-semibold text-white -translate-y-3 inline-flex">
                          {podcast.podcastBranding?.subtitle}
                        </p>
                      </div>

                      <div className="absolute bottom-[1.47rem] px-4 flex items-end justify-between w-full">
                        <h4 className="text-[0.9375rem] font-semibold text-white uppercase">
                          EP{podcast.episodeNumber}
                        </h4>
                        <Image src={arrow} alt="arrow" className="w-[1.86975rem]" />
                      </div>
                    </div>
                    <h2 className="max-w-[32.375rem] text-[2rem] font-semibold leading-[120%]">
                      {podcast.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-16">
                    <p className="flex gap-2 text-sm leading-[160%]">
                      <span className="font-semibold">Date</span>
                      {podcast.publishedAt}
                    </p>
                    <p className="flex gap-2 text-sm leading-[160%]">
                      <span className="font-semibold">Duration</span>
                      {podcast.duration}
                    </p>

                    <Link
                      href={`/podcast/${podcast.slug}`}
                      className="inline-flex items-center gap-2"
                    >
                      <span className="text-base uppercase font-semibold">Listen</span>
                      <ArrorwRight />
                    </Link>
                  </div>

                  {!isLast && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
                      variants={lineVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{once: true, amount: 0.5}}
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PodcastCoreSection
