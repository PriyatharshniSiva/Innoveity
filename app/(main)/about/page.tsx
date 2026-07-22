import React from "react";
import { PrismaClient } from "@prisma/client";
import AboutClient from "./AboutClient";

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function About() {
  let aboutData = null;
  
  try {
    const data = await (prisma as any).aboutContent.findUnique({
      where: { id: 1 }
    });
    if (data) {
      aboutData = JSON.parse(data.contentJson);
    }
  } catch (error) {
    console.error("Failed to load about data:", error);
  }

  // Also fetch testimonials for EdukaTestimonials
  const testimonialsData = await prisma.testimonial.findMany({
    orderBy: { id: "desc" }
  });

  const dynamicTestimonials = testimonialsData.map(t => ({
    quote: t.quote,
    name: t.author,
    date: "Verified " + new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }));

  const fallbackTestimonials = [
    {
      quote: "Exceptional training programs! INNOVEITY transformed our organization with their innovative approach to skill development. Highly recommended for corporate training.",
      name: "Rajesh Kumar",
      date: "Verified August 15, 2024"
    },
    {
      quote: "Outstanding ESG consulting services. Their tree plantation initiative helped us achieve our sustainability goals effectively. Professional and impactful work.",
      name: "Priya Sharma",
      date: "Verified July 20, 2024"
    },
    {
      quote: "Excellent leadership development programs. The training methodology is innovative and results-oriented. Our team's performance improved significantly.",
      name: "Dr. Amit Patel",
      date: "Verified June 12, 2024"
    },
    {
      quote: "INNOVEITY delivered beyond expectations. Their industrial safety training programs are comprehensive and well-structured. Great team to work with.",
      name: "Sarah Johnson",
      date: "Verified May 2024"
    },
    {
      quote: "Impressed with their change management expertise. The consultants are knowledgeable and the implementation was smooth. Definitely recommend their services.",
      name: "Vikram Singh",
      date: "Verified Apr 2024"
    }
  ];

  return <AboutClient initialData={aboutData} testimonials={dynamicTestimonials.length > 0 ? dynamicTestimonials : fallbackTestimonials} />;
}
