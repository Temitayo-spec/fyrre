import {Instagram, Twitter, Youtube} from '@/app/components/shared/Icons'
import {authors} from '@/constants/authors'
import { AuthorDetailQueryResult } from '@/sanity.types'
import Image from 'next/image'
import { FC } from 'react'


const AuthorDetailsSection:FC<{author: AuthorDetailQueryResult}> = ({author}) => {
  const socialLinks = [
    {icon: <Instagram />, href: author?.socialLinks?.instagram, label: 'Instagram'},
    {icon: <Twitter />, href: author?.socialLinks?.twitter, label: 'X'},
    {icon: <Youtube />, href: author?.socialLinks?.youtube, label: 'YouTube'},
  ]

  return (
    <section className="mb-[9.5rem]">
      <div className="max-w-[75rem] w-[90%] mx-auto flex gap-24">
        <div className="space-y-12 max-w-[21.875rem] flex-1">
          <div className="">
            <Image
              src={author?.image.asset?.url as string}
              alt="author photo"
              className="object-cover h-[21.875rem] w-[21.875rem] group-hover:brightness-110 transition-all duration-300 rounded-full"
              quality={100}
              width={500}
              height={500}
              placeholder='blur'
              blurDataURL={author?.image.asset?.metadata?.lqip as string}
            />
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-black">
            <p className="text-xl uppercase font-semibold">Follow</p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href as string}
                  className="text-black transition-colors duration-200"
                  aria-label={social.label}
                  target="_blank"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-2 space-y-12">
          <div className="space-y-8">
            <h2 className="text-[6.5rem] font-semibold leading-[110%] uppercase">{author?.name}</h2>
            <b className="font-medium text-[1.375rem] leading-[180%]">
            {author?.bio}
            </b>
          </div>
          <p className="text-base leading-[180%]">
            {author?.fullBio}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AuthorDetailsSection
