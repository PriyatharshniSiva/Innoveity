import React from 'react';
import { PrismaClient } from '@prisma/client';
import ServicesClient from './ServicesClient';

const prisma = new PrismaClient();
export const revalidate = 0;

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
