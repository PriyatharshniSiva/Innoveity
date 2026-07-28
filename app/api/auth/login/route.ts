import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "innoveity-super-secret-jwt-key";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real application, you would verify the credentials against a database
    // For now, allow any login
    console.log("Mock Login for:", body.email);

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
      maxAge: 60 * 60 * 24, // 24 hours
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
