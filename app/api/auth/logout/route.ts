import { NextResponse } from "next/server";

export async function POST() {
  try {
    // In a real application, you would clear the user's session cookie here
    console.log("Mock Logout");
    
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
