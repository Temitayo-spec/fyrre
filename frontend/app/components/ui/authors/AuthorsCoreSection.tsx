'use client'
import author_1 from '@/public/images/author_1.png'
import author_2 from '@/public/images/author_2.png'
import author_3 from '@/public/images/author_3.png'
import author_4 from '@/public/images/author_4.png'
import author_5 from '@/public/images/author_5.png'
import author_6 from '@/public/images/author_6.png'
import {AnimatePresence, motion, Variants} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {ArrorwRight} from '../../shared/Icons'

const authors = [
  {
    id: 1,
    name: 'Jakob Grønberg',
    job: 'Artist',
    city: 'Berlin',
    image: author_1,
  },
  {
    id: 2,
    name: 'Louise Jensen',
    job: 'Artist',
    city: 'Stockholm',
    image: author_2,
  },
  {
    id: 3,
    name: 'Anne Henry',
    job: 'Photograph',
    city: 'New York',
    image: author_3,
  },
  {
    id: 4,
    name: 'Anna Nielsen',
    job: 'Columnists',
    city: 'Copenhagen',
    image: author_4,
  },
  {
    id: 5,
    name: 'Jane Cooper',
    job: 'Artist',
    city: 'Berlin',
    image: author_5,
  },
  {
    id: 6,
    name: 'Cristofer Vaccaro',
    job: 'Artist',
    city: 'Lisbon',
    image: author_6,
  },
]

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

const AuthorsCoreSection = () => {
  return (
    <section>
      <div className="wrapper">
        <AnimatePresence>
          {authors.map((author, index) => {
            const isLast = index === authors.length - 1
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true, amount: 0.3}}
              >
                <div className="flex items-center justify-between relative py-12">
                  <div className="flex items-center gap-12">
                    <div className="">
                      <Image
                        src={author.image}
                        alt="author photo"
                        className="object-cover h-[9.375rem] w-[9.375rem] group-hover:brightness-110 transition-all duration-300 rounded-full"
                        quality={100}
                      />
                    </div>
                    <h2 className="max-w-[32.375rem] text-[2rem] font-semibold leading-[120%]">
                      {author.name}
                    </h2>
                  </div>

                  <div className="flex items-center gap-16">
                    <p className="flex gap-2 text-sm leading-[160%]">
                      <span className="font-semibold">Job</span>
                      {author.job}
                    </p>
                    <p className="flex gap-2 text-sm leading-[160%]">
                      <span className="font-semibold">City</span>
                      {author.city}
                    </p>

                    <Link href={'#'} className="inline-flex items-center gap-2">
                      <span className="text-base uppercase font-semibold">About</span>
                      <ArrorwRight />
                    </Link>
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
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default AuthorsCoreSection
