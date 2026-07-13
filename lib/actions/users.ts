"use server";

import { prisma } from "@/lib/prisma";
import { VerificationStatus } from "../generated/prisma/enums";
import { revalidatePath } from "next/cache";

//function to suspend/ban a user
export const suspendUser = async (
  userId: string,
  adminId: string,
  reason: string,
) => {
  try {
    //suspend user
    const result = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { status: "SUSPENDED" as VerificationStatus },
      });

      //update the log
      await tx.verificationLog.create({
        data: {
          userId,
          adminId,
          verificationStatus: "SUSPENDED" as VerificationStatus,
          notes: `SUSPENDED - Reason: ${reason}`,
        },
      });
      return updatedUser;
    });

    //update any server-rendered layouts displaying this user list
    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User suspended successfully",
      data: result,
    };
  } catch (error) {
    console.error("failed to suspend user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

//function to revoke user T.id
export const revokeTid = async (
  userId: string,
  adminId: string,
  reason: string,
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const targetUser = await tx.user.findUnique({
        where: { id: userId },
        select: { tid: true },
      });

      if (!targetUser?.tid) {
        throw new Error("This user has no T.id to revoke");
      }

      //remove row from independent t.id table
      await tx.tid.delete({
        where: { userId },
      });

      //strip the id and reset the user back to 'PENDING' status
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { tid: null, status: "PENDING" as VerificationStatus },
      });

      //log the action history
      await tx.verificationLog.create({
        data: {
          userId,
          adminId,
          verificationStatus: "PENDING" as VerificationStatus,
          notes: `REVOKED T.id (${targetUser.tid}) - Reason: ${reason}`,
        },
      });
      return updatedUser;
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "T.id successfully revoked",
      data: result,
    };
  } catch (error) {
    console.error("Failed to revoke t.id");
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

//type def for user info
interface EditUserPayload {
  email?: string;
}

//function to edit core user info
export const editUserInfo = async (userId: string, data: EditUserPayload) => {
  try {
    if (data.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingEmail && existingEmail.id !== userId) {
        throw new Error("This email is already in use by another account.");
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: data,
    });

    revalidatePath("/admin/users");

    return {
      success: true,
      message: "User info updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.error("Failed to update user info:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
