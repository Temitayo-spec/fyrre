import {PodcastCoreSection, PodcastHeroSection} from '../components'
import {authorsQuery, getPageQuery, magazineQuery, podcastsQuery, settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import * as demo from '@/sanity/lib/demo'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const [{data: page}, {data: settings}] = await Promise.all([
    sanityFetch({query: getPageQuery, params: {slug: 'podcast'}, stega: false}),
    sanityFetch({query: settingsQuery, stega: false}),
  ])

  const pageTitle = page?.name || 'Authors'
  const siteTitle = settings?.title || demo.title

  return {
    title: `${pageTitle} | ${siteTitle}`,
  }
}
const Page = async () => {
  const [{data: podcasts}] = await Promise.all([sanityFetch({query: podcastsQuery})])
  return (
    <main className='mb-48'>
      <PodcastHeroSection />
      <PodcastCoreSection podcasts={podcasts} />
    </main>
  )
}

export default Page
