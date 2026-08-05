import React from 'react';
import { prisma } from "@/lib/prisma";
import KnowledgeHubClient from './KnowledgeHubClient';

import { getSeoMetadata } from "@/lib/seo";


export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata("knowledge-hub");
}

export default async function KnowledgeHub() {
  const articles = await prisma.knowledgeArticle.findMany({
    orderBy: { id: "asc" }
  });

  return <KnowledgeHubClient articles={articles} />;
}
