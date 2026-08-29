import { prisma } from "@/lib/prisma";
import { NotificationType } from "../generated/prisma/enums";
import { revalidatePath } from "next/cache";

//type params for creation payloads
interface CreateNotificationArgs {
  userId: string;
  content: string;
  type: NotificationType;
}

//generic engine called internally by other server action to write database logs
export const createNotification = async ({
  userId,
  content,
  type,
}: CreateNotificationArgs) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        content,
        type: type as NotificationType,
      },
    });

    //instantly refresh path dependencies so indicators update in real-time
    revalidatePath("/dashboard");

    return {
      success: true,
      data: notification,
    };
  } catch (error) {
    console.error(
      "Failed to execute background createNotification block:",
      error,
    );

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown write error occurred",
    };
  }
};

//fetches all notifs records targeting a specific user node, ordered newest first
export const getNotifications = async (userId: string) => {
  try {
    const notification = await prisma.notification.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc", //newest tot oldest
      },
    });

    return { success: true, data: notification };
  } catch (error) {
    console.error(
      `Failed to retrieve notifications stack for user node ${userId}:`,
      error,
    );
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown query error occurred",
    };
  }
};

//flips the tracking state bit flag from false to true
export const markAsRead = async (notificationId: string) => {
  try {
    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    revalidatePath("/dashboard");

    return { success: true, data: updatedNotification };
  } catch (error) {
    console.error(
      `Failed to mark notification cell ${notificationId} as read:`,
      error,
    );
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown record update error occurred",
    };
  }
};
