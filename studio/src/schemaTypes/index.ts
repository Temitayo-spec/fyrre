import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {navbar} from './objects/navbar'
import {footer} from './objects/footer'
import {marquee} from './objects/marquee'
import {navLink} from './objects/navLink'
import {newsletter} from './objects/newsletter'
import {socialLink} from './objects/socialLink'
import {button} from './objects/button'
import {heroSection} from './objects/herosection'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  // Objects
  blockContent,
  infoSection,
  heroSection,
  callToAction,
  link,
  navbar,
  footer,
  marquee,
  navLink,
  newsletter,
  socialLink,
  button,
]
