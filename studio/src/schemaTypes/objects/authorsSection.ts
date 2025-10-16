import {defineField, defineType} from 'sanity'

export const authorsSection = defineType({
  name: 'authorsSection',
  title: 'Authors Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Authors',
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          // {title: 'All Authors', value: 'all'},
          {title: 'Selected Authors', value: 'selected'},
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'authors',
      title: 'Select Authors',
      type: 'array',
      description: 'Manually select authors to display',
      of: [
        {
          type: 'reference',
          to: [{type: 'author'}],
        },
      ],
      hidden: ({parent}) => parent?.displayType !== 'selected',
      validation: (Rule) =>
        Rule.custom((value, context: any) => {
          if (context.parent?.displayType === 'selected' && (!value || value.length === 0)) {
            return 'Please select at least one author'
          }
          return true
        }),
    }),
    defineField({
      name: 'limit',
      title: 'Maximum Authors to Display',
      type: 'number',
      description: 'Leave empty to show all',
      validation: (Rule) => Rule.min(1).max(12),
      hidden: ({parent}) => parent?.displayType === 'selected',
    }),
    defineField({
      name: 'showAllAuthorsLink',
      title: 'Show "All Authors" Link',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'allAuthorsLinkText',
      title: 'All Authors Link Text',
      type: 'string',
      initialValue: 'All Authors',
      hidden: ({parent}) => !parent?.showAllAuthorsLink,
    }),
    defineField({
      name: 'allAuthorsLinkUrl',
      title: 'All Authors Link URL',
      type: 'string',
      initialValue: '/authors',
      hidden: ({parent}) => !parent?.showAllAuthorsLink,
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      displayType: 'displayType',
      authors: 'authors',
      limit: 'limit',
    },
    prepare({title, displayType, authors, limit}) {
      let subtitle = ''
      if (displayType === 'selected') {
        const count = authors?.length || 0
        subtitle = `Selected: ${count} author${count !== 1 ? 's' : ''}`
      }
      return {
        title: title || 'Authors Section',
        subtitle,
      }
    },
  },
})
