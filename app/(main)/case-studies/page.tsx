import React from "react";
import { PrismaClient } from "@prisma/client";
import CaseStudiesClient from "./CaseStudiesClient";

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function CaseStudies() {
  const caseStudiesData = await prisma.caseStudy.findMany({
    orderBy: { id: "asc" }
  });
  
  const testimonialsData = await prisma.testimonial.findMany({
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

  return <CaseStudiesClient caseStudies={parsedCaseStudies} partnerQuotes={testimonialsData} />;
}
