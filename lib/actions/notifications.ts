"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const markAsRead = async (notificationId: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: "Not signed in" };
  }

  try {
    const result = await prisma.notification.updateMany({
      where: { id: notificationId, userId: session.user.id },
      data: { isRead: true },
    });

    if (result.count === 0) {
      return { success: false, message: "Notification not found" };
    }

    revalidatePath("/dashboard");
    return { success: true, message: "Marked as read" };
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    return { success: false, message: "Could not update notification" };
  }
};
