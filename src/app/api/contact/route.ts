import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const data = await resend.emails.send({
            from: 'Additiv3 <admin@additiv3.com>',
            to: ['admin@additiv3.com', 'huyduc1704@gmail.com'],
            subject: `New Contact from ${name}: ${subject}`,
            replyTo: email,
            text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
        });

        if (data.error) {
            console.error('Resend API Error:', data.error);
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        console.log('Email sent successfully:', data);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
