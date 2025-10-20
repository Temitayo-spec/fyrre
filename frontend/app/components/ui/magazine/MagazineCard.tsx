import {formatDate} from '@/lib'
import {MagazineQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'

const MagazineCard = ({magazine}: {magazine: MagazineQueryResult[0]}) => (
  <Link href={`/magazine/${magazine.slug}`} className="group flex">
    <article className="magazine-card p-4 sm:p-6 md:p-8 lg:p-[2.5rem] border-[0.5px] border-black gap-y-6 md:gap-y-8 min-h-[45rem] sm:min-h-[50rem] md:min-h-[54rem] flex flex-col hover:bg-gray-50 transition-colors">
      <div className="magazine-card-content flex flex-col gap-y-6 md:gap-y-8 h-full flex-1">
        <div className="flex items-center justify-between gap-4">
          <time className="text-xs sm:text-sm leading-[160%]" dateTime={magazine.publishedAt}>
            {formatDate(magazine.publishedAt)}
          </time>
          <span className="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-[6.25rem] border border-black text-[0.625rem] sm:text-xs uppercase whitespace-nowrap">
            {magazine.category}
          </span>
        </div>

        <div className="relative w-full aspect-square">
          <Image
            src={magazine?.thumbnail?.asset?.url as string}
            alt={magazine.title}
            className="object-contain w-full h-full"
            quality={100}
            width={500}
            height={500}
            placeholder='blur'
            blurDataURL={magazine?.thumbnail?.asset?.metadata?.lqip as string}
          />
        </div>

        <div className="flex flex-col justify-between h-full flex-1">
          <div className="space-y-2 md:space-y-3">
            <h3 className="text-xl sm:text-2xl md:text-[2rem] font-semibold leading-[120%] group-hover:underline">
              {magazine.title}
            </h3>
            <p className="text-sm sm:text-base leading-[180%] line-clamp-3">{magazine?.excerpt}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-xs sm:text-sm leading-[160%] mt-4">
            <p className="flex gap-2">
              <span className="font-semibold">Text</span>
              <span>{magazine?.author?.name}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">Duration</span>
              <span>{magazine?.duration} min</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  </Link>
)

export default MagazineCard