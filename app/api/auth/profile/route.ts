import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, currentPassword, newPassword } = body;

    // Check if any admin exists in the database
    let adminUser = await prisma.admin.findFirst();
    
    if (!adminUser) {
      return NextResponse.json(
        { error: "Admin account not found" },
        { status: 404 }
      );
    }

    // If attempting to change password, verify the current password first
    if (newPassword && newPassword.trim() !== "") {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password is required to set a new password" },
          { status: 400 }
        );
      }

      const isPasswordValid = await bcrypt.compare(currentPassword, adminUser.password);
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Incorrect current password" },
          { status: 401 }
        );
      }
    }

    // Prepare data to update
    const updateData: any = {
      name,
      email
    };

    // If new password is provided and verified, hash and update it
    if (newPassword && newPassword.trim() !== "") {
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    // Update the admin in the database
    const updatedAdmin = await prisma.admin.update({
      where: { id: adminUser.id },
      data: updateData
    });

    return NextResponse.json(
      { message: "Profile updated successfully", admin: { name: updatedAdmin.name, email: updatedAdmin.email } },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
