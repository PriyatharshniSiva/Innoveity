const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding testimonials...");
  
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

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  
  console.log("Seeded successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
