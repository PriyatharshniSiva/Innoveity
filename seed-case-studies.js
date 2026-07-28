const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testimonials = [
    {
      quote: "INNOVEITY's comprehensive faculty development program revolutionized our teaching methodologies. Our students are now industry-ready from day one.",
      author: ""
    },
    {
      quote: "The ESG consulting provided by INNOVEITY helped us achieve carbon neutrality ahead of schedule while improving employee satisfaction scores.",
      author: ""
    },
    {
      quote: "This program transformed our team's capabilities and significantly improved our productivity and innovation metrics.",
      author: ""
    }
];

async function main() {
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t
    });
  }
  console.log('Successfully seeded case studies testimonials!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
