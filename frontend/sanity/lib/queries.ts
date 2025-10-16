import { defineQuery } from 'next-sanity'

// Query for podcast section in page builder
export const podcastSectionQuery = `
  _type == "podcastSection" => {
    _key,
    _type,
    sectionTitle,
    episodes[]->{
      _id,
      _type,
      title,
      "slug": slug.current,
      episodeNumber,
      thumbnail {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
        alt,
        hotspot,
        crop
      },
      publishedAt,
      duration
    },
    showAllEpisodesLink,
    allEpisodesLinkText,
    allEpisodesLinkUrl,
    podcastBranding {
      name,
      subtitle
    },
    animations {
      enabled
    }
  }
`

// Query for authors section in page builder
export const authorsSectionQuery = `
  _type == "authorsSection" => {
    _key,
    _type,
    sectionTitle,
    authors[]->{
      _id,
      _type,
      name,
      "slug": slug.current,
      image {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
        alt,
        hotspot,
        crop
      },
      job,
      city,
      bio,
      socialLinks {
        instagram,
        twitter,
        youtube
      },
      featured,
      "articleCount": count(*[_type == 'magazine' && author._ref == ^._id])
    },
    limit,
    showAllAuthorsLink,
    allAuthorsLinkText,
    allAuthorsLinkUrl
  }
`

// Query for author slugs (for static generation)
export const authorSlugsQuery = defineQuery(`
  *[_type == 'author'] {
    "slug": slug.current
  }
`)

// // Query for author with their articles (combined)
// export const authorWithArticlesQuery = defineQuery(`
//   *[_type == 'author' && slug.current == $slug][0] {
//     _id,
//     _type,
//     name,
//     "slug": slug.current,
//     image {
//       asset->{
//         _id,
//         url,
//         metadata {
//           lqip,
//           dimensions {
//             width,
//             height,
//             aspectRatio
//           }
//         }
//       },
//       alt,
//       hotspot,
//       crop
//     },
//     job,
//     city,
//     bio,
//     fullBio,
//     intro,
//     socialLinks {
//       instagram,
//       twitter,
//       youtube
//     },
//     featured,
//     "articles": *[_type == 'magazine' && author._ref == ^._id] | order(publishedAt desc) {
//       _id,
//       _type,
//       title,
//       "slug": slug.current,
//       thumbnail {
//         asset->{
//           _id,
//           url,
//           metadata {
//             lqip,
//             dimensions {
//               width,
//               height,
//               aspectRatio
//             }
//           }
//         },
//         alt,
//         hotspot,
//         crop
//       },
//       publishedAt,
//       duration
//     },
//     "articleCount": count(*[_type == 'magazine' && author._ref == ^._id]),
//     seo {
//       metaTitle,
//       metaDescription
//     }
//   }
// `)

// // Query for single author detail page
// export const authorDetailQuery = defineQuery(`
//   *[_type == 'author' && slug.current == $slug][0] {
//     _id,
//     _type,
//     name,
//     "slug": slug.current,
//     image {
//       asset->{
//         _id,
//         url,
//         metadata {
//           lqip,
//           dimensions {
//             width,
//             height,
//             aspectRatio
//           }
//         }
//       },
//       alt,
//       hotspot,
//       crop
//     },
//     job,
//     city,
//     bio,
//     fullBio,
//     intro,
//     socialLinks {
//       instagram,
//       twitter,
//       youtube
//     },
//     featured,
//     seo {
//       metaTitle,
//       metaDescription
//     }
//   }
// `)


