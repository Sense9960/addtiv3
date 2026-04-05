import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string || 'N/A';
        const website = formData.get('website') as string || 'N/A';
        const project = formData.get('project') as string;
        const material = formData.get('material') as string || 'N/A';
        const quantity = formData.get('quantity') as string || 'N/A';
        const postProcessing = formData.get('postProcessing') as string || 'None';
        const referral = formData.get('referral') as string || 'N/A';

        if (!name || !email || !project) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Collect file attachments
        const attachments: { filename: string; content: Buffer }[] = [];
        const files = formData.getAll('files');

        for (const file of files) {
            if (file instanceof File && file.size > 0) {
                const buffer = Buffer.from(await file.arrayBuffer());
                attachments.push({
                    filename: file.name,
                    content: buffer,
                });
            }
        }

        const data = await resend.emails.send({
            from: 'Additiv3 <admin@additiv3.com>',
            to: ['sense9961@gmail.com'],
            subject: `New Quote Request from ${name}`,
            replyTo: email,
            text: `
--- NEW QUOTE REQUEST ---

Name: ${name}
Email: ${email}
Phone: ${phone}
Website: ${website}

Project Description:
${project}

Material/Technology: ${material}
Quantity: ${quantity}
Post Processing: ${postProcessing}

How they heard about us: ${referral}

Files attached: ${attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'None'}
            `.trim(),
            attachments: attachments.length > 0 ? attachments : undefined,
        });

        if (data.error) {
            console.error('Resend API Error:', data.error);
            return NextResponse.json({ error: data.error }, { status: 500 });
        }

        console.log('Quote email sent successfully:', data);
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Internal Server Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
