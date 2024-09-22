import {defineField, defineType} from 'sanity'

export const location = defineType({
  name: 'location',
  type: 'document',
  fields: [
    defineField({
      name: 'street',
      title: 'Street',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'province',
      title: 'Province',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postcode',
      title: 'Postal Code',
      type: 'string',
    }),
  ],
  initialValue: {
    title: 'New Location',
  },
})
