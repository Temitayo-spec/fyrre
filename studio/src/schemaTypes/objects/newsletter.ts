import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const newsletter = defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'object',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Active',
      description: 'Show or hide the newsletter section',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
    }),
    defineField({
      name: 'inputPlaceholder',
      type: 'string',
      title: 'Input Placeholder',
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
    },
    prepare(selection) {
      const {title, active} = selection
      return {
        title: title || 'Newsletter',
        subtitle: active ? 'Active' : 'Inactive',
      }
    },
  },
})
