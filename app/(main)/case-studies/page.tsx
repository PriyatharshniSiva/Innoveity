import React from "react";
import { prisma } from "@/lib/prisma";
import CaseStudiesClient from "./CaseStudiesClient";

import { getSeoMetadata } from "@/lib/seo";


export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata("case-studies");
}

export default async function CaseStudies() {
  let caseStudiesData: any[] = [];
  let testimonials: any[] = [];

  try {
    caseStudiesData = await prisma.caseStudy.findMany({
      orderBy: { id: "asc" }
    });
    
    testimonials = await prisma.testimonial.findMany({
      where: { page: "case-studies" },
      orderBy: { id: "desc" }
    });
  } catch (error) {
    console.error("Failed to fetch case studies data:", error);
  }

  let parsedCaseStudies = (caseStudiesData || []).map(cs => {
    let results = [];
    try {
      const parsed = typeof cs.results === "string" ? JSON.parse(cs.results) : (cs.results || []);
      results = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      results = [];
    }
    return {
      ...cs,
      createdAt: cs.createdAt instanceof Date ? cs.createdAt.toISOString() : String(cs.createdAt || new Date().toISOString()),
      updatedAt: cs.updatedAt instanceof Date ? cs.updatedAt.toISOString() : String(cs.updatedAt || new Date().toISOString()),
      results
    };
  });

  if (parsedCaseStudies.length === 0) {
    parsedCaseStudies = [
      {
        id: 1,
        type: "Corporate Training",
        title: "Transforming Workforce Capabilities",
        challenge: "The client faced a significant skills gap in their engineering department, leading to delayed project timelines and decreased overall productivity.",
        solution: "INNOVEITY designed and implemented a comprehensive 12-week intensive training program focused on advanced technical skills and agile methodologies.",
        quote: "INNOVEITY's training program completely revitalized our engineering team. We've seen a dramatic increase in both productivity and morale.",
        quoteAuthor: "Client Executive",
        results: [
          { stat: "45%", label: "Increase in Productivity" },
          { stat: "30%", label: "Reduction in Delivery Time" }
        ],
        videoId: "W5rO6fWnt8k",
        accentColor: "primary",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  const safeTestimonials = (testimonials || []).map(t => ({
    ...t,
    createdAt: t.createdAt instanceof Date ? t.createdAt.toISOString() : String(t.createdAt || new Date().toISOString()),
    updatedAt: t.updatedAt instanceof Date ? t.updatedAt.toISOString() : String(t.updatedAt || new Date().toISOString())
  }));

  return <CaseStudiesClient caseStudies={parsedCaseStudies} testimonials={safeTestimonials} />;
}
