import {defineField, defineType} from 'sanity'

export const articlesSection = defineType({
  name: 'articlesSection',
  title: 'Articles Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Optional section title (hidden by default)',
      hidden: true,
    }),
    defineField({
      name: 'articles',
      title: 'Featured Articles',
      type: 'array',
      description: 'Select articles to feature in this section',
      of: [
        {
          type: 'reference',
          to: [{type: 'magazine'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
    defineField({
      name: 'showAllArticlesLink',
      title: 'Show "All Articles" Link',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'allArticlesLinkText',
      title: 'All Articles Link Text',
      type: 'string',
      initialValue: 'All articles',
      hidden: ({parent}) => !parent?.showAllArticlesLink,
    }),
    defineField({
      name: 'allArticlesLinkUrl',
      title: 'All Articles Link URL',
      type: 'string',
      initialValue: '/articles',
      hidden: ({parent}) => !parent?.showAllArticlesLink,
    }),
    defineField({
      name: 'sidebar',
      title: 'Sidebar Configuration',
      type: 'object',
      fields: [
        {
          name: 'printMagazine',
          title: 'Print Magazine',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Show Print Magazine',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Printmagazine',
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'issue',
              title: 'Issue Number',
              type: 'string',
              placeholder: 'e.g., 03/2022',
              validation: (Rule) => Rule.required(),
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'coverImage',
              title: 'Cover Image',
              type: 'image',
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
              validation: (Rule) => Rule.required(),
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Button',
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string',
              description: 'URL or path for the button',
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        },
        {
          name: 'mostPopular',
          title: 'Most Popular',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Show Most Popular',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              initialValue: 'Most Popular',
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'articles',
              title: 'Popular Articles',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'magazine'}],
                },
              ],
              validation: (Rule) => Rule.max(3),
              description: 'Select up to 3 articles',
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
        },
        {
          name: 'newsletter',
          title: 'Newsletter',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Show Newsletter Form',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'NewsLetter',
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              initialValue: 'Design News to your inbox',
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'placeholder',
              title: 'Email Placeholder',
              type: 'string',
              initialValue: 'Email',
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Sign up',
              hidden: ({parent}) => !parent?.enabled,
            },
            {
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'string',
              initialValue: '#F5F5F5',
              description: 'Hex color for newsletter background',
              hidden: ({parent}) => !parent?.enabled,
            },
          ],
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
          name: 'animationDuration',
          title: 'Animation Duration (seconds)',
          type: 'number',
          initialValue: 0.6,
          description: 'Duration of scroll animations',
          hidden: ({parent}) => !parent?.enabled,
        },
      ],
    }),
    defineField({
      name: 'layout',
      title: 'Layout Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: 'mainColumnWidth',
          title: 'Main Column Width',
          type: 'string',
          options: {
            list: [
              {title: '75% / 25%', value: '3/4'},
              {title: '66% / 33%', value: '2/3'},
              {title: '60% / 40%', value: '3/5'},
            ],
          },
          initialValue: '3/4',
        },
        {
          name: 'showSidebar',
          title: 'Show Sidebar',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
  ],
  preview: {
    select: {
      articles: 'articles',
      sidebarEnabled: 'layout.showSidebar',
    },
    prepare({articles, sidebarEnabled}) {
      const articleCount = articles?.length || 0
      return {
        title: 'Articles Section',
        subtitle: `${articleCount} article${articleCount !== 1 ? 's' : ''} • Sidebar: ${sidebarEnabled ? 'On' : 'Off'}`,
      }
    },
  },
})
