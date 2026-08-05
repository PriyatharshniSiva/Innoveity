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
      results = JSON.parse(cs.results);
    } catch (e) {
      results = [];
    }
    return {
      ...cs,
      results
    };
  });

  const testimonials = await prisma.testimonial.findMany({
    where: { page: "case-studies" },
    orderBy: { id: "desc" }
  });

  return <CaseStudiesClient caseStudies={parsedCaseStudies} testimonials={testimonials} />;
}
