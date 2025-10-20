import Link from 'next/link'
import MagazineCard from '../MagazineCard'
import {LatestMagazinesQueryResult, MagazineQueryResult} from '@/sanity.types'
import {LineReveal} from '@/app/components/shared/LineReveal'

const LatestPosts = ({slug, magazines}: {slug: string; magazines: LatestMagazinesQueryResult}) => {
  const filteredMagazines = magazines.filter(
    (magazine) => magazine.title.toLowerCase() !== slug.toLowerCase(),
  )
  return (
    <section aria-label="Latest magazine posts" className="mb-24 md:mb-48">
      <div className="pt-8 md:pt-12 border-t border-black flex flex-col gap-12 md:gap-24 wrapper">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[6.5rem] font-semibold leading-[110%] uppercase">
            <LineReveal
              text="Latest Posts"
              className="text-[2.5rem] sm:text-[4rem] md:text-[6.5rem] font-semibold leading-[110%] uppercase"
            />
          </h2>

          <Link
            href="/magazine"
            className="flex items-center gap-1 md:gap-2 text-xs sm:text-sm md:text-base font-semibold uppercase flex-shrink-0"
          >
            <span className="hidden sm:inline">See all</span>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative border-[0.5px] border-black">
          {filteredMagazines.length > 0 ? (
            filteredMagazines
              .slice(0, 3)
              .map((magazine, index) => (
                <MagazineCard
                  key={`${magazine.title}-${index}`}
                  magazine={magazine as MagazineQueryResult[0]}
                />
              ))
          ) : (
            <div className="col-span-full p-8 md:p-12 text-center">
              <p className="text-base md:text-lg">No magazines found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LatestPosts
