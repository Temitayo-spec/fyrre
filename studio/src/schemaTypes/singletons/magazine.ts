import {defineField, defineType} from 'sanity'

export const magazine = defineType({
  name: 'magazine',
  title: 'Magazine',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description shown on the card',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Art', value: 'art'},
          {title: 'Street Art', value: 'street-art'},
          {title: 'Sculptures', value: 'sculptures'},
        ],
      },
      validation: (Rule) => Rule.required(),
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
      name: 'heroImage',
      title: 'Hero Banner Image',
      type: 'image',
      description: 'Large banner image for the details page',
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
        dateFormat: 'DD. MMMM YYYY',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Reading Duration',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'label',
      title: 'Label Badge',
      type: 'string',
      description: 'Optional label badge (e.g., "Featured", "New", "Trending")',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      description: 'Longer description shown on the detail page hero section',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Main content of the post',
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   type: 'object',
    //   name: 'quote',
    //   title: 'Pull Quote',
    //   fields: [
    //     {
    //       name: 'text',
    //       title: 'Quote Text',
    //       type: 'text',
    //       validation: (Rule) => Rule.required(),
    //     },
    //     {
    //       name: 'attribution',
    //       title: 'Attribution',
    //       type: 'string',
    //       description: 'Person or source of the quote',
    //     },
    //   ],
    // }),
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
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured to highlight this article',
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
      subtitle: 'category',
      media: 'thumbnail',
      date: 'publishedAt',
      author: 'author.name',
    },
    prepare({title, subtitle, media, date, author}) {
      return {
        title,
        subtitle: `${subtitle} • ${author} • ${date}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})

