const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.course.updateMany({
    where: {
      title: "Problem Solving & Critical Thinking"
    },
    data: {
      instructor: "Dr. Amit Mehta, Process Excellence Expert",
      features: JSON.stringify([
        "Problem Identification",
        "Root Cause Analysis",
        "Critical Thinking Methods",
        "Decision Making Tools",
        "Innovation Techniques",
        "Process Improvement"
      ]),
      certification: "Upon successful completion, you'll receive an AICTE affiliated certificate that is recognized across industries in India. This certification validates your skills and enhances your professional credibility in the job market."
    }
  });

  console.log(`Updated courses:`, result);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
