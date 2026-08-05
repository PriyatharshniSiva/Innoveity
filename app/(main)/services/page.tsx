import React from 'react';
import { prisma } from "@/lib/prisma";
import ServicesClient from './ServicesClient';

import { getSeoMetadata } from "@/lib/seo";


export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata("services");
}

export default async function Services() {
  const servicesData = await prisma.servicesContent.findUnique({
    where: { id: 1 },
  });

  let data = null;
  if (servicesData) {
    data = JSON.parse(servicesData.contentJson);
  }

  return <ServicesClient data={data} />;
}
