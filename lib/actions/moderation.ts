"use server";

import { prisma } from "@/lib/prisma";
import {
  ContentStatus,
  ModerationAction,
  UserType,
} from "../generated/prisma/enums";
import { revalidatePath } from "next/cache";

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
