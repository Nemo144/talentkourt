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
        error instanceof Error ? error : "An unknown write error occurred",
    };
  }
};