export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  _id,
  title,
  description,
  ogImage,
  footer {
    newsletter {
      active,
      title,
      description,
      inputPlaceholder,
      buttonText,
    },
    marquee,
    logo {
      asset->{
        url
      },
      alt
    },
    tagline,
    description,
    navLinks[] {
      text,
      url
    },
    copyright,
    socialLinks[] {
      platform,
      url,
      icon {
        asset->{
          url
        },
        alt
      }
    },
  },
  navbar {
    logo {
      asset->{
        url
      },
      alt
    },
    navLinks[] {
      text,
      url
    },
    socialLinks[] {
      platform,
      url,
      icon {
        asset->{
          url
        },
        alt
      }
    },
    button {
      text,
      link {
        _type,
        _key,
        linkType,
        page,
        url,
        href,
        openInNewTab
      },
      type
    }
  }
}`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
        _type == "heroSection" => {
        _key,
        _type,
        heroText {
          enabled,
          strokeColor {
            hex
          },
          fillColor {
            hex
          }
        },
        newsTicker {
          enabled,
          label,
          backgroundColor,
          textColor,
          items[] {
            text
          },
          speed
        },
        heroHeading,
        description,
        metadata {
          author {
            label,
            name
          },
          date {
            label,
            value
          },
          duration {
            label,
            value
          }
        },
        label {
          text,
          borderColor,
          textColor
        },
        heroImage {
          asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions {
                width,
                height,
                aspectRatio
              }
            }
          },
          alt,
          hotspot,
          crop
        },
        animations {
          enabled,
          parallaxStrength
        },
        styling {
          headingColor,
          descriptionColor,
          backgroundColor
        }
      },
      _type == "articlesSection" => {
        _key,
        _type,
        sectionTitle,
        articles[]->{
          ...,
          _id,
          _type,
          title,
          "slug": slug.current,
          excerpt,
          category,
          thumbnail {
            asset->{
              _id,
              url,
              metadata {
                lqip,
                dimensions {
                  width,
                  height,
                  aspectRatio
                }
              }
            },
            alt,
            hotspot,
            crop
          },
          publishedAt,
          "author": author->{
            name
          },
          duration
        },
        showAllArticlesLink,
        allArticlesLinkText,
        allArticlesLinkUrl,
        sidebar {
          printMagazine {
            enabled,
            label,
            issue,
            coverImage {
              asset->{
                _id,
                url,
                metadata {
                  lqip,
                  dimensions {
                    width,
                    height,
                    aspectRatio
                  }
                }
              },
              alt,
              hotspot,
              crop
            },
            buttonText,
            buttonLink
          },
          mostPopular {
            enabled,
            title,
            articles[]->{
              _id,
              _type,
              title,
              "slug": slug.current,
              "author": author->{
                name
              }
            }
          },
          newsletter {
            enabled,
            label,
            heading,
            placeholder,
            buttonText,
            backgroundColor
          }
        },
        animations {
          enabled,
          animationDuration
        },
        layout {
          mainColumnWidth,
          showSidebar
        }
      },
      ${podcastSectionQuery},
      ${authorsSectionQuery},
    },
  }
`)

export const magazineQuery = defineQuery(`
  *[_type == 'magazine'] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    "author": author.name,
    duration,
    label,
    featured
  }
`)

export const magazineDetailQuery = defineQuery(`
  *[_type == 'magazine' && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    heroDescription,
    publishedAt,
    author {
      name,
      image {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        },
        alt,
        hotspot,
        crop
      },
      bio
    },
    duration,
    label,
    content[] {
      ...,
      markDefs[]{
      ...,
      ${linkReference}
     },
    },
    // quote {
    //   text,
    //   attribution
    // },
    socialShare {
      instagram,
      twitter,
      youtube
    },
    featured,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          _id,
          url
        }
      }
    }
  }
`)

export const featuredMagazinesQuery = defineQuery(`
  *[_type == 'magazine' && featured == true] | order(publishedAt desc) [0..5] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    "author": author.name,
    duration,
    label,
    featured
  }
`)

export const latestMagazinesQuery = defineQuery(`
  *[_type == 'magazine' && slug.current != $slug] | order(publishedAt desc) [0..2] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    "author": author.name,
    duration,
    label
  }
`)

export const magazineSlugsQuery = defineQuery(`
  *[_type == 'magazine'] {
    "slug": slug.current
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)


// Query for podcast listing page
export const podcastsQuery = defineQuery(`
  *[_type == 'podcast'] | order(episodeNumber desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    episodeNumber,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    duration,
    featured
  }
`)

// Query for single podcast detail page
export const podcastDetailQuery = defineQuery(`
  *[_type == 'podcast' && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    episodeNumber,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    duration,
    excerpt,
    content,
    podcastLinks {
      spotify,
      apple,
      soundcloud
    },
    socialShare {
      instagram,
      twitter,
      youtube
    },
    featured,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->{
          _id,
          url
        }
      }
    }
  }
`)

// Query for latest podcasts (excluding current)
export const latestPodcastsQuery = defineQuery(`
  *[_type == 'podcast' && slug.current != $slug] | order(episodeNumber desc) [0..2] {
    _id,
    _type,
    title,
    "slug": slug.current,
    episodeNumber,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    duration
  }
`)

// Query for featured podcasts
export const featuredPodcastsQuery = defineQuery(`
  *[_type == 'podcast' && featured == true] | order(episodeNumber desc) [0..5] {
    _id,
    _type,
    title,
    "slug": slug.current,
    episodeNumber,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt,
      hotspot,
      crop
    },
    publishedAt,
    duration,
    featured
  }
`)

// Query for podcast slugs (for static generation)
export const podcastSlugsQuery = defineQuery(`
  *[_type == 'podcast'] {
    "slug": slug.current
  }
`)

