import React from 'react';
import { PrismaClient } from '@prisma/client';
import KnowledgeHubClient from './KnowledgeHubClient';

import { getSeoMetadata } from "@/lib/seo";

const prisma = new PrismaClient();
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
