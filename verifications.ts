"use server";

import { VerificationStatus } from "../generated/prisma/enums";
import { createNotification } from "../services/notificationService";
import { issueTId } from "../services/tidService";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const approveUser = async (
  userId: string,
  adminId: string,
  userType: "ATHLETE" | "SCOUT",
) => {
  try {
    const session = global.__mockSession || await auth()
    if (!session || session.user?.userType !== "ADMIN") {
      return { success: false, message: "Unauthorized" };
    }

    const userRecord = await prisma.user.findUnique({ where: { id: userId }, select: { status: true } });
     if (!userRecord || userRecord.status !== "PENDING"){
      return { success: false, message: "Invalid Operation" };
    }

    await prisma.$transaction (async (tx) => {
      //await the t.id generation and user update
    await issueTId(userId, userType);

    //create verificationLog entry
    await tx.verificationLog.create({
      data: {
        userId: userId,
        adminId: adminId,
        verificationStatus: "VERIFIED" as VerificationStatus,
        notes: "User verified and T.id issued",
      },
    });
    })
      

    await createNotification({
      userId,
      type: "TID_ISSUED",
      content: "verified"
    });

    return { success: true, message: "User approved successfully" };
  } catch (error) {
    console.log(error, "Failed to approve user");
    return { success: false, message: "Approval failed" };
  }
};

export const rejectUser = async (
  userId: string,
  adminId: string,
  notes: string,
  p0: string,
) => {
  try {
    const session = global.__mockSession || await auth()
    if (!session || session.user?.userType !== "ADMIN") {
      return { success: false, message: "Unauthorized" };
    }

    await prisma.$transaction (async (tx) => {
      //update the user status to rejected
    await prisma.user.update({
      where: { id: userId },
      data: { status: "REJECTED" as VerificationStatus },
    });

    //update the verificationLog
    await prisma.verificationLog.create({
      data: {
        userId,
        adminId,
        verificationStatus: "REJECTED" as VerificationStatus,
        notes,
      },
    });
    })
      

    
    

    await createNotification({
      userId,
      type: "VERIFICATION_REJECTED",
      content: "declined"
    });

    return { success: true, message: "User rejected" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Rejection failed" };
  }
};
