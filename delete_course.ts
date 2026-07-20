const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.course.deleteMany({
    where: {
      title: "Leadership & Team Management in Industry"
    }
  });
  console.log(`Deleted ${result.count} courses.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
