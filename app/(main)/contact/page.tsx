import React from 'react';
import { PrismaClient } from '@prisma/client';
import ContactClient from './ContactClient';

import { getSeoMetadata } from "@/lib/seo";

const prisma = new PrismaClient();
export const revalidate = 0;

export async function generateMetadata() {
  return await getSeoMetadata("contact");
}

export default async function Contact() {
  const contactData = await prisma.contactContent.findUnique({
    where: { id: 1 },
  });

  let data = null;
  if (contactData) {
    data = JSON.parse(contactData.contentJson);
  }

  return <ContactClient data={data} />;
}
