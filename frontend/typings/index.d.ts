import {Footer, Navbar} from '@/sanity.types'

interface Magazine {
  title: string
  category: string
  publishedAt: string
  thumbnail: string
  excerpt: string
  author: string
  duration: number
}

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
