import React from "react";
import { PrismaClient } from "@prisma/client";
import ThemeManagementClient from "@/components/Admin/ThemeManagement/ThemeManagementClient";

const prisma = new PrismaClient();
export const revalidate = 0;

export default async function ThemeSettingsPage() {
  let initialData = null;
  try {
    const data = await prisma.themeSettings.findUnique({
      where: { id: 1 }
    });
    if (data) {
      initialData = JSON.parse(data.contentJson);
    }
  } catch (error) {
    console.error("Failed to load theme settings:", error);
  }

  return <ThemeManagementClient initialData={initialData} />;
}
