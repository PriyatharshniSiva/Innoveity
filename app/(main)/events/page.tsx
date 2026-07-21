import React from 'react';
import { PrismaClient } from '@prisma/client';
import EventsClient from './EventsClient';

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function Courses() {
  const coursesList = await prisma.course.findMany({
    orderBy: { id: "asc" }
  });

  return <EventsClient courses={coursesList} />;
}
