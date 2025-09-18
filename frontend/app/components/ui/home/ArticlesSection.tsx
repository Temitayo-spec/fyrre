import {FC} from 'react'
import article_1 from '@/public/images/article_1.png'
import article_2 from '@/public/images/article_2.png'
import article_3 from '@/public/images/article_3.png'
import article_4 from '@/public/images/article_4.png'
import article_5 from '@/public/images/article_5.png'
import article_6 from '@/public/images/article_6.png'
import magazine_cover from '@/public/images/magazin-cover.png'
import Image, {StaticImageData} from 'next/image'
import Link from 'next/link'
import LinkWithSVG from '../../shared/LinkWithSVG'

const articles = [
  {
    thumbnail: article_1,
    title: 'Hope dies last',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.',
    publishedAt: '16. March 2022',
    author: 'Jakob Gronberg',
    duration: 1,
    category: 'Art',
  },
  {
    thumbnail: article_2,
    title: 'The best art museums',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.',
    publishedAt: '16. March 2022',
    author: 'Jakob Gronberg',
    duration: 1,
    category: 'Sculptures',
  },
  {
    thumbnail: article_3,
    title: 'The devil is the details',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.',
    publishedAt: '16. March 2022',
    author: 'Jakob Gronberg',
    duration: 1,
    category: 'Art',
  },
  {
    thumbnail: article_4,
    title: 'An inde­struc­tible hope',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.',
    publishedAt: '16. March 2022',
    author: 'Jakob Gronberg',
    duration: 1,
    category: 'Art',
  },
  {
    thumbnail: article_5,
    title: 'Street art festival',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.',
    publishedAt: '16. March 2022',
    author: 'Jakob Gronberg',
    duration: 1,
    category: 'Street Art',
  },
  {
    thumbnail: article_6,
    title: 'Through the eyes of street artists',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem. Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.',
    publishedAt: '16. March 2022',
    author: 'Jakob Gronberg',
    duration: 1,
    category: 'Street Art',
  },
]

const most_popular = [
  {
    title: 'Street art festival',
    author: 'Cristofer Vaccaro',
  },
  {
    title: 'Hope dies last',
    author: 'Cristofer Vaccaro',
  },
  {
    title: 'Artists who want to rise above',
    author: 'Cristofer Vaccaro',
  },
]

const ArticlesSection = () => {
  return (
    <section className="pt-12">
      <div className="wrapper flex gap-24">
        <div className="w-3/4">
          {articles.map((article, index) => (
            <ArticleRow
              key={index}
              {...article}
              isFirst={index === 0}
              isLast={index === articles.length - 1}
            />
          ))}

          <div className='mt-24'>
            <LinkWithSVG href="/articles" text="All articles" />
          </div>
        </div>
        <div className="w-1/4">
          <div className="space-y-2 mb-8">
            <h3 className="font-semibold text-base uppercase">Printmagazine</h3>
            <h2 className="text-[3rem] font-semibold leading-[120%]">03/2022</h2>
          </div>

          <div className="space-y-4 mb-16">
            <div className="max-w-[23.0625rem] max-h-[28.82813rem] overflow-hidden">
              <Image
                src={magazine_cover}
                alt="margazine cover"
                className="object-contain w-full h-full"
                quality={100}
              />
            </div>
            <button
              type="button"
              className="min-h-[3.125rem] py-1 px-6 inline-flex items-center justify-center bg-black text-white text-sm font-medium cursor-pointer border border-black hover:bg-white hover:text-black transition-colors duration-300 uppercase"
            >
              Button
            </button>
          </div>

          <div className="space-y-8">
            <h3 className="font-semibold text-base uppercase">Most Popular</h3>
            <div>
              {most_popular.map((article, index) => (
                <MostPopularArticleRow
                  key={index}
                  {...article}
                  isLast={index === most_popular.length - 1}
                  isFirst={index === 0}
                  position={index + 1}
                />
              ))}
            </div>
          </div>

          <form className="p-[1.875rem] bg-off-white mt-16">
            <h3 className="font-semibold text-base uppercase mb-2">NewsLetter</h3>
            <h2 className="text-[2rem] font-semibold leading-[130%] mb-4">
              Design News to your inbox
            </h2>
            <input
              type="email"
              className="w-full h-[3.0625rem] mb-3 px-[0.9375rem] bg-white placeholder:text-gwhite/60 text-base"
              placeholder="Email"
            />
            <button
              type="submit"
              className="min-h-[3.125rem] py-1 px-6 inline-flex items-center justify-center bg-black text-white text-sm font-medium cursor-pointer border border-black hover:bg-white hover:text-black transition-colors duration-300 uppercase"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ArticlesSection

const ArticleRow: FC<{
  thumbnail: StaticImageData
  title: string
  excerpt: string
  publishedAt: string
  author: string
  duration: number
  category: string
  isFirst?: boolean
  isLast?: boolean
}> = ({thumbnail, title, excerpt, publishedAt, author, duration, category, isFirst, isLast}) => {
  return (
    <article
      className="flex gap-12"
      style={{
        borderBottom: !isLast ? '1px solid #000' : 'none',
        paddingTop: isFirst ? '0' : '3rem',
        paddingBottom: isLast ? '0' : '3rem',
      }}
    >
      <div className="flex-shrink-0 w-[15rem] h-[15rem] aspect-square">
        <Image src={thumbnail} alt="article thumbnail" className="object-cover" quality={100} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h3 className="text-[2rem] font-semibold leading-[120%]">{title}</h3>
          <p className="text-base leading-[180%]">{excerpt}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold leading-[160%]">Text</h4>
              <p className="text-sm leading-[160%]">{author}</p>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold leading-[160%]">Date</h4>
              <p className="text-sm leading-[160%]">{publishedAt}</p>
            </div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold leading-[160%]">Duration</h4>
              <p className="text-sm leading-[160%]">{duration} min</p>
            </div>
          </div>

          <div className="grid place-items-center text-xs uppercase py-2 px-3 border border-black rounded-[3.75rem]">
            {category}
          </div>
        </div>
      </div>
    </article>
  )
}

const MostPopularArticleRow: FC<{
  title: string
  author: string
  position: number
  isLast?: boolean
  isFirst?: boolean
}> = ({title, author, position, isFirst, isLast}) => {
  return (
    <article
      className="flex gap-4"
      style={{
        borderBottom: !isLast ? '1px solid #000' : 'none',
        paddingTop: isFirst ? '0' : '1.5rem',
        paddingBottom: isLast ? '0' : '1.5rem',
      }}
    >
      <div className="min-w-[3.125rem] text-2xl font-semibold leading-[120%]">0{position}</div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold leading-[120%]">{title}</h3>
        <p className="text-sm leading-[160%]">
          <span className="mr-2 font-semibold">Text</span>
          {author}
        </p>
      </div>
    </article>
  )
}
