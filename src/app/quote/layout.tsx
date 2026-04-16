import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Get a Quote | Additiv3',
    description: 'Request a custom quote for 3D printing and additive manufacturing. Upload your files, choose materials, and get pricing within 1-2 business days.',
    keywords: [
        'get a quote 3D printing',
        '3D printing quote',
        'báo giá in 3D',
        'báo giá gia công 3D',
        'custom 3D printing quote',
    ],
    openGraph: {
        title: 'Get a Quote | Additiv3',
        description: 'Request a custom 3D manufacturing quote. Fast turnaround, reliable results.',
        url: 'https://additiv3.com/quote',
        siteName: 'Additiv3',
        type: 'website',
    },
    alternates: {
        canonical: 'https://additiv3.com/quote',
    },
};

export default function QuoteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}