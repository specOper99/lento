import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Shop Section
      S.listItem()
        .title('Shop')
        .icon(() => '🛍️')
        .child(
          S.list()
            .title('Shop Content')
            .items([
              S.documentTypeListItem('product').title('Products').icon(() => '☕'),
              S.documentTypeListItem('category').title('Categories').icon(() => '📂'),
            ])
        ),

      S.divider(),

      // Contact Submissions
      S.listItem()
        .title('Contact Submissions')
        .icon(() => '📨')
        .child(
          S.documentTypeList('contactSubmission')
            .title('Contact Submissions')
            .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
        ),
    ])

