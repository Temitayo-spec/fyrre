import {defineField, defineType} from 'sanity'

export const marquee = defineType({
  name: 'marquee',
  title: 'Marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Marquee',
      type: 'boolean',
      description: 'Toggle to show/hide the marquee',
      initialValue: true,
    }),
    defineField({
      name: 'text',
      title: 'Marquee Text',
      type: 'string',
      description: 'Text to display in the scrolling marquee',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'speed',
      title: 'Scroll Speed',
      type: 'number',
      description: 'Speed of the marquee animation (higher = faster)',
      initialValue: 50,
      validation: (rule) => rule.min(1).max(200),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'color',
    }),
  ],
})
