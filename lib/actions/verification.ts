"use server";

import { VerificationStatus } from "../generated/prisma/enums";
import { issueTId } from "../services/tidService";
import { prisma } from "@/lib/prisma";

export const approveUser = async (
  userId: string,
  adminId: string,
  userType: "ATHLETE" | "SCOUT",
) => {
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
) => {
  try {
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

    return { success: true, message: "User rejected" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Rejection failed" };
  }
};
