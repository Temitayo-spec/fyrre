import {LatestPodcasts, PodcastDetailsSection} from '@/app/components'
import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {podcastSlugsQuery, latestPodcastsQuery, podcastDetailQuery} from '@/sanity/lib/queries'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'
import {LatestPodcastsQueryResult, PodcastDetailQueryResult} from '@/sanity.types'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: podcastSlugsQuery,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const {data: podcast} = await sanityFetch({
    query: podcastDetailQuery,
    params,
    stega: false,
  })

  if (!podcast) {
    return {
      title: 'Podcast Not Found',
    }
  }

  return {
    title: podcast.seo?.metaTitle || podcast.title,
    description: podcast.seo?.metaDescription || podcast.excerpt,
    openGraph: {
      title: podcast.seo?.metaTitle || podcast.title,
      description: podcast.seo?.metaDescription || podcast.excerpt,
      images: podcast.seo?.ogImage?.asset?.url
        ? [podcast.seo.ogImage.asset.url]
        : podcast.thumbnail?.asset?.url
          ? [podcast.thumbnail.asset.url]
          : [],
      type: 'article',
      publishedTime: podcast.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: podcast.seo?.metaTitle || podcast.title,
      description: podcast.seo?.metaDescription || podcast.excerpt,
      images: podcast.seo?.ogImage?.asset?.url
        ? [podcast.seo.ogImage.asset.url]
        : podcast.thumbnail?.asset?.url
          ? [podcast.thumbnail.asset.url]
          : [],
    },
  } satisfies Metadata
}

export default async function PodcastDetailPage(props: PageProps) {
  const params = await props.params

  const [{data: podcast}, {data: latestPodcasts}] = await Promise.all([
    sanityFetch({query: podcastDetailQuery, params}),
    sanityFetch({query: latestPodcastsQuery, params}),
  ])

  if (!podcast?._id) notFound()

  return (
    <main>
      <div className="flex items-center justify-between pt-6 md:pt-8 mb-12 md:mb-24 wrapper">
        <Link href="/podcast" className="inline-flex items-center gap-1 md:gap-2">
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

        <h3 className="text-lg md:text-[2rem] font-semibold leading-[110%] uppercase">Podcast</h3>
      </div>

      <PodcastDetailsSection podcast={podcast as PodcastDetailQueryResult} />
      <LatestPodcasts
        podcasts={(latestPodcasts as LatestPodcastsQueryResult) || []}
        slug={params.slug}
      />
    </main>
  )
}
