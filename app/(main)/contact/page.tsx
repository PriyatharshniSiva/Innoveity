import React from 'react';
import { prisma } from "@/lib/prisma";
import ContactClient from './ContactClient';

import { getSeoMetadata } from "@/lib/seo";


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
