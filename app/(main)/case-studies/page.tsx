import React from "react";
import { prisma } from "@/lib/prisma";
import CaseStudiesClient from "./CaseStudiesClient";

import { getSeoMetadata } from "@/lib/seo";


export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata("case-studies");
}

export default async function CaseStudies() {
  const caseStudiesData = await prisma.caseStudy.findMany({
    orderBy: { id: "asc" }
  });

  const parsedCaseStudies = caseStudiesData.map(cs => {
    let results = [];
    try {
      const parsed = JSON.parse(cs.results);
      results = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      results = [];
    }
    return {
      ...cs,
      createdAt: cs.createdAt.toISOString(),
      updatedAt: cs.updatedAt.toISOString(),
      results
    };
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { page: "case-studies" },
    orderBy: { id: "desc" }
  });
  
  const safeTestimonials = testimonials.map(t => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString()
  }));

  return <CaseStudiesClient caseStudies={parsedCaseStudies} testimonials={safeTestimonials} />;
}
