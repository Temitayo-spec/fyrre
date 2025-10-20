'use client'
import {Instagram, Twitter, Youtube} from '@/app/components/shared/Icons'
import {LineReveal} from '@/app/components/shared/LineReveal'
import {AuthorDetailQueryResult} from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import {FC} from 'react'
import {motion} from 'framer-motion'

const AuthorDetailsSection: FC<{author: AuthorDetailQueryResult}> = ({author}) => {
  const socialLinks = [
    {icon: <Instagram />, href: author?.socialLinks?.instagram, label: 'Instagram'},
    {icon: <Twitter />, href: author?.socialLinks?.twitter, label: 'X'},
    {icon: <Youtube />, href: author?.socialLinks?.youtube, label: 'YouTube'},
  ]

  return (
    <>
      <motion.div
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: 'easeOut'}}
        className="flex items-center justify-between pt-6 md:pt-8 mb-12 md:mb-24 wrapper"
      >
        <Link href="/authors" className="inline-flex items-center gap-1 md:gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 25"
            fill="none"
            className="md:w-6 md:h-6"
          >
            <path
              d="M7.828 13.5L13.192 18.864L11.778 20.278L4 12.5L11.778 4.72202L13.192 6.13601L7.828 11.5L20 11.5V13.5L7.828 13.5Z"
              fill="black"
            />
          </svg>
          <span className="text-sm md:text-base font-semibold uppercase">Go Back</span>
        </Link>

        <h3 className="text-lg md:text-[2rem] font-semibold leading-[110%] uppercase">Author</h3>
      </motion.div>

      <section className="mb-16 md:mb-[9.5rem]">
        <div className="max-w-[75rem] w-[90%] mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 lg:gap-24">
          <div className="space-y-8 md:space-y-12 max-w-full lg:max-w-[21.875rem] flex-1">
            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.8, ease: [0.33, 1, 0.68, 1]}}
              className="flex justify-center lg:justify-start"
            >
              <Image
                src={author?.image.asset?.url as string}
                alt="author photo"
                className="object-cover h-[16rem] w-[16rem] sm:h-[18.75rem] sm:w-[18.75rem] md:h-[21.875rem] md:w-[21.875rem] group-hover:brightness-110 transition-all duration-300 rounded-full"
                quality={100}
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL={author?.image.asset?.metadata?.lqip as string}
              />
            </motion.div>

            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.6, delay: 0.2, ease: 'easeOut'}}
              className="flex items-center justify-between pt-6 md:pt-8 border-t border-black"
            >
              <motion.p
                initial={{opacity: 0, x: -10}}
                whileInView={{opacity: 1, x: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: 0.3, ease: 'easeOut'}}
                className="text-base md:text-xl uppercase font-semibold"
              >
                Follow
              </motion.p>

              <div className="flex space-x-3 md:space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    initial={{opacity: 0, scale: 0.8}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true, amount: 0.3}}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + index * 0.1,
                      ease: 'easeOut',
                    }}
                    whileHover={{scale: 1.15, rotate: 5}}
                    whileTap={{scale: 0.95}}
                    href={social.href as string}
                    className="text-black transition-colors duration-200"
                    aria-label={social.label}
                    target="_blank"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="flex-2 space-y-8 md:space-y-12">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-semibold leading-[110%] uppercase">
                <LineReveal
                  text={author?.name as string}
                  className="text-[2.5rem] sm:text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-semibold leading-[110%] uppercase"
                />
              </h2>
              <b className="font-medium text-base sm:text-lg md:text-[1.375rem] leading-[180%]">
                <LineReveal
                  text={author?.bio as string}
                  className="font-medium text-base sm:text-lg md:text-[1.375rem] leading-[180%]"
                  delay={0.3}
                />
              </b>
            </div>
            <p className="text-sm md:text-base leading-[180%]">
              <LineReveal
                text={author?.fullBio as string}
                className="text-sm md:text-base leading-[180%]"
                delay={0.6}
              />
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default AuthorDetailsSection
