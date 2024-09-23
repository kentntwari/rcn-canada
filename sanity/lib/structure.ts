import {StructureResolver} from 'sanity/structure'

export const myStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Schedule')
        .child(
          S.document().title('This month schedule').schemaType('schedule').documentId('schedule'),
        ),
      S.listItem()
        .title('Location')
        .child(S.document().title('Church location').schemaType('location').documentId('location')),
      S.listItem()
        .title('socials')
        .child(S.document().title('Socials').schemaType('socials').documentId('socials')),
      ...S.documentTypeListItems().filter(
        (listItem) => !['schedule', 'location', 'socials'].includes(listItem.getId() as string),
      ),
    ])
