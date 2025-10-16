import {MagazineCoreSection, MagazineHeroSection} from '../components'
import {getPageQuery, magazineQuery, settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import * as demo from '@/sanity/lib/demo'
import {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const [{data: page}, {data: settings}] = await Promise.all([
    sanityFetch({query: getPageQuery, params: {slug: 'magazine'}, stega: false}),
    sanityFetch({query: settingsQuery, stega: false}),
  ])

  const pageTitle = page?.name || 'Home'
  const siteTitle = settings?.title || demo.title

  return {
    title: `${pageTitle} | ${siteTitle}`,
  }
}
const Page = async () => {
  const [{data: magazines}] = await Promise.all([sanityFetch({query: magazineQuery})])
  return (
    <main>
      <MagazineHeroSection />
      <MagazineCoreSection magazines={magazines} />
    </main>
  )
}

export default Page
