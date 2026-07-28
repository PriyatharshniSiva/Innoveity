import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = 'https://innoveity.com';

  const seoSettings = await (prisma as any).seoSettings.findMany();
  
  const disallowList: string[] = ['/admin'];
  
  seoSettings.forEach((seo: any) => {
    if (seo.indexPage === false) {
      const route = seo.page === 'home' ? '/' : `/${seo.page}`;
      disallowList.push(route);
    }
  });

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: disallowList,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
