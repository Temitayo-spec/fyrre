import {defineField, defineType} from 'sanity'

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Format: 01, 02, 03, etc.',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      placeholder: 'e.g., 1h 20 Min, 45 Min',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Episode Description',
      type: 'text',
      rows: 4,
      description: 'Short description of the episode',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'content',
      title: 'Episode Content',
      type: 'blockContent',
      description: 'Full episode show notes and description',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'podcastLinks',
      title: 'Listen On',
      type: 'object',
      fields: [
        {
          name: 'spotify',
          title: 'Spotify URL',
          type: 'url',
        },
        {
          name: 'apple',
          title: 'Apple Podcasts URL',
          type: 'url',
        },
        {
          name: 'soundcloud',
          title: 'SoundCloud URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'podcastBranding',
      title: 'Podcast Branding',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'name',
          title: 'Podcast Name',
          type: 'string',
          initialValue: 'Fyrre',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Podcast',
        },
      ],
    }),
    defineField({
      name: 'socialShare',
      title: 'Social Share Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Episode',
      type: 'boolean',
      description: 'Highlight this episode',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media sharing',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      episodeNumber: 'episodeNumber',
      media: 'thumbnail',
      date: 'publishedAt',
    },
    prepare({title, episodeNumber, media, date}) {
      return {
        title: `EP${episodeNumber}: ${title}`,
        subtitle: date,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Episode Number, Latest',
      name: 'episodeDesc',
      by: [{field: 'episodeNumber', direction: 'desc'}],
    },
    {
      title: 'Episode Number, Oldest',
      name: 'episodeAsc',
      by: [{field: 'episodeNumber', direction: 'asc'}],
    },
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
