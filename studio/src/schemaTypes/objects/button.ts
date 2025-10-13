import {defineField, defineType} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'text',
      type: 'string',
      title: 'Button Text',
    }),
    defineField({
      name: 'link',
      type: 'link',
      title: 'Button Link',
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Button Type',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Bordered', value: 'bordered'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Ghost', value: 'ghost'},
          {title: 'Elevated', value: 'elevated'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'text',
      type: 'type',
    },
    prepare(selection) {
      const {title, type} = selection
      return {
        title: title || 'Button',
        subtitle: type ? `${type} button` : 'Button',
      }
    },
  },
})
