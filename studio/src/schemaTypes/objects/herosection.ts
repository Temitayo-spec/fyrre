import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heroText',
      title: 'Main Hero SVG Text',
      type: 'object',
      description: 'Configuration for the animated "SVG" text',
      fields: [
        {
          name: 'enabled',
          title: 'Show SVG Text',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'strokeColor',
          title: 'Stroke Color',
          type: 'color',
          initialValue: '#000000',
          description: 'Color for the drawing animation stroke',
        },
        {
          name: 'fillColor',
          title: 'Fill Color',
          type: 'color',
          initialValue: '#000000',
          description: 'Final fill color after animation',
        },
      ],
    }),
    defineField({
      name: 'newsTicker',
      title: 'News Ticker',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show News Ticker',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'label',
          title: 'Ticker Label',
          type: 'string',
          initialValue: 'News Ticker+++',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          initialValue: '#000000',
          description: 'Background color for ticker bar',
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          initialValue: '#ffffff',
        },
        {
          name: 'items',
          title: 'Ticker Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'text',
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'speed',
          title: 'Scroll Speed',
          type: 'number',
          initialValue: 50,
          description: 'Speed of the marquee animation (higher = faster)',
        },
      ],
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: "Don't close your eyes",
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'author',
          title: 'Author',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Text',
            },
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'date',
          title: 'Date',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Date',
            },
            {
              name: 'value',
              title: 'Date Value',
              type: 'date',
              validation: (Rule) => Rule.required(),
              options: {
                dateFormat: 'DD. MMMM YYYY',
              },
            },
          ],
        },
        {
          name: 'duration',
          title: 'Duration',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Duration',
            },
            {
              name: 'value',
              title: 'Duration Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              placeholder: 'e.g., 1 Min, 5 Min, etc.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'label',
      title: 'Label Badge',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Label Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'borderColor',
          title: 'Border Color',
          type: 'string',
          initialValue: '#000000',
        },
        {
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          initialValue: '#000000',
        },
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
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
        {
          name: 'parallaxStrength',
          title: 'Image Parallax Strength',
          type: 'number',
          initialValue: -30,
          description: 'Negative values move image up on scroll',
        },
      ],
    }),
    defineField({
      name: 'styling',
      title: 'Styling Options',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'headingColor',
          title: 'Heading Color',
          type: 'string',
          initialValue: '#000000',
        },
        {
          name: 'descriptionColor',
          title: 'Description Color',
          type: 'string',
          initialValue: '#000000',
        },
        {
          name: 'backgroundColor',
          title: 'Section Background Color',
          type: 'string',
          initialValue: '#ffffff',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroHeading',
      media: 'heroImage',
    },
    prepare({title, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero Section Component',
        media,
      }
    },
  },
})
