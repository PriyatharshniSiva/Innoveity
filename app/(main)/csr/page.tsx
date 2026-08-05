import React from 'react';
import { prisma } from "@/lib/prisma";
import CsrClient from './CsrClient';

import { getSeoMetadata } from "@/lib/seo";


export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata("csr");
}

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
