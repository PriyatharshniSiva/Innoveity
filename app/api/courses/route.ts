import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { id: "asc" }
    });
    
    // Parse the JSON stringified features back to an array
    const parsedCourses = courses.map(course => ({
      ...course,
      features: JSON.parse(course.features)
    }));

    return NextResponse.json(parsedCourses);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCourse = await prisma.course.create({
      data: {
        title: body.title,
        desc: body.desc,
        image: body.image || "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
        level: body.level || "Beginner",
        duration: body.duration || "4 Weeks",
        mode: body.mode || "Online",
        instructor: body.instructor || "Guest Instructor",
        features: JSON.stringify(["Certificate of Completion", "24/7 Support"])
      }
    });
    
    return NextResponse.json({
      ...newCourse,
      features: JSON.parse(newCourse.features)
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}
