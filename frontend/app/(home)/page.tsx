import {Suspense} from 'react'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'

import {AllPosts} from '@/app/components/Posts'
import GetStartedCode from '@/app/components/GetStartedCode'
import SideBySideIcons from '@/app/components/SideBySideIcons'
import {getPageQuery, settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {HomeHeroSection, ArticlesSection, PodcastSection, AuthorsSection} from '../components'
import {Metadata} from 'next'
import * as demo from '@/sanity/lib/demo'
import {getSectionByType} from '@/lib'
import {
  ArticlesSection as ArticlesSectionType,
  AuthorsSection as AuthorsSectionType,
  HeroSection,
  PodcastSection as PodcastSectionType,
} from '@/sanity.types'

export async function generateMetadata(): Promise<Metadata> {
  const [{data: page}, {data: settings}] = await Promise.all([
    sanityFetch({query: getPageQuery, params: {slug: 'home'}, stega: false}),
    sanityFetch({query: settingsQuery, stega: false}),
  ])

  const pageTitle = page?.name || 'Home'
  const siteTitle = settings?.title || demo.title

  return {
    title: `${pageTitle} | ${siteTitle}`,
  }
}

export default async function Page() {
  const [{data: page}] = await Promise.all([
    sanityFetch({query: getPageQuery, params: {slug: 'home'}}),
  ])
  return (
    <>
      <HomeHeroSection
        props={getSectionByType(page?.pageBuilder ?? [], 'heroSection') as HeroSection}
      />
      <ArticlesSection
        props={getSectionByType(page?.pageBuilder ?? [], 'articlesSection') as ArticlesSectionType}
      />
      <PodcastSection
        props={getSectionByType(page?.pageBuilder ?? [], 'podcastSection') as PodcastSectionType}
      />
      <AuthorsSection
        props={getSectionByType(page?.pageBuilder ?? [], 'authorsSection') as AuthorsSectionType}
      />
    </>
  )
}
