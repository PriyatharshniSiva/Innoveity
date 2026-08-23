const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const themeData = {
    colors: {
      primary: "#38BDF8",      // Sky Blue Accent
      secondary: "#2563EB",    // Deep Blue
      accent: "#F59E0B",
      success: "#10B981",
      warning: "#F59E0B",
      background: "#0A0E39",   // Navy
      foreground: "#FFFFFF",
    }
  };

  await prisma.themeSettings.upsert({
    where: { id: 1 },
    update: { contentJson: JSON.stringify(themeData) },
    create: { id: 1, contentJson: JSON.stringify(themeData) }
  });

  console.log("Theme settings updated successfully.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
