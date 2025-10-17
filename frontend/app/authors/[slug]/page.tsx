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
      <div className="flex items-center justify-between pt-8 mb-24 wrapper">
        <Link href="/authors" className="inline-flex items-center gap-2">
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

        <h3 className="text-[2rem] font-semibold leading-[110%] uppercase">Author</h3>
      </div>
      <AuthorDetailsSection author={author} />
      <ArticlesByAuthor articles={author.articles || []} authorName={author.name} />
    </main>
  )
}

export default Page
