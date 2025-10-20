'use client'
import arrow from '@/public/svgs/arrow.svg'
import Image from 'next/image'
import Link from 'next/link'
import {ArrowRight} from '../../shared/Icons'
import {motion, Variants, useInView} from 'framer-motion'
import {FC, useRef} from 'react'
import {PodcastsQueryResult} from '@/sanity.types'
import {formatDate} from '@/lib'

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

const PodcastItem: FC<{
  podcast: any
  index: number
  isLast: boolean
}> = ({podcast, index, isLast}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {once: true, amount: 0.3})

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={itemVariants}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between relative py-8 md:py-12 gap-6 lg:gap-0">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 lg:gap-16">
          <h4 className="text-lg md:text-xl lg:text-2xl font-semibold leading-[120%] lg:min-w-[3rem]">
            {podcast.episodeNumber}
          </h4>
          <div className="relative w-full max-w-full md:max-w-[12rem] lg:max-w-[15rem] flex-shrink-0">
            <Image
              src={podcast?.thumbnail?.asset?.url as string}
              alt="podcast"
              className="object-cover w-full h-auto aspect-square group-hover:brightness-110 transition-all duration-300"
              quality={100}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={podcast?.thumbnail?.asset?.metadata?.lqip as string}
            />

            <div className="absolute top-3 left-3 md:top-4 md:left-4">
              <h3 className="text-lg sm:text-xl md:text-[1.875rem] uppercase font-semibold text-white">
                {podcast.podcastBranding?.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-[0.9375rem] uppercase font-semibold text-white -translate-y-2 md:-translate-y-3 inline-flex">
                {podcast.podcastBranding?.subtitle}
              </p>
            </div>

            <div className="absolute bottom-4 md:bottom-[1.47rem] px-3 md:px-4 flex items-end justify-between w-full">
              <h4 className="text-xs sm:text-sm md:text-[0.9375rem] font-semibold text-white uppercase">
                EP{podcast.episodeNumber}
              </h4>
              <Image src={arrow} alt="arrow" className="w-5 md:w-[1.86975rem]" />
            </div>
          </div>
          <h2 className="max-w-full lg:max-w-[32.375rem] text-lg sm:text-xl md:text-[1.5rem] lg:text-[2rem] font-semibold leading-[120%]">
            {podcast.title}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-10">
          <p className="flex gap-2 text-xs sm:text-sm leading-[160%]">
            <span className="font-semibold">Date</span>
            <span className="text-gray-700">{formatDate(podcast.publishedAt as string)}</span>
          </p>
          <p className="flex gap-2 text-xs sm:text-sm leading-[160%]">
            <span className="font-semibold">Duration</span>
            <span className="text-gray-700">{podcast.duration}</span>
          </p>

          <Link
            href={`/podcast/${podcast.slug}`}
            className="inline-flex items-center gap-2 self-end sm:self-auto"
          >
            <span className="text-sm md:text-base uppercase font-semibold">Listen</span>
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

const PodcastCoreSection: FC<{podcasts: PodcastsQueryResult}> = ({podcasts}) => {
  return (
    <section>
      <div className="wrapper">
        <div>
          {podcasts.map((podcast, index) => {
            const isLast = index === podcasts.length - 1
            return <PodcastItem key={index} podcast={podcast} index={index} isLast={isLast} />
          })}
        </div>
      </div>
    </section>
  )
}

export default PodcastCoreSection
