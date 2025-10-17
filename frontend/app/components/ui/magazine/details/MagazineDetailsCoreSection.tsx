import CustomPortableText from '@/app/components/PortableText'
import {Instagram, Twitter, Youtube} from '@/app/components/shared/Icons'
import {formatDate} from '@/lib'
import {MagazineDetailQueryResult} from '@/sanity.types'
import Image from 'next/image'
import {FC} from 'react'

const MagazineDetailsCoreSection: FC<{magazine: MagazineDetailQueryResult}> = ({magazine}) => {
  const socialLinks = [
    {
      icon: <Instagram />,
      href: magazine?.socialShare?.instagram,
      label: 'Instagram',
    },
    {
      icon: <Twitter />,
      href: magazine?.socialShare?.twitter,
      label: 'X',
    },
    {
      icon: <Youtube />,
      href: magazine?.socialShare?.youtube,
      label: 'YouTube',
    },
  ].filter((link) => link.href)

  return (
    <section className="relative">
      <div className="max-w-[65rem] w-full mx-auto flex gap-16 pt-24 pb-48">
        <aside className="flex-1 max-w-[20rem] flex flex-col">
          <div className="pb-8 border-b border-black mb-8 flex items-center gap-4">
            <div className="w-[5rem] h-[5rem] rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={magazine?.author?.image?.asset?.url as string}
                alt={magazine?.author?.image?.alt || magazine?.author?.name || 'Author'}
                className="w-full h-full object-cover"
                width={80}
                height={80}
                placeholder="blur"
                blurDataURL={magazine?.author?.image?.asset?.metadata?.lqip as string}
              />
            </div>
            <h3 className="text-[2rem] leading-[120%] max-w-[14.3125rem] font-semibold">
              {magazine?.author?.name}
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-base leading-[180%] font-semibold">Date</p>
              <p className="text-base leading-[180%]">
                {formatDate(magazine?.publishedAt as string)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-base leading-[180%] font-semibold">Read</p>
              <p className="text-base leading-[180%]">{magazine?.duration} Min</p>
            </div>

            {socialLinks.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-base leading-[180%] font-semibold">Share</p>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href as string}
                      className="text-black transition-colors duration-200 hover:opacity-70"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        <article className="flex-1">
          {magazine?.content && <CustomPortableText value={magazine.content as any} />}
        </article>
      </div>
    </section>
  )
}

export default MagazineDetailsCoreSection
