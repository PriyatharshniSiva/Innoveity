const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testimonials = [
    {
      quote: 'Exceptional training programs! INNOVEITY transformed our organization with their innovative approach to skill development. Highly recommended for corporate training.',
      author: 'Rajesh Kumar'
    },
    {
      quote: 'Outstanding ESG consulting services. Their tree plantation initiative helped us achieve our sustainability goals effectively. Professional and impactful work.',
      author: 'Priya Sharma'
    },
    {
      quote: 'Excellent leadership development programs. The training methodology is innovative and results-oriented. Our team\'s performance improved significantly.',
      author: 'Dr. Amit Patel'
    },
    {
      quote: 'INNOVEITY delivered beyond expectations. Their industrial safety training programs are comprehensive and well-structured. Great team to work with.',
      author: 'Sarah Johnson'
    },
    {
      quote: 'Impressed with their change management expertise. The consultants are knowledgeable and the implementation was smooth. Definitely recommend their services.',
      author: 'Vikram Singh'
    }
];

async function main() {
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t
    });
  }
  console.log('Successfully seeded testimonials!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
