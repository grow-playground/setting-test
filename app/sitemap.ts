import { MetadataRoute } from 'next';

const PROD_URL = process.env.NEXT_PUBLIC_PROD_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${PROD_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];
}
