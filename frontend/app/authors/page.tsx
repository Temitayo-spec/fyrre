import React from 'react'
import {AuthorsCoreSection, AuthorsHeroSection} from '../components'
import {authorsQuery, getPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import * as demo from '@/sanity/lib/demo'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const [{data: page}, {data: settings}] = await Promise.all([
    sanityFetch({query: getPageQuery, params: {slug: 'authors'}, stega: false}),
    sanityFetch({query: settingsQuery, stega: false}),
  ])

  const pageTitle = page?.name || 'Authors'
  const siteTitle = settings?.title || demo.title

  return {
    title: `${pageTitle} | ${siteTitle}`,
  }
}
const Page = async () => {
  const [{data: authors}] = await Promise.all([sanityFetch({query: authorsQuery})])
  return (
    <main className="mb-48">
      <AuthorsHeroSection />
      <AuthorsCoreSection authors={authors} />
    </main>
  )
}

export default Page
