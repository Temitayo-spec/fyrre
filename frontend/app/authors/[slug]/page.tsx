import {ArticlesByAuthor, AuthorDetailsSection} from '@/app/components'
import {sanityFetch} from '@/sanity/lib/live'
import {authorDetailQuery, authorSlugsQuery, authorWithArticlesQuery} from '@/sanity/lib/queries'
import {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: authorSlugsQuery,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const {data: author} = await sanityFetch({
    query: authorDetailQuery,
    params,
    stega: false,
  })

  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  return {
    title: author.seo?.metaTitle || author?.name,
    description: author.seo?.metaDescription || author.bio,
    openGraph: {
      title: author.seo?.metaTitle || author.name,
      description: author.seo?.metaDescription || author.bio,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: author.seo?.metaTitle || author.name,
      description: author.seo?.metaDescription || author.bio,
    },
  } satisfies Metadata
}

const Page = async (props: PageProps) => {
  const params = await props.params

  const {data: author} = await sanityFetch({
    query: authorWithArticlesQuery,
    params,
  })

  if (!author?._id) notFound()
  return (
    <main>
      <AuthorDetailsSection author={author} />
      <ArticlesByAuthor articles={author.articles || []} authorName={author.name} />
    </main>
  )
}

export default Page
