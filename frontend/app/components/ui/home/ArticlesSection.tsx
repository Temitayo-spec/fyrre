'use client'
import {FC, useRef, useEffect} from 'react'
import {motion, AnimatePresence, Variants} from 'framer-motion'
import Image from 'next/image'
import LinkWithSVG from '../../shared/LinkWithSVG'
import {ArticlesSection as ArticleSectionType} from '@/sanity.types'
import Link from 'next/link'
import {ArticleRowType, MostPopularType} from '@/typings'
import {formatDate} from '@/lib'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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

const ArticlesSection: FC<{props: ArticleSectionType}> = ({props}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !sidebarRef.current || !leftColumnRef.current) return

    const ctx = gsap.context(() => {
      // Calculate how much shorter the sidebar is compared to left column
      const leftHeight = leftColumnRef.current!.offsetHeight
      const sidebarHeight = sidebarRef.current!.offsetHeight
      const heightDiff = leftHeight - sidebarHeight

      // Pin the sidebar with parallax
      ScrollTrigger.create({
        trigger: leftColumnRef.current,
        start: 'top top',
        end: () => `+=${leftHeight}`,
        pin: sidebarRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Apply parallax - move the sidebar down as we scroll so content stays visible
          const parallaxAmount = heightDiff > 0 ? heightDiff * self.progress * 2 : 0
          gsap.to(sidebarRef.current, {
            y: -parallaxAmount,
            duration: 0,
            overwrite: true,
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="pt-12" ref={containerRef}>
      <div className="wrapper">
        <div className="flex gap-24 items-start">
          <div className="w-3/4" ref={leftColumnRef}>
            <AnimatePresence>
              {props?.articles?.map((article, index) => {
                const articleData = article as unknown as ArticleRowType
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.3}}
                  >
                    <ArticleRow
                      {...articleData}
                      isFirst={index === 0}
                      isLast={index === props.articles.length - 1}
                    />
                  </motion.div>
                )
              })}
            </AnimatePresence>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true, amount: 0.3}}
              className="mt-24"
            >
              <LinkWithSVG href={props.allArticlesLinkUrl!} text={props.allArticlesLinkText!} />
            </motion.div>
          </div>

          <div className="w-1/4">
            <div ref={sidebarRef}>
              <motion.div
                className="space-y-2 mb-8"
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                viewport={{once: true, amount: 0.3}}
              >
                <h3 className="font-semibold text-base uppercase">
                  {props.sidebar?.printMagazine?.label}
                </h3>
                <h2 className="text-[3rem] font-semibold leading-[120%]">
                  {props.sidebar?.printMagazine?.issue}
                </h2>
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
                    src={(props.sidebar?.printMagazine?.coverImage as any).asset.url}
                    alt="magazine cover"
                    className="object-cover w-full h-full"
                    quality={100}
                    width={400}
                    height={500}
                    placeholder={
                      (props.sidebar?.printMagazine?.coverImage as any).asset.metadata?.lqip
                        ? 'blur'
                        : undefined
                    }
                    blurDataURL={
                      (props.sidebar?.printMagazine?.coverImage as any).asset.metadata?.lqip
                    }
                  />
                </div>
                <button
                  type="button"
                  className="min-h-[3.125rem] py-1 px-6 inline-flex items-center justify-center bg-black text-white text-sm font-medium cursor-pointer border border-black hover:bg-white hover:text-black transition-colors duration-300 uppercase"
                >
                  {props.sidebar?.printMagazine?.buttonText}
                </button>
              </motion.div>

              <div className="space-y-8">
                <h3 className="font-semibold text-base uppercase">Most Popular</h3>
                <div>
                  {props.sidebar?.mostPopular?.articles?.map((article, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{once: true, amount: 0.3}}
                    >
                      <MostPopularArticleRow
                        {...(article as unknown as MostPopularType)}
                        isLast={index === (props?.sidebar?.mostPopular?.articles?.length ?? 0) - 1}
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
                <h3 className="font-semibold text-base uppercase mb-2">
                  {props.sidebar?.newsletter?.label}
                </h3>
                <h2 className="text-[2rem] font-semibold leading-[130%] mb-4">
                  {props.sidebar?.newsletter?.heading}
                </h2>
                <input
                  type="email"
                  className="w-full h-[3.0625rem] mb-3 px-[0.9375rem] bg-white placeholder:text-gwhite/60 text-base"
                  placeholder={props.sidebar?.newsletter?.placeholder}
                />
                <button
                  type="submit"
                  className="min-h-[3.125rem] py-1 px-6 inline-flex items-center justify-center bg-black text-white text-sm font-medium cursor-pointer border border-black hover:bg-white hover:text-black transition-colors duration-300 uppercase"
                >
                  {props.sidebar?.newsletter?.buttonText}
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArticlesSection

const ArticleRow: FC<ArticleRowType> = ({
  thumbnail,
  title,
  excerpt,
  publishedAt,
  duration,
  category,
  isFirst,
  isLast,
  author,
  slug,
}) => {
  return (
    <Link href={`/magazine/${slug}`}>
      <article
        className="flex gap-12 relative"
        style={{
          paddingTop: isFirst ? '0' : '3rem',
          paddingBottom: isLast ? '0' : '3rem',
        }}
      >
        <div className="flex-shrink-0 w-[15rem] h-[15rem] aspect-square">
          <Image
            src={(thumbnail?.asset as any)?.url}
            alt={thumbnail?.alt}
            className="object-cover"
            quality={100}
            width={500}
            height={500}
          />
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
                <p className="text-sm leading-[160%]">{(author as any).name}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold leading-[160%]">Date</h4>
                <p className="text-sm leading-[160%]">{formatDate(publishedAt)}</p>
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
    </Link>
  )
}

const MostPopularArticleRow: FC<MostPopularType> = ({
  title,
  author,
  position,
  isFirst,
  isLast,
  slug,
}) => {
  return (
    <Link href={`/magazine/${slug}`}>
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
            {(author as any).name}
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
    </Link>
  )
}
