import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date()
    return [
        {
            url: 'https://www.additiv3.com/',
            lastModified,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `https://www.additiv3.com/quote`,
            lastModified,
            changeFrequency: 'monthly',  // Cứ để monthly, không sao
            priority: 0.9,
        },
        {
            url: `https://www.additiv3.com/services`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `https://www.additiv3.com/materials`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}