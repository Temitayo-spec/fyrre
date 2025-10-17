import Image from 'next/image'
import magazine_details_banner from '@/public/images/magazine_details_banner.png'
import Link from 'next/link'
import { MagazineDetailQueryResult } from '@/sanity.types'
import { FC } from 'react'
import { formatDate } from '@/lib'

const MagazineDetailsHeroSection:FC<{magazine: MagazineDetailQueryResult}> = ({magazine}) => {
  console.log(magazine,'magazine')
  return (
    <section>
      <div className="wrapper">
        <header>
          <div className="flex items-center justify-between pt-8 mb-24">
            <Link href="/magazine" className="inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M7.828 13.5L13.192 18.864L11.778 20.278L4 12.5L11.778 4.72202L13.192 6.13601L7.828 11.5L20 11.5V13.5L7.828 13.5Z"
                  fill="black"
                />
              </svg>
              <span className="text-base font-semibold uppercase">Go Back</span>
            </Link>

            <h3 className="text-[2rem] font-semibold leading-[110%] uppercase">
              {magazine?.label || 'Magazine'}
            </h3>
          </div>

          <div className="flex gap-[6.44rem] justify-between mb-24">
            <h1 className="flex-1 text-[6.5rem] font-semibold leading-[110%] uppercase max-w-[40rem]">
              {magazine?.title}
            </h1>

            <p className="flex-1 text-xl font-medium leading-[180%] max-w-[44rem]">
              {magazine?.heroDescription}
            </p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4">
              <p className="flex gap-2 text-sm leading-[160%]">
                <span className="font-semibold">Text</span>
                {magazine?.author?.name}
              </p>
              <p className="flex gap-2 text-sm leading-[160%]">
                <span className="font-semibold">Date</span>
               {formatDate(magazine?.publishedAt as string)}
              </p>
              <p className="flex gap-2 text-sm leading-[160%]">
                <span className="font-semibold">Duration</span>{magazine?.duration} Min
              </p>
            </div>

            <div className="border border-black py-2 px-3 rounded-2xl text-xs uppercase">{magazine?.category}</div>
          </div>

          <div className="max-h-[55rem] w-full">
            <Image
              src={magazine?.heroImage?.asset?.url || magazine_details_banner}
              alt={magazine?.title || 'Magazine'}
              quality={100}
              className="object-cover w-full"
              width={1440}
              height={1200}
              placeholder='blur'
              blurDataURL={magazine?.heroImage?.asset?.metadata?.lqip as string}
            />
          </div>
        </header>
      </div>
    </section>
  )
}

export default MagazineDetailsHeroSection
