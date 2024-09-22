import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      hidden: ({document}) => !document?.name,
    }),
    defineField({
      name: 'date',
      type: 'date',
      validation: (rule) =>
        rule.required().custom((date, ctx) => {
          // TODO: this function does not work properly for tomorrow's dates.
          //   Make it work for any date that is at least 1 day in the future.
          function dateInPast(firstDate: Date, secondDate: Date) {
            if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
              return true
            }

            return false
          }

          if (typeof date === 'undefined') {
            return 'Must be a valid date'
          }

          const today = new Date()
          const selectedDate = new Date(date)

          if (dateInPast(selectedDate, today)) {
            return 'You cannot post a past or ongoing event'
          }

          return true
        }),
    }),
    defineField({
      name: 'poster',
      type: 'image',
      validation: (rule) => rule.required(),
      hidden: ({document}) => !document?.date,
    }),
    defineField({
      name: 'isMainEvent',
      title: 'It is the main event',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (value, {document, getClient}) => {
          if (!value) return true

          const client = getClient({apiVersion: '2021-10-21'})
          const query = `*[_type == "event" && is_main_event == true]`
          const existingMainEvent = await client.fetch(query)

          // console.log(existingMainEvent)

          return existingMainEvent?.length > 0
            ? `Another event '${existingMainEvent[0].name}' is already the main event`
            : true
        }),
    }),
  ],
})
