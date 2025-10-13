import {defineField, defineType} from 'sanity'

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo Image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [{type: 'navLink'}],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'socialLink'}],
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
    }),
  ],
})
