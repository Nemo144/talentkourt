"use server";

import { requireAdmin } from "../auth/adminMiddleware";
import { VerificationStatus } from "../generated/prisma/enums";
import { createNotification } from "../services/notificationService";
import { issueTId } from "../services/tidService";
import { prisma } from "@/lib/prisma";

export const approveUser = async (
  userId: string,
  userType: "ATHLETE" | "SCOUT",
) => {
  const session = await requireAdmin();
  const adminId = session.user.id;
  try {
    //await the t.id generation and user update
    await issueTId(userId, userType);

    //create verificationLog entry
    await prisma.verificationLog.create({
      data: {
        userId: userId,
        adminId: adminId,
        verificationStatus: "VERIFIED" as VerificationStatus,
        notes: "User verified and T.id issued",
      },
    });

    await createNotification({
      userId,
      content: "Your profile has been verified! Your T.id has been issued.",
      type: "TID_ISSUED",
    });

    return { success: true, message: "User approved successfully" };
  } catch (error) {
    console.log(error, "Failed to approve user");
    return { success: false, message: "Approval failed" };
  }
};

export const rejectUser = async (userId: string, notes: string) => {
  const session = await requireAdmin();
  const adminId = session.user.id;
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { status: "REJECTED" as VerificationStatus },
      }),
      prisma.verificationLog.create({
        data: {
          userId,
          adminId,
          verificationStatus: "REJECTED" as VerificationStatus,
          notes,
        },
      }),
    ]);

    await createNotification({
      userId,
      content: `Your verification was declined. Reason: ${notes}`,
      type: "VERIFICATION_REJECTED",
    });

    return { success: true, message: "User rejected" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Rejection failed" };
  }
};
