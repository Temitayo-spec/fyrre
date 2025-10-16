import {formatDate} from '@/lib'
import {MagazineQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'

const MagazineCard = ({magazine}: {magazine: MagazineQueryResult[0]}) => (
  <Link href={`/magazine/${magazine.title.toLowerCase()}`} className="group">
    <article className="magazine-card p-[2.5rem] border-[0.5px] border-black gap-y-8 min-h-[54rem] flex flex-col hover:bg-gray-50 transition-colors">
      <div className="magazine-card-content flex flex-col gap-y-8 h-full flex-1">
        <div className="flex items-center justify-between">
          <time className="text-sm leading-[160%]" dateTime={magazine.publishedAt}>
            {formatDate(magazine.publishedAt)}
          </time>
          <span className="py-2 px-3 rounded-[6.25rem] border border-black text-xs uppercase">
            {magazine.category}
          </span>
        </div>

        <div className="relative">
          <Image
            src={(magazine?.thumbnail as any)?.asset?.url}
            alt={magazine.title}
            className="object-contain"
            quality={100}
            width={500}
            height={500}
          />
        </div>

        <div className="flex flex-col justify-between h-full flex-1">
          <div className="space-y-3">
            <h3 className="text-[2rem] font-semibold leading-[120%] group-hover:underline">
              {magazine.title}
            </h3>
            <p className="text-base leading-[180%] line-clamp-3">{magazine.excerpt}</p>
          </div>

          <div className="flex gap-4 text-sm leading-[160%]">
            <p className="flex gap-2">
              <span className="font-semibold">Text</span>
              <span>{magazine.author.name}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">Duration</span>
              <span>{magazine.duration} min</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  </Link>
)

export default MagazineCard
