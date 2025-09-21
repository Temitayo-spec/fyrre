'use client'
import React, {FC} from 'react'
import {motion, Variants} from 'framer-motion'
import LinkWithSVG from '../../shared/LinkWithSVG'
import author_1 from '@/public/images/author_1.png'
import author_2 from '@/public/images/author_2.png'
import author_3 from '@/public/images/author_3.png'
import author_4 from '@/public/images/author_4.png'
import author_5 from '@/public/images/author_5.png'
import author_6 from '@/public/images/author_6.png'
import Image, {StaticImageData} from 'next/image'

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

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const maskedTextVariants: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const linkContainerVariants: Variants = {
  hidden: {
    y: '100%',
  },
  visible: {
    y: '0%',
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.1,
    },
  },
}

const lineVariants: Variants = {
  hidden: {scaleX: 0, originX: 0},
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 0.6,
    },
  },
}

const AuthorsSection = () => {
  return (
    <section className="my-48">
      <div className="wrapper flex flex-col gap-24">
        <motion.header
          className="flex justify-between items-center pt-12 relative"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-[6.5rem] font-semibold leading-[110%] uppercase"
              variants={maskedTextVariants}
            >
              Authors
            </motion.h2>
          </div>

          <div className="overflow-hidden">
            <motion.div variants={linkContainerVariants}>
              <LinkWithSVG text="All Authors" href="/authors" />
            </motion.div>
          </div>

          <motion.div
            className="absolute top-0 left-0 w-full h-[1px] bg-black"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
          />
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[0.5px] border-black">
          {authors.map((author) => (
            <motion.div
              key={author.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{once: true, amount: 0.3}}
            >
              <AuthorCard {...author} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AuthorsSection

const AuthorCard: FC<{
  image: StaticImageData
  name: string
  job: string
  city: string
}> = ({image, name, job, city}) => {
  return (
    <motion.div
      className="border-[0.5px] border-black p-8 flex items-center gap-12 group hover:shadow-lg transition-shadow duration-300"
      transition={{duration: 0.3, ease: 'easeOut'}}
    >
      <div className="w-[9.375rem] h-[9.375rem] rounded-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="object-cover group-hover:brightness-110 transition-all duration-300"
          quality={100}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-[2rem] font-semibold leading-[120%]">{name}</h3>
        <div className="flex gap-4">
          <p className="flex gap-2 text-sm leading-[160%]">
            <span className="font-semibold">Job</span>
            {job}
          </p>
          <p className="flex gap-2 text-sm leading-[160%]">
            <span className="font-semibold">City</span>
            {city}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
