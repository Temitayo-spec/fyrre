/**
 * This component uses Portable Text to render magazine content.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 */

import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'
import Image from 'next/image'
import ResolvedLink from '@/app/components/ResolvedLink'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({children}) => <p className="text-xl leading-[180%] mb-6">{children}</p>,
      h1: ({children, value}) => (
        <h1 className="text-4xl font-bold mb-6 group relative" id={value?._key}>
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Link to this section"
          >
            #
          </a>
        </h1>
      ),
      h2: ({children, value}) => (
        <h2 className="text-3xl font-bold mb-6 group relative" id={value?._key}>
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Link to this section"
          >
            #
          </a>
        </h2>
      ),
      h3: ({children, value}) => (
        <h3 className="text-2xl font-semibold mb-4 group relative" id={value?._key}>
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Link to this section"
          >
            #
          </a>
        </h3>
      ),
      blockquote: ({children}) => (
        <blockquote className="border-l-4 border-black pl-6 italic my-8">{children}</blockquote>
      ),
    },
    marks: {
      strong: ({children}) => <strong className="font-medium">{children}</strong>,
      em: ({children}) => <em className="italic">{children}</em>,
      medium: ({children}) => <b className="font-medium">{children}</b>,
      link: ({children, value: link}) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
    },
    types: {
      quote: ({value}) => (
        <div className="my-12 py-12 border-t border-b border-black flex gap-6">
          <span className="text-[6rem] font-semibold leading-[100%]">“</span>
          <div className="flex flex-col gap-6">
            <div className="text-[3rem] font-semibold leading-[120%]">{value.text}</div>
            {value.attribution && <p className="text-sm leading-[160%]">{value.attribution}</p>}
          </div>
        </div>
      ),
      contentImage: ({value}) => {
        if (!value?.asset) return null

        return (
          <figure className="my-8">
            <div className="relative w-full h-auto">
              <Image
                src={value.asset.url}
                alt={value.alt || 'Article image'}
                width={value.asset.metadata?.dimensions?.width || 800}
                height={value.asset.metadata?.dimensions?.height || 600}
                className="w-full h-auto object-cover"
                quality={90}
                placeholder={value.asset.metadata?.lqip ? 'blur' : undefined}
                blurDataURL={value.asset.metadata?.lqip}
              />
            </div>
            {value.caption && (
              <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
    list: {
      bullet: ({children}) => (
        <ul className="list-disc list-inside space-y-2 mb-6 text-xl leading-[180%]">{children}</ul>
      ),
      number: ({children}) => (
        <ol className="list-decimal list-inside space-y-2 mb-6 text-xl leading-[180%]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({children}) => <li className="ml-4">{children}</li>,
      number: ({children}) => <li className="ml-4">{children}</li>,
    },
  }

  return (
    <div className={['flex flex-col', className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  )
}
