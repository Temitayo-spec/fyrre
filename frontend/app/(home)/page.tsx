import {Suspense} from 'react'
import Link from 'next/link'
import {PortableText} from '@portabletext/react'

import {AllPosts} from '@/app/components/Posts'
import GetStartedCode from '@/app/components/GetStartedCode'
import SideBySideIcons from '@/app/components/SideBySideIcons'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {HomeHeroSection, ArticlesSection, PodcastSection, AuthorsSection} from '../components'

export default async function Page() {
  return (
    <>
      <HomeHeroSection />
      <ArticlesSection />
      <PodcastSection />
      <AuthorsSection />
    </>
  )
}
