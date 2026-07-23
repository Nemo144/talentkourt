"use server";

import { prisma } from "@/lib/prisma";
import {
  ContentStatus,
  ModerationAction,
  UserType,
} from "../generated/prisma/enums";
import { revalidatePath } from "next/cache";

interface WarnUserArgs {
  id: string;
  adminId: string;
  contentId: string;
  notes: string;
  isSevere?: boolean;
  suspensionDurationDays?: number;
}

export const approveContent = async (
  adminId: string,
  contentId: string,
  userType: UserType,
) => {
  //approve content
  try {
    const result = await prisma.$transaction(async (tx) => {
      //update content status to active
      const updatedContent = await tx.content.update({
        where: { id: contentId },
        data: { status: "ACTIVE" as ContentStatus },
      });

      //update the log
      const log = await tx.moderationLog.create({
        data: {
          contentId,
          adminId,
          action: "APPROVED" as ModerationAction,
          notes: `Content approved by ${userType.toLowerCase()} administrator`,
        },
      });

      return { updatedContent, log };
    });

    //update any server-rendered layout
    revalidatePath("/admin/moderation");

    return {
      success: true,
      message: "Content approved successfully",
      data: result,
    };
  } catch (error) {
    console.error("Failed to approve content:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const removeContent = async (
  adminId: string,
  contentId: string,
  userType: UserType,
  reason: string,
) => {
  //remove content
  try {
    const result = await prisma.$transaction(async (tx) => {
      //update content status to removed
      const updatedContent = await tx.content.update({
        where: { id: contentId },
        data: { status: "REMOVED" as ContentStatus },
      });

      //update the log
      const log = await tx.moderationLog.create({
        data: {
          contentId,
          adminId,
          action: "REMOVED" as ModerationAction,
          notes: reason || "Removed due to violation of policy",
        },
      });

      return { updatedContent, log };
    });

    //update any server-rendered layout
    revalidatePath("/admin/moderation");

    return {
      success: true,
      message: "Content removed successfully",
      data: result,
    };
  } catch (error) {
    console.error("Failed to remove content:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const warnUser = async ({
  adminId,
  contentId,
  id,
  notes,
  isSevere = false,
  suspensionDurationDays = 7,
}: WarnUserArgs) => {
  //warn user
  try {
    const result = await prisma.$transaction(async (tx) => {
      //create the moderationLog
      const warningLog = await tx.moderationLog.create({
        data: {
          adminId,
          contentId,
          notes,
          action: "WARNED",
          createdAt: new Date(),
        },
      });

      //handle optional sever violation
      if (isSevere) {
        //when does it end?
        const suspensionUntil = new Date();
        suspensionUntil.setDate(
          suspensionUntil.getDate() + suspensionDurationDays,
        );

        //update user account status
        const updatedUser = await tx.user.update({
          where: { id },
          data: { status: "SUSPENDED", suspendUntil: suspensionUntil },
        });

        //create log for the suspension tracking
        const log = await tx.moderationLog.create({
          data: {
            adminId,
            contentId,
            action: "WARNED",
            notes: `Automatic suspension linked to warning: ${notes}`,
            createdAt: new Date(),
          },
        });
        return { warningLog, updatedUser, log };
      }
    });
    revalidatePath("/admin/moderation");

    return {
      success: true,
      message: "user warned successfully",
      data: result,
    };
  } catch (error) {
    console.error("Failed to warn user:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occured",
    };
  }
};
