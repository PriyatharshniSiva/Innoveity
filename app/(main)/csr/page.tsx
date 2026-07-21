import React from 'react';
import { PrismaClient } from '@prisma/client';
import CsrClient from './CsrClient';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function CSR() {
  const csrData = await prisma.cSRContent.findUnique({
    where: { id: 1 },
  });

  let data = null;
  if (csrData) {
    data = JSON.parse(csrData.contentJson);
  }

  return <CsrClient data={data} />;
}
