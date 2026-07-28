const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const testimonials = await prisma.testimonial.findMany();
  
  for (const t of testimonials) {
    if (t.quote.includes("INNOVEITY's comprehensive faculty") || 
        t.quote.includes("The ESG consulting") || 
        t.quote.includes("This program transformed")) {
      await prisma.testimonial.update({
        where: { id: t.id },
        data: { page: "case-studies" }
      });
    } else {
      // It's one of the generic ones (home/about)
      await prisma.testimonial.update({
        where: { id: t.id },
        data: { page: "home" }
      });
      // Duplicate for about
      await prisma.testimonial.create({
        data: {
          quote: t.quote,
          author: t.author,
          page: "about"
        }
      });
    }
  }
  console.log('Successfully migrated testimonials!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
