const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Seed Global SEO
  await prisma.globalSeoSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      websiteName: "INNOVEITY",
      defaultTitle: "INNOVEITY | Corporate Training & Skill Development",
      defaultDescription: "INNOVEITY provides premier corporate training, skill development, and placement enhancement programs to transform your workforce.",
      defaultOgImage: "https://innoveity.com/inv6.jpg",
      organizationLogo: "https://innoveity.com/logo.png"
    }
  });

  const pages = [
    {
      page: "home",
      title: "INNOVEITY | Corporate Training & Skill Development",
      description: "Transform your workforce with INNOVEITY's premier corporate training, skill development, and placement enhancement programs.",
      canonicalUrl: "https://innoveity.com",
    },
    {
      page: "about",
      title: "About Us | INNOVEITY",
      description: "Learn about INNOVEITY's mission to bridge the gap between academia and industry through innovative training solutions.",
      canonicalUrl: "https://innoveity.com/about",
    },
    {
      page: "services",
      title: "Our Services | INNOVEITY",
      description: "Explore our wide range of services including corporate training, faculty development, ESG consulting, and more.",
      canonicalUrl: "https://innoveity.com/services",
    },
    {
      page: "case-studies",
      title: "Case Studies & Success Stories | INNOVEITY",
      description: "Read how INNOVEITY has successfully transformed organizations and institutions through targeted training programs.",
      canonicalUrl: "https://innoveity.com/case-studies",
    },
    {
      page: "knowledge-hub",
      title: "Knowledge Hub | INNOVEITY",
      description: "Stay updated with the latest insights, articles, and research on corporate training and skill development.",
      canonicalUrl: "https://innoveity.com/knowledge-hub",
    },
    {
      page: "courses",
      title: "Our Courses | INNOVEITY",
      description: "Browse our comprehensive catalog of professional courses designed to elevate your career and skills.",
      canonicalUrl: "https://innoveity.com/courses",
    },
    {
      page: "csr",
      title: "Corporate Social Responsibility (CSR) | INNOVEITY",
      description: "Discover INNOVEITY's commitment to society and the environment through our CSR initiatives and programs.",
      canonicalUrl: "https://innoveity.com/csr",
    },
    {
      page: "contact",
      title: "Contact Us | INNOVEITY",
      description: "Get in touch with INNOVEITY for inquiries about our corporate training, services, or partnerships.",
      canonicalUrl: "https://innoveity.com/contact",
    }
  ];

  for (const p of pages) {
    await prisma.seoSettings.upsert({
      where: { page: p.page },
      update: {},
      create: {
        page: p.page,
        title: p.title,
        description: p.description,
        canonicalUrl: p.canonicalUrl,
        ogTitle: p.title,
        ogDescription: p.description,
        indexPage: true,
        followLinks: true
      }
    });
  }

  console.log("Successfully seeded initial SEO data!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
