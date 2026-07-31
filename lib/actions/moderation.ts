"use server";

import { prisma } from "@/lib/prisma";
import {
  ContentStatus,
  ModerationAction,
  UserType,
} from "../generated/prisma/enums";
import { revalidatePath } from "next/cache";

interface WarnUserArgs {
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
  notes,
  isSevere = false,
  suspensionDurationDays = 7,
}: WarnUserArgs) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Fetch the target content to know WHICH user to suspend
      const targetContent = await tx.content.findUnique({
        where: { id: contentId },
        select: { userId: true },
      });

      if (!targetContent) {
        throw new Error("Target content not found.");
      }

      // 2. Create the initial warning log entry
      const warningLog = await tx.moderationLog.create({
        data: {
          adminId,
          contentId,
          notes,
          action: "WARNED" as ModerationAction,
          createdAt: new Date(),
        },
      });

      let updatedUser = null;
      let suspensionLog = null;

      // Handle severe tracking condition branch loops
      if (isSevere) {
        const suspensionUntil = new Date();
        suspensionUntil.setDate(
          suspensionUntil.getDate() + suspensionDurationDays,
        );

        // Update the account status on the user table
        updatedUser = await tx.user.update({
          where: { id: targetContent.userId }, //Successfully maps to fetched content owner
          data: {
            status: "SUSPENDED",
            suspendUntil: suspensionUntil,
          },
        });

        // Track the suspension action chain event
        suspensionLog = await tx.moderationLog.create({
          data: {
            adminId,
            contentId,
            action: "WARNED" as ModerationAction,
            notes: `Automatic suspension linked to warning: ${notes}`,
            createdAt: new Date(),
          },
        });
      }

      // Guaranteed unified return payload object structure for transaction mapping
      return { warningLog, updatedUser, suspensionLog };
    });

    revalidatePath("/admin/moderation");

    return {
      success: true,
      message: "User warned successfully",
      data: result,
    };
  } catch (error) {
    console.error("Failed to warn user:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
