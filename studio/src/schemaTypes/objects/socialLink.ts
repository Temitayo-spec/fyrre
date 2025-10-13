import {defineField, defineType} from 'sanity'
import {ShareIcon} from '@sanity/icons'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  icon: ShareIcon,
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      title: 'Platform',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.icon as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            })
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'platform',
      url: 'url',
    },
    prepare(selection) {
      const {title, url} = selection
      return {
        title: title || 'Social Link',
        subtitle: url,
      }
    },
  },
})
