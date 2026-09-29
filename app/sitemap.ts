import { MetadataRoute } from 'next';
import { api } from './lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saromedia.com.np';

  // Core static pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  // Try to append dynamic portfolio project pages
  try {
    const portfolioRes = await api.getPortfolio({ limit: 50 });
    const items = Array.isArray(portfolioRes) ? portfolioRes : portfolioRes?.items || [];
    const portfolioRoutes: MetadataRoute.Sitemap = items.map((item: any) => ({
      url: `${baseUrl}/work/${item.slug || item.id}`,
      lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
    return [...routes, ...portfolioRoutes];
  } catch {
    // If backend is not reached during static generation, return core routes
    return routes;
  }
}
