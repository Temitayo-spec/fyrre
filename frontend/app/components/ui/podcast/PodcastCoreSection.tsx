'use client'
import podcast_1 from '@/public/images/podcast_1.png'
import podcast_2 from '@/public/images/podcast_2.png'
import podcast_3 from '@/public/images/podcast_3.png'
import podcast_4 from '@/public/images/podcast_4.png'
import podcast_5 from '@/public/images/podcast_5.png'
import arrow from '@/public/svgs/arrow.svg'
import Image from 'next/image'
import Link from 'next/link'
import {ArrorwRight} from '../../shared/Icons'
import {AnimatePresence, motion, Variants} from 'framer-motion'

const podcasts = [
  {
    thumbnail: podcast_1,
    title: "The Problem of today's cultural development",
    episode_num: '05',
    publishedAt: '16.06.2022',
    duration: '1h 20 Min',
    slug: '/podcast/the-problem-of-todays-cultural-development',
  },
  {
    thumbnail: podcast_2,
    title: 'The hidden messages of Jack Nielson',
    episode_num: '04',
    publishedAt: '16.06.2022',
    duration: '45 Min',
    slug: '/podcast/the-hidden-messages-of-jack-nielson',
  },
  {
    thumbnail: podcast_3,
    title: 'Behind the scenes of the street art culture',
    episode_num: '03',
    publishedAt: '16.06.2022',
    duration: '45 Min',
    slug: '/podcast/behind-the-scenes-of-the-street-art-culture',
  },
  {
    thumbnail: podcast_4,
    title: 'The art of movement',
    episode_num: '02',
    publishedAt: '16.06.2022',
    duration: '1h 10 Min',
    slug: '/podcast/the-art-of-movement',
  },
  {
    thumbnail: podcast_5,
    title: '10 artists your should definitely know',
    episode_num: '01',
    publishedAt: '16.06.2022',
    duration: '1h 30 Min',
    slug: '/podcast/10-artists-you-should-definitely-know',
  },
]

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

const PodcastCoreSection = () => {
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
                    <h4 className="text-2xl font-semibold leading-[120%]">{podcast.episode_num}</h4>
                    <div className="relative max-w-[15rem] flex-1">
                      <Image
                        src={podcast.thumbnail}
                        alt="podcast"
                        className="object-cover h-[15rem] group-hover:brightness-110 transition-all duration-300"
                        quality={100}
                      />

                      <div className="absolute top-4 left-4">
                        <h3 className="text-[1.875rem] uppercase font-semibold text-white">
                          Fyrre
                        </h3>
                        <p className="text-[0.9375rem] uppercase font-semibold text-white -translate-y-3 inline-flex">
                          Podcast
                        </p>
                      </div>

                      <div className="absolute bottom-[1.47rem] px-4 flex items-end justify-between w-full">
                        <h4 className="text-[0.9375rem] font-semibold text-white uppercase">
                          EP{podcast.episode_num}
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

                    <Link href={podcast.slug} className="inline-flex items-center gap-2">
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
