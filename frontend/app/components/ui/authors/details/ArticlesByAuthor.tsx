import { formatDate } from '@/lib'
import {AuthorWithArticlesQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'

const ArticlesByAuthor: FC<{
  articles: NonNullable<AuthorWithArticlesQueryResult>['articles']
  authorName: string
}> = ({articles, authorName}) => {
  return (
    <section className="mb-48">
      <div className="wrapper pt-12 border-t border-black space-y-24">
        <h2 className="text-[4.5rem] leading-[110%] font-semibold">Articles by {authorName}</h2>

        <div className="border-[0.5px] border-black grid grid-cols-2">
          {articles?.slice(0, 4).map((magazine, index) => (
            <Link href={`/magazine/${magazine.slug}`} key={index}>
              <div className="flex gap-12 items-center p-8 border-[0.5px] border-black">
                <div className="w-[9.375rem] h-[9.375rem] relative">
                  <Image
                    src={magazine.thumbnail?.asset?.url as string}
                    alt={magazine.title}
                    className="object-cover"
                    fill
                    quality={100}
                    placeholder="blur"
                    blurDataURL={magazine.thumbnail?.asset?.metadata?.lqip as string}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-[2rem] font-semibold leading-[120%]">{magazine.title}</h3>
                  <div className="flex gap-8 text-sm leading-[160%]">
                    <p className="flex gap-2">
                      <span className="font-semibold">Date</span>
                      <span>{formatDate(magazine.publishedAt as string)}</span>
                    </p>
                    <p className="flex gap-2">
                      <span className="font-semibold">Read</span>
                      <span>{magazine.duration} min</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArticlesByAuthor
