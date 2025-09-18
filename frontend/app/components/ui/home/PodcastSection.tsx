import React, {FC} from 'react'
import LinkWithSVG from '../../shared/LinkWithSVG'
import podcast_1 from '@/public/images/podcast_1.png'
import podcast_2 from '@/public/images/podcast_2.png'
import podcast_3 from '@/public/images/podcast_3.png'
import arrow from '@/public/svgs/arrow.svg'
import Image, {StaticImageData} from 'next/image'
import Link from 'next/link'

const podcast = [
  {
    thumbnail: podcast_1,
    title: 'The Problem of today’s cultural development',
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
]

const PodcastSection = () => {
  return (
    <section className="mt-24">
      <div className="wrapper flex flex-col gap-24">
        <header className="flex justify-between items-center pt-12 border-t border-t-black">
          <h2 className="text-[6.5rem] font-semibold leading-[110%] uppercase">Podcast</h2>
          <div>
            <LinkWithSVG text="All Episodes" href="/podcast" />
          </div>
        </header>

        <div className="flex border-[0.5px] border-black">
          {podcast.map((podcast, index) => (
            <PodcastCard key={index} {...podcast} isMiddle={index === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PodcastSection

const PodcastCard: FC<{
  thumbnail: StaticImageData
  title: string
  episode_num: string
  publishedAt: string
  duration: string
  slug: string
  isMiddle?: boolean
}> = ({thumbnail, title, episode_num, publishedAt, duration, slug, isMiddle}) => {
  return (
    <Link href={slug} className="flex flex-1">
      <div
        className="p-[2.5rem] border-[0.5px] border-black space-y-8"
        // style={{
        //   borderLeft: isMiddle ? 'none' : '1px solid #000',
        //   borderRight: isMiddle ? 'none' : '1px solid #000',
        // }}
      >
        <div className="relative max-w-[25.5965rem] flex-1">
          <Image
            src={thumbnail}
            alt="podcast"
            className="object-cover h-[25.4375rem]"
            quality={100}
          />

          <div className="absolute top-4 left-4">
            <h3 className="text-[3.17969rem] uppercase font-semibold text-white">Fyrre</h3>
            <p className="text-[1.58981rem] uppercase font-semibold text-white -translate-y-6 inline-flex">
              Podcast
            </p>
          </div>

          <div className="absolute bottom-[1.47rem] px-4 flex items-end justify-between w-full">
            <h4 className="text-[1.58981rem] font-semibold text-white uppercase">
              EP{episode_num}
            </h4>
            <Image src={arrow} alt="arrow" />
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <h3 className="text-[2rem] font-semibold leading-[120%]">{title}</h3>

          <div className="flex gap-4">
            <p className="flex gap-2 text-sm leading-[160%]">
              <span className="font-semibold">Date</span>
              {publishedAt}
            </p>
            <p className="flex gap-2 text-sm leading-[160%]">
              <span className="font-semibold">Duration</span>
              {duration}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
