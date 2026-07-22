const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { id: 'asc' } });
  console.log("DB Testimonials:", JSON.stringify(testimonials, null, 2));
}
run().catch(console.error).finally(() => prisma.$disconnect());
