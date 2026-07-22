const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  const homeData = await prisma.homeContent.findUnique({where: {id:1}});
  let data = JSON.parse(homeData.contentJson);
  
  if (data.hero) {
    data.hero.titleLine1 = "Bridging Education";
    data.hero.titleHighlight = "↔ Industry Future";
  }

  await prisma.homeContent.update({
    where: { id: 1 },
    data: { contentJson: JSON.stringify(data) }
  });
  console.log("Database updated successfully");
}
run().catch(console.error).finally(()=>prisma.$disconnect());
