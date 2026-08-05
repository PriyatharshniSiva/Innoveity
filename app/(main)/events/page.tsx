import React from 'react';
import { prisma } from "@/lib/prisma";
import EventsClient from './EventsClient';


export const revalidate = 0;

export default async function Courses() {
  const coursesList = await prisma.course.findMany({
    orderBy: { id: "asc" }
  });

  return <EventsClient courses={coursesList} />;
}
