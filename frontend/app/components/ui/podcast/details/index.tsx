import CustomPortableText from '@/app/components/PortableText'
import {
  AppleIcon,
  Instagram,
  SoundcloudIcon,
  SpotifyIcon,
  Twitter,
  Youtube,
} from '@/app/components/shared/Icons'
import {formatDate} from '@/lib'
import arrow from '@/public/svgs/arrow.svg'
import {PodcastDetailQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'

const PodcastDetailsSection: FC<{podcast: PodcastDetailQueryResult}> = ({podcast}) => {
  const socialLinks = [
    {icon: <Instagram />, href: podcast?.socialShare?.instagram!, label: 'Instagram'},
    {icon: <Twitter />, href: podcast?.socialShare?.twitter!, label: 'X'},
    {icon: <Youtube />, href: podcast?.socialShare?.youtube!, label: 'YouTube'},
  ]

  return (
    <section className="mb-48">
      <div className="max-w-[75rem] w-[90%] mx-auto flex gap-24">
        <div className="max-w-[21.875rem] flex-1">
          <div className="relative max-w-[21.875rem] flex-1 mb-8">
            <Image
              src={podcast?.thumbnail?.asset?.url as string}
              alt="podcast"
              className="object-cover h-[21.875rem] group-hover:brightness-110 transition-all duration-300"
              quality={100}
              placeholder="blur"
              blurDataURL={podcast?.thumbnail?.asset?.metadata?.lqip as string}
              width={500}
              height={500}
            />

            <div className="absolute top-4 left-4">
              <h3 className="text-[2.73438rem] uppercase font-semibold text-white">Fyrre</h3>
              <p className="text-[1.36719rem] uppercase font-semibold text-white -translate-y-3 inline-flex">
                Podcast
              </p>
            </div>

            <div className="absolute bottom-[1.47rem] px-4 flex items-end justify-between w-full">
              <h4 className="text-[1.36719rem] font-semibold text-white uppercase">EP{'05'}</h4>
              <Image src={arrow} alt="arrow" className="w-[2.72669rem]" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-12">
            <p className="text-xl font-semibold leading-[160%]">Listen On</p>

            <div className="flex items-center gap-4">
              <Link href="#">
                <SpotifyIcon />
              </Link>
              <Link href="#">
                <AppleIcon />
              </Link>
              <Link href="#">
                <SoundcloudIcon />
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-black">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-base leading-[180%] font-semibold">Date</p>
                <p className="text-base leading-[180%]">
                  {formatDate(podcast?.publishedAt as string)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base leading-[180%] font-semibold">Read</p>
                <p className="text-base leading-[180%]">{podcast?.duration}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base leading-[180%] font-semibold">Share</p>

                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social?.href as string}
                      className="text-black transition-colors duration-200"
                      aria-label={social.label}
                      target="_blank"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-16 flex-2">
          <header className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-base font-semibold uppercase">
                Episode {podcast?.episodeNumber}
              </h4>
              <h2 className="text-[6.25rem] font-semibold leading-[100%] uppercase">
                {podcast?.title}
              </h2>
            </div>

            <p className="font-medium text-[1.375rem] leading-[180%]">{podcast?.excerpt}</p>
          </header>

          <article className="flex-1">
            {podcast?.content && <CustomPortableText value={podcast.content as any} />}
          </article>
        </div>
      </div>
    </section>
  )
}

export default PodcastDetailsSection
