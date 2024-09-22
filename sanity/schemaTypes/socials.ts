import {defineType, defineField, defineArrayMember} from 'sanity'

export const socials = defineType({
  name: 'socials',
  title: 'Socials',
  type: 'document',
  fields: [
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }).custom((url) => {
              if (url && !url.includes('facebook.com')) {
                return 'Please enter a valid Facebook URL'
              }
              return true
            }),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }).custom((url) => {
              if (url && !url.includes('instagram.com')) {
                return 'Please enter a valid Instagram URL'
              }
              return true
            }),
        }),
        defineField({
          name: 'x',
          title: 'X (formerly Twitter)',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }).custom((url) => {
              if (url && !url.includes('twitter.com') && !url.includes('x.com')) {
                return 'Please enter a valid X (Twitter) URL'
              }
              return true
            }),
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }).custom((url) => {
              if (url && !url.includes('youtube.com') && !url.includes('youtu.be')) {
                return 'Please enter a valid YouTube URL'
              }
              return true
            }),
        }),
      ],
      options: {
        collapsed: false,
        collapsible: true,
      },
    }),
    defineField({
      name: 'phoneNumbers',
      title: 'Phone Numbers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'phoneNumber',
          fields: [
            defineField({
              name: 'number',
              title: 'Phone Number',
              type: 'string',
              validation: (Rule) =>
                Rule.regex(/^(\+1|1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/).error(
                  'Please enter a valid Canadian phone number',
                ),
            }),
          ],
          preview: {
            select: {
              title: 'number',
              subtitle: 'label',
            },
          },
        }),
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Email Address',
          type: 'email',
        }),
      ],
      options: {
        collapsed: false,
        collapsible: true,
      },
    }),
  ],
})
