import React from 'react';
import { PrismaClient } from '@prisma/client';
import KnowledgeHubClient from './KnowledgeHubClient';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function KnowledgeHub() {
  const articles = await prisma.knowledgeArticle.findMany({
    orderBy: { id: "asc" }
  });

  return <KnowledgeHubClient articles={articles} />;
}
