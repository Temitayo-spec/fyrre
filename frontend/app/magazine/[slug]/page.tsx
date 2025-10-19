import {
  MagazineDetailsCoreSection,
  MagazineDetailsHeroSection,
  MagazineLatestPosts,
} from '@/app/components'
import {sanityFetch} from '@/sanity/lib/live'
import {magazineDetailQuery, latestMagazinesQuery, magazineSlugsQuery} from '@/sanity/lib/queries'
import {notFound} from 'next/navigation'
import type {Metadata} from 'next'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: magazineSlugsQuery,
    perspective: 'published',
    stega: false,
  })

  return data
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const {data: magazine} = await sanityFetch({
    query: magazineDetailQuery,
    params,
    stega: false,
  })

  if (!magazine) {
    return {
      title: 'Magazine Not Found',
    }
  }

  return {
    title: magazine.seo?.metaTitle || magazine.title,
    description: magazine.seo?.metaDescription || magazine.excerpt,
    openGraph: {
      title: magazine.seo?.metaTitle || magazine.title,
      description: magazine.seo?.metaDescription || magazine.excerpt,
      images: magazine.seo?.ogImage?.asset?.url
        ? [magazine.seo.ogImage.asset.url]
        : magazine.heroImage?.asset?.url
          ? [magazine.heroImage.asset.url]
          : [],
      type: 'article',
      publishedTime: magazine.publishedAt,
      authors: [magazine.author?.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: magazine.seo?.metaTitle || magazine.title,
      description: magazine.seo?.metaDescription || magazine.excerpt,
      images: magazine.seo?.ogImage?.asset?.url
        ? [magazine.seo.ogImage.asset.url]
        : magazine.heroImage?.asset?.url
          ? [magazine.heroImage.asset.url]
          : [],
    },
  } satisfies Metadata
}

export default async function MagazineDetailPage(props: PageProps) {
  const params = await props.params

  const [{data: magazine}, {data: latestPosts}] = await Promise.all([
    sanityFetch({
      query: magazineDetailQuery,
      params,
    }),
    sanityFetch({
      query: latestMagazinesQuery,
      params,
    }),
  ])

  if (!magazine?._id) {
    notFound()
  }

  return (
    <main>
      <MagazineDetailsHeroSection magazine={magazine} />
      <MagazineDetailsCoreSection magazine={magazine} />
      <MagazineLatestPosts magazines={latestPosts || []} slug={params.slug} />
    </main>
  )
}
