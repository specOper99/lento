import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'contactSubmission',
    title: 'Contact Submissions',
    type: 'document',
    icon: () => '📨',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'subject',
            title: 'Subject',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            rows: 5,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Read', value: 'read' },
                    { title: 'Replied', value: 'replied' },
                    { title: 'Archived', value: 'archived' },
                ],
                layout: 'radio',
            },
            initialValue: 'new',
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            readOnly: true,
        }),
        defineField({
            name: 'notes',
            title: 'Internal Notes',
            type: 'text',
            description: 'Internal notes about this submission (not visible to the customer)',
            rows: 3,
        }),
    ],
    preview: {
        select: {
            title: 'subject',
            subtitle: 'name',
            status: 'status',
            date: 'submittedAt',
        },
        prepare({ title, subtitle, status, date }) {
            const statusEmoji = {
                new: '🆕',
                read: '👁️',
                replied: '✅',
                archived: '📦',
            }[status as string] || '📨';

            return {
                title: `${statusEmoji} ${title}`,
                subtitle: `From: ${subtitle} • ${date ? new Date(date).toLocaleDateString() : 'Unknown date'}`,
            };
        },
    },
    orderings: [
        {
            title: 'Newest First',
            name: 'dateDesc',
            by: [{ field: 'submittedAt', direction: 'desc' }],
        },
        {
            title: 'Status',
            name: 'statusAsc',
            by: [{ field: 'status', direction: 'asc' }],
        },
    ],
});
