import { defineField, defineType } from 'sanity'

export const podcastSection = defineType({
  name: 'podcastSection',
  title: 'Podcast Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Podcast',
    }),
    defineField({
      name: 'episodes',
      title: 'Featured Episodes',
      type: 'array',
      description: 'Select episodes to feature (max 3)',
      of: [
        {
          type: 'reference',
          to: [{type: 'podcast'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: 'showAllEpisodesLink',
      title: 'Show "All Episodes" Link',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'allEpisodesLinkText',
      title: 'All Episodes Link Text',
      type: 'string',
      initialValue: 'All Episodes',
      hidden: ({parent}) => !parent?.showAllEpisodesLink,
    }),
    defineField({
      name: 'allEpisodesLinkUrl',
      title: 'All Episodes Link URL',
      type: 'string',
      initialValue: '/podcast',
      hidden: ({parent}) => !parent?.showAllEpisodesLink,
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
      name: 'animations',
      title: 'Animation Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'enabled',
          title: 'Enable Animations',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
  ],
  preview: {
    select: {
      episodes: 'episodes',
      title: 'sectionTitle',
    },
    prepare({episodes, title}) {
      const episodeCount = episodes?.length || 0
      return {
        title: title || 'Podcast Section',
        subtitle: `${episodeCount} episode${episodeCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
