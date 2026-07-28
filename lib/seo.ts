import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function getSeoMetadata(pageKey: string): Promise<Metadata> {
  try {
    const globalSeo = await (prisma as any).globalSeoSettings.findUnique({
      where: { id: 1 }
    });

    const pageSeo = await (prisma as any).seoSettings.findUnique({
      where: { page: pageKey }
    });

    const title = pageSeo?.title || globalSeo?.defaultTitle || "INNOVEITY";
    const description = pageSeo?.description || globalSeo?.defaultDescription || "";
    const ogImage = pageSeo?.ogImage || globalSeo?.defaultOgImage || "";

    const siteName = globalSeo?.websiteName || "INNOVEITY";

    const metadata: Metadata = {
      title: title,
      description: description,
      openGraph: {
        title: pageSeo?.ogTitle || title,
        description: pageSeo?.ogDescription || description,
        siteName: siteName,
        images: ogImage ? [{ url: ogImage }] : [],
      },
      robots: {
        index: pageSeo?.indexPage ?? true,
        follow: pageSeo?.followLinks ?? true,
      },
    };

    if (pageSeo?.canonicalUrl) {
      metadata.alternates = {
        canonical: pageSeo.canonicalUrl
      };
    }

    return metadata;
  } catch (error) {
    console.error(`Failed to fetch SEO for ${pageKey}`, error);
    return {
      title: "INNOVEITY"
    };
  }
}
