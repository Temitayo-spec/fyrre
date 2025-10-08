import {
  MagazineDetailsCoreSection,
  MagazineDetailsHeroSection,
  MagazineLatestPosts,
} from '@/app/components'
import {magazines} from '@/constants/magazines'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const Page = async ({params}: PageProps) => {
  const {slug} = await params

  return (
    <main>
      <MagazineDetailsHeroSection />
      <MagazineDetailsCoreSection />
      <MagazineLatestPosts magazines={magazines} slug={slug} />
    </main>
  )
}

export default Page
