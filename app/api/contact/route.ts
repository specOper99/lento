import { createClient } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';

// Create a write client with the token
const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-08',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Create the contact submission in Sanity
        const result = await writeClient.create({
            _type: 'contactSubmission',
            name,
            email,
            subject,
            message,
            status: 'new',
            submittedAt: new Date().toISOString(),
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Your message has been sent successfully!',
                id: result._id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating contact submission:', error);
        return NextResponse.json(
            { error: 'Failed to send message. Please try again later.' },
            { status: 500 }
        );
    }
}
