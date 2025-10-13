import Link from 'next/link'
import {PodcastCard} from '../../home/PodcastSection'

const LatestPodcasts = ({slug, podcasts}: {slug: string; podcasts: Podcast[]}) => {
  const filteredPodcasts = podcasts.filter(
    (podcast) => podcast.title.toLowerCase() !== slug.toLowerCase(),
  )
  return (
    <section aria-label="Latest magazine posts" className="mb-48">
      <div className="pt-12 border-t border-black flex flex-col gap-24 wrapper">
        <div className="flex items-center justify-between">
          <h2 className="text-[6.5rem] font-semibold leading-[110%] uppercase">Latest Episodes</h2>

          <Link
            href="/podcast"
            className="flex items-center gap-2 text-base font-semibold uppercase"
          >
            <span>All Episodes</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.172 11.0002L10.808 5.63617L12.222 4.22217L20 12.0002L12.222 19.7782L10.808 18.3642L16.172 13.0002H4V11.0002H16.172Z"
                fill="black"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative border-[0.5px] border-black">
          {filteredPodcasts.length > 0 ? (
            filteredPodcasts
              .slice(0, 3)
              .map((podcast, index) => (
                <PodcastCard key={`${podcast.title}-${index}`} {...podcast} />
              ))
          ) : (
            <div className="col-span-full p-12 text-center">
              <p className="text-lg">No magazines found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LatestPodcasts
