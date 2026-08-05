const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function check() {
  const data = await prisma.themeSettings.findUnique({ where: { id: 1 } });
  console.log(JSON.stringify(JSON.parse(data.contentJson).floatingContactWidget, null, 2));
}
check().finally(() => prisma.$disconnect());
