const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const data = await prisma.homeContent.findUnique({where: {id:1}});
  console.log(data?.contentJson);
}
run().catch(console.error).finally(()=>prisma.$disconnect());
