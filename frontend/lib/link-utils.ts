import {Link} from '@/sanity.types'

export interface ProcessedLink {
  href: string
  isExternal: boolean
  target?: string
  rel?: string
}

export function processLink(link: Link | null | undefined): ProcessedLink {
  if (!link) {
    return {href: '#', isExternal: false}
  }

  const {linkType, page, url, href, openInNewTab} = link

  switch (linkType) {
    case 'page':
      if (page) {
        // Remove leading slash if present and add it back to ensure proper format
        const cleanPage = page.startsWith('/') ? page.slice(1) : page
        return {
          href: `/${cleanPage}`,
          isExternal: false,
          ...(openInNewTab && {target: '_blank', rel: 'noopener noreferrer'}),
        }
      }
      return {href: '#', isExternal: false}

    case 'url':
      if (url) {
        return {
          href: url,
          isExternal: true,
          ...(openInNewTab && {target: '_blank', rel: 'noopener noreferrer'}),
        }
      }
      return {href: '#', isExternal: false}

    case 'href':
      if (href) {
        return {
          href: href.startsWith('#') ? href : `#${href}`,
          isExternal: false,
        }
      }
      return {href: '#', isExternal: false}

    default:
      return {href: '#', isExternal: false}
  }
}

export function getLinkProps(link: Link | null | undefined) {
  const processed = processLink(link)

  return {
    href: processed.href,
    ...(processed.isExternal && {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
    ...(processed.target && {target: processed.target}),
    ...(processed.rel && {rel: processed.rel}),
  }
}
