import React, {FC} from 'react'
import LinkWithSVG from '../../shared/LinkWithSVG'
import author_1 from '@/public/images/author_1.png'
import author_2 from '@/public/images/author_2.png'
import author_3 from '@/public/images/author_3.png'
import author_4 from '@/public/images/author_4.png'
import author_5 from '@/public/images/author_5.png'
import author_6 from '@/public/images/author_6.png'
import Image, { StaticImageData } from 'next/image'

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

const AuthorsSection = () => {
  return (
    <section className="my-48">
      <div className="wrapper flex flex-col gap-24">
        <header className="flex justify-between items-center pt-12 border-t border-t-black">
          <h2 className="text-[6.5rem] font-semibold leading-[110%] uppercase">Authors</h2>
          <div>
            <LinkWithSVG text="All Authors" href="/authors" />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-[0.5px] border-black">
          {authors.map((author) => (
            <AuthorCard key={author.id} {...author} />
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
      <div className="border-[0.5px] border-black p-8 flex items-center gap-12">
        <div className="w-[9.375rem] h-[9.375rem] rounded-full overflow-hidden">
          <Image src={image} alt={name} className="object-cover" quality={100} />
        </div>

        <div className="space-y-4">
          <h3 className='text-[2rem] font-semibold leading-[120%]'>{name}</h3>
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
      </div>
    )
}
