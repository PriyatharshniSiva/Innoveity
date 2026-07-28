import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://innoveity.com';

  const defaultPages = [
    { url: '', pageKey: 'home' },
    { url: '/about', pageKey: 'about' },
    { url: '/services', pageKey: 'services' },
    { url: '/case-studies', pageKey: 'case-studies' },
    { url: '/knowledge-hub', pageKey: 'knowledge-hub' },
    { url: '/courses', pageKey: 'courses' },
    { url: '/csr', pageKey: 'csr' },
    { url: '/contact', pageKey: 'contact' },
  ];

  const seoSettings = await (prisma as any).seoSettings.findMany();
  
  const sitemapEntries = defaultPages.map(page => {
    const seo = seoSettings.find((s: any) => s.page === page.pageKey);
    // Include if indexPage is true or not explicitly set to false
    if (seo && seo.indexPage === false) return null;
    
    return {
      url: `${baseUrl}${page.url}`,
      lastModified: seo?.updatedAt || new Date(),
      changeFrequency: 'weekly' as any,
      priority: page.pageKey === 'home' ? 1 : 0.8,
    };
  }).filter(Boolean);

  return sitemapEntries;
}
