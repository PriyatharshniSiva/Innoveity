const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newCourses = [
    {
      title: "Industrial Communication & Interpersonal Skills",
      desc: "Master effective communication skills for industrial settings. Learn to communicate across hierarchies, present ideas clearly, and build professional...",
      duration: "6 weeks",
      mode: "Online / Hybrid",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.4",
      studentsEnrolled: "520",
      level: "Beginner",
      nextBatch: "January 2025",
      instructor: "Industry Expert",
      features: JSON.stringify([
        "Communication Strategies",
        "Interpersonal Skills",
        "Presentation Skills"
      ]),
      certification: "AICTE Certified"
    },
    {
      title: "Problem Solving & Critical Thinking",
      desc: "Develop analytical and problem-solving skills for industrial challenges. Learn systematic approaches to identify, analyze, and solve workplace problems.",
      duration: "6 weeks",
      mode: "Online / Hybrid",
      image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: "4.7",
      studentsEnrolled: "350",
      level: "Intermediate",
      nextBatch: "March 2025",
      instructor: "Industry Expert",
      features: JSON.stringify([
        "Analytical Skills",
        "Root Cause Analysis",
        "Critical Thinking"
      ]),
      certification: "AICTE Certified"
    }
  ];

  for (const course of newCourses) {
    await prisma.course.create({ data: course });
    console.log(`Added course: ${course.title}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
