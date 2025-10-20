'use client'
import {LineReveal} from '@/app/components/shared/LineReveal'
import {formatDate} from '@/lib'
import {AuthorWithArticlesQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'
import {motion} from 'framer-motion'

const ArticlesByAuthor: FC<{
  articles: NonNullable<AuthorWithArticlesQueryResult>['articles']
  authorName: string
}> = ({articles, authorName}) => {
  return (
    <section className="mb-24 md:mb-48">
      <div className="wrapper pt-8 md:pt-12 border-t border-black space-y-12 md:space-y-24">
        <h2 className="text-[2rem] sm:text-[3rem] md:text-[4.5rem] leading-[110%] font-semibold">
          <LineReveal
            text={`Articles by ${authorName}`}
            className="text-[2rem] sm:text-[3rem] md:text-[4.5rem] leading-[110%] font-semibold"
          />
        </h2>

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.1}}
          transition={{duration: 0.6, delay: 0.3, ease: 'easeOut'}}
          className="border-[0.5px] border-black grid grid-cols-1 lg:grid-cols-2"
        >
          {articles?.map((magazine, index) => (
            <motion.div
              key={index}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.3}}
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.15,
                ease: 'easeOut',
              }}
            >
              <Link href={`/magazine/${magazine.slug}`}>
                <motion.div
                  whileHover={{backgroundColor: 'rgba(0, 0, 0, 0.02)'}}
                  transition={{duration: 0.3}}
                  className="flex flex-col sm:flex-row gap-6 md:gap-12 items-start sm:items-center p-6 md:p-8 border-[0.5px] border-black"
                >
                  <motion.div
                    whileHover={{scale: 1.05}}
                    transition={{duration: 0.3, ease: 'easeOut'}}
                    className="w-full sm:w-[7.5rem] sm:h-[7.5rem] md:w-[9.375rem] md:h-[9.375rem] h-[12rem] relative overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={magazine.thumbnail?.asset?.url as string}
                      alt={magazine.title}
                      className="object-cover"
                      fill
                      quality={100}
                      placeholder="blur"
                      blurDataURL={magazine.thumbnail?.asset?.metadata?.lqip as string}
                    />
                  </motion.div>

                  <div className="space-y-3 md:space-y-4 flex-1">
                    <motion.h3
                      initial={{opacity: 0, x: -10}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true, amount: 0.3}}
                      transition={{
                        duration: 0.5,
                        delay: 0.5 + index * 0.15,
                        ease: 'easeOut',
                      }}
                      className="text-lg sm:text-xl md:text-[2rem] font-semibold leading-[120%]"
                    >
                      {magazine.title}
                    </motion.h3>
                    <motion.div
                      initial={{opacity: 0}}
                      whileInView={{opacity: 1}}
                      viewport={{once: true, amount: 0.3}}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + index * 0.15,
                        ease: 'easeOut',
                      }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-8 text-xs sm:text-sm leading-[160%]"
                    >
                      <p className="flex gap-2">
                        <span className="font-semibold">Date</span>
                        <span>{formatDate(magazine.publishedAt as string)}</span>
                      </p>
                      <p className="flex gap-2">
                        <span className="font-semibold">Read</span>
                        <span>{magazine.duration} min</span>
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ArticlesByAuthor
