import {Footer, Magazine, Navbar} from '@/sanity.types'

interface Podcast {
  thumbnail: StaticImageData
  title: string
  episode_num: string
  publishedAt: string
  duration: string
  slug: string
}

interface NavbarType extends Navbar {}

interface FooterType extends Footer {}

interface ArticleRowType extends Omit<Magazine, 'slug'> {
  isFirst?: boolean
  isLast?: boolean
  slug: string
}

interface MostPopularType extends Magazine {
  isLast: boolean
  isFirst: boolean
  position: number
}