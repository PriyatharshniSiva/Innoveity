import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "innoveity-super-secret-jwt-key";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { email, password } = body;
    
    // Check if any admin exists in the database
    let adminUser = await prisma.admin.findFirst();
    
    // If no admin exists, create the default one
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("admin@123", 10);
      adminUser = await prisma.admin.create({
        data: {
          email: "admin",
          password: hashedPassword,
          name: "Admin User",
        }
      });
    }

    // Verify credentials
    if (email !== adminUser.email) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    console.log("Successful Login for:", email);

    // Create a JWT token
    const token = await new SignJWT({ email: body.email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Create the response
    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );

    // Set the HttpOnly cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
