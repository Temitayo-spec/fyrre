import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const navLink = defineType({
  name: 'navLink',
  title: 'Navigation Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'string',
      title: 'URL',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'text',
      url: 'url',
    },
    prepare(selection) {
      const {title, url} = selection
      return {
        title: title || 'Navigation Link',
        subtitle: url,
      }
    },
  },
})
