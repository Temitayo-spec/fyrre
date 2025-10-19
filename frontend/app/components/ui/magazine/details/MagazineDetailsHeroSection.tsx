'use client';
import Image from 'next/image'
import magazine_details_banner from '@/public/images/magazine_details_banner.png'
import Link from 'next/link'
import {MagazineDetailQueryResult} from '@/sanity.types'
import {FC} from 'react'
import {formatDate} from '@/lib'
import {LineReveal} from '@/app/components/shared/LineReveal'
import {motion} from 'framer-motion'

const MagazineDetailsHeroSection: FC<{magazine: MagazineDetailQueryResult}> = ({magazine}) => {
  return (
    <section>
      <div className="wrapper">
        <header>
          <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, ease: 'easeOut'}}
            className="flex items-center justify-between pt-8 mb-24"
          >
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
          </motion.div>

          <div className="flex gap-[6.44rem] justify-between mb-24">
            <h1 className="flex-1 text-[6.5rem] font-semibold leading-[110%] uppercase max-w-[40rem]">
              <LineReveal
                text={magazine?.title as string}
                className="text-[6.5rem] font-semibold leading-[110%] uppercase max-w-[40rem]"
                delay={0.4}
              />
            </h1>

            <p className="flex-1 text-xl font-medium leading-[180%] max-w-[44rem]">
              <LineReveal
                text={magazine?.heroDescription as string}
                className="text-xl font-medium leading-[180%] max-w-[44rem]"
                delay={0.6}
              />
            </p>
          </div>

          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.6, ease: 'easeOut'}}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex gap-4">
              <motion.p
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.5, delay: 0.3, ease: 'easeOut'}}
                className="flex gap-2 text-sm leading-[160%]"
              >
                <span className="font-semibold">Text</span>
                {magazine?.author?.name}
              </motion.p>
              <motion.p
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.5, delay: 0.2, ease: 'easeOut'}}
                className="flex gap-2 text-sm leading-[160%]"
              >
                <span className="font-semibold">Date</span>
                {formatDate(magazine?.publishedAt as string)}
              </motion.p>
              <motion.p
                initial={{opacity: 0, y: 10}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.5, delay: 0.3, ease: 'easeOut'}}
                className="flex gap-2 text-sm leading-[160%]"
              >
                <span className="font-semibold">Duration</span>
                {magazine?.duration} Min
              </motion.p>
            </div>

            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true, amount: 0.3}}
              transition={{duration: 0.5, delay: 0.4, ease: 'easeOut'}}
              className="border border-black py-2 px-3 rounded-2xl text-xs uppercase"
            >
              {magazine?.category}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 40, scale: 0.98}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1]}}
            className="max-h-[55rem] w-full"
          >
            <Image
              src={magazine?.heroImage?.asset?.url || magazine_details_banner}
              alt={magazine?.title || 'Magazine'}
              quality={100}
              className="object-cover w-full"
              width={1440}
              height={1200}
              placeholder="blur"
              blurDataURL={magazine?.heroImage?.asset?.metadata?.lqip as string}
            />
          </motion.div>
        </header>
      </div>
    </section>
  )
}

export default MagazineDetailsHeroSection
