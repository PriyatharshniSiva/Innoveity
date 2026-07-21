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

  return <AboutClient initialData={aboutData} testimonials={dynamicTestimonials} />;
}
