'use client'
import Link from 'next/link'
import {PodcastCard} from '../../home/PodcastSection'
import {LatestPodcastsQueryResult, Podcast} from '@/sanity.types'
import {LineReveal} from '@/app/components/shared/LineReveal'
import {motion} from 'framer-motion'

const LatestPodcasts = ({slug, podcasts}: {slug: string; podcasts: LatestPodcastsQueryResult}) => {
  const filteredPodcasts = podcasts.filter(
    (podcast) => podcast?.slug.toLowerCase() !== slug.toLowerCase(),
  )

  return (
    <section aria-label="Latest magazine posts" className="mb-24 md:mb-48">
      <div className="pt-8 md:pt-12 border-t border-black flex flex-col gap-12 md:gap-24 wrapper">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[6.5rem] font-semibold leading-[110%] uppercase">
            <LineReveal
              text="Latest Episodes"
              className="text-[2.5rem] sm:text-[4rem] md:text-[6.5rem] font-semibold leading-[110%] uppercase"
            />
          </h2>

          <motion.div
            initial={{opacity: 0, x: 20}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.6, delay: 0.3, ease: 'easeOut'}}
          >
            <Link
              href="/podcast"
              className="flex items-center gap-1 md:gap-2 text-xs sm:text-sm md:text-base font-semibold uppercase flex-shrink-0"
            >
              <span className="hidden sm:inline">All Episodes</span>
              <span className="sm:hidden">All</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="md:w-6 md:h-6"
              >
                <path
                  d="M16.172 11.0002L10.808 5.63617L12.222 4.22217L20 12.0002L12.222 19.7782L10.808 18.3642L16.172 13.0002H4V11.0002H16.172Z"
                  fill="black"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.1}}
          transition={{duration: 0.6, delay: 0.4, ease: 'easeOut'}}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative border-[0.5px] border-black"
        >
          {filteredPodcasts.length > 0 ? (
            filteredPodcasts.slice(0, 3).map((podcast, index) => (
              <motion.div
                key={`${podcast?.title}-${index}`}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.15,
                  ease: 'easeOut',
                }}
                className="h-auto"
              >
                <PodcastCard
                  {...(podcast as unknown as Podcast & {
                    podcastBranding?: {
                      name?: string
                      subtitle?: string
                    }
                  })}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.5}}
              className="col-span-full p-8 md:p-12 text-center"
            >
              <p className="text-base md:text-lg">No podcasts found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default LatestPodcasts
