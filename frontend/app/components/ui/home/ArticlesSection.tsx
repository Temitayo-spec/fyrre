'use client'
import {FC} from 'react'
import {motion, AnimatePresence, Variants} from 'framer-motion'
import article_1 from '@/public/images/article_1.png'
import article_2 from '@/public/images/article_2.png'
import article_3 from '@/public/images/article_3.png'
import article_4 from '@/public/images/article_4.png'
import article_5 from '@/public/images/article_5.png'
import article_6 from '@/public/images/article_6.png'
import magazine_cover from '@/public/images/magazin-cover.png'
import Image, {StaticImageData} from 'next/image'
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

// Animation variants
const itemVariants: Variants = {
  hidden: {opacity: 0, y: 50},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const magazineVariants: Variants = {
  hidden: {opacity: 0, scale: 0.8},
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const newsletterVariants: Variants = {
  hidden: {opacity: 0, x: 50},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const lineVariants: Variants = {
  hidden: {scaleX: 0, originX: 0},
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.87, 0, 0.13, 1],
    },
  },
}

const ArticlesSection = () => {
  return (
    <section className="pt-12">
      <div className="wrapper flex gap-24">
        <div className="w-3/4">
          <AnimatePresence>
            {articles.map((article, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.3}}
              >
                <ArticleRow
                  {...article}
                  isFirst={index === 0}
                  isLast={index === articles.length - 1}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
            className="mt-24"
          >
            <LinkWithSVG href="/articles" text="All articles" />
          </motion.div>
        </div>
        <div className="w-1/4">
          <motion.div
            className="space-y-2 mb-8"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            viewport={{once: true, amount: 0.3}}
          >
            <h3 className="font-semibold text-base uppercase">Printmagazine</h3>
            <h2 className="text-[3rem] font-semibold leading-[120%]">03/2022</h2>
          </motion.div>

          <motion.div
            className="space-y-4 mb-16"
            variants={magazineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
          >
            <div className="max-w-[23.0625rem] max-h-[28.82813rem] overflow-hidden">
              <Image
                src={magazine_cover}
                alt="magazine cover"
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
          </motion.div>

          <div className="space-y-8">
            <h3 className="font-semibold text-base uppercase">Most Popular</h3>
            <div>
              {most_popular.map((article, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{once: true, amount: 0.3}}
                >
                  <MostPopularArticleRow
                    {...article}
                    isLast={index === most_popular.length - 1}
                    isFirst={index === 0}
                    position={index + 1}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.form
            className="p-[1.875rem] bg-off-white mt-16"
            variants={newsletterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
          >
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
          </motion.form>
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
      className="flex gap-12 relative"
      style={{
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
      {!isLast && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.5}}
        />
      )}
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
      className="flex gap-4 relative"
      style={{
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
      {!isLast && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-black"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.5}}
        />
      )}
    </article>
  )
}
