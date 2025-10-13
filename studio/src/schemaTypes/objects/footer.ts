import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      type: 'newsletter',
    }),
    defineField({
      name: 'marquee',
      title: 'Newsletter Marquee',
      type: 'marquee',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            return rule.custom((alt, context) => {
              if ((context.document?.logo as any)?.asset?._ref && !alt) {
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
    defineField({name: 'tagline', type: 'string', title: 'Tagline'}),

    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{type: 'navLink'}],
    }),
    defineField({name: 'copyright', type: 'string', title: 'Copyright'}),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
  ],
})
