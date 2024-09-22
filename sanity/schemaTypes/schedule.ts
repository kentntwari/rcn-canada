import {defineType, defineField} from 'sanity'

export const schedule = defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'document',
  fields: [
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        {
          name: 'startDate',
          title: 'Start Date',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'endDate',
          title: 'End Date',
          type: 'date',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) =>
        Rule.custom((dateRange) => {
          if (dateRange?.startDate && dateRange?.endDate) {
            const start = new Date(dateRange.startDate as string)
            const end = new Date(dateRange.endDate as string)
            if (start > end) {
              return 'End date must be after or equal to start date'
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
