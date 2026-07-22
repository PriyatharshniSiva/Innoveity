const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  // Delete all existing testimonials
  await prisma.testimonial.deleteMany({});

  // Insert the 5 testimonials from pic 2
  await prisma.testimonial.createMany({
    data: [
      {
        quote: "Exceptional training programs! INNOVEITY transformed our organization with their innovative approach to skill development. Highly recommended for corporate training.",
        author: "Rajesh Kumar",
        createdAt: new Date("2024-08-15"),
        updatedAt: new Date("2024-08-15"),
      },
      {
        quote: "Outstanding ESG consulting services. Their tree plantation initiative helped us achieve our sustainability goals effectively. Professional and impactful work.",
        author: "Priya Sharma",
        createdAt: new Date("2024-07-01"),
        updatedAt: new Date("2024-07-01"),
      },
      {
        quote: "Excellent leadership development programs. The training methodology is innovative and results-oriented. Our team's performance improved significantly.",
        author: "Dr. Amit Patel",
        createdAt: new Date("2024-06-01"),
        updatedAt: new Date("2024-06-01"),
      },
      {
        quote: "INNOVEITY delivered beyond expectations. Their industrial safety training programs are comprehensive and well-structured. Great team to work with.",
        author: "Sarah Johnson",
        createdAt: new Date("2024-05-01"),
        updatedAt: new Date("2024-05-01"),
      },
      {
        quote: "Impressed with their change management expertise. The consultants are knowledgeable and the implementation was smooth. Definitely recommend their services.",
        author: "Vikram Singh",
        createdAt: new Date("2024-04-01"),
        updatedAt: new Date("2024-04-01"),
      },
    ]
  });

  console.log("Testimonials updated successfully!");
  const all = await prisma.testimonial.findMany();
  console.log("New records:", all.length);
}
run().catch(console.error).finally(() => prisma.$disconnect());
