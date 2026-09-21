"use server";

import { prisma } from "@/lib/prisma";
import { ConfigKey } from "../generated/prisma/enums";
import { revalidatePath } from "next/cache";

//the getConfig fnc fetches a single runtime setting cleanly by its unique key identifier
export const getConfig = async (key: ConfigKey) => {
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key },
      include: {
        updatedBy: {
          select: {
            email: true,
            userType: true,
          },
        },
      },
    });

    if (!config) {
      return {
        success: false,
        message: `Configuration key '${key}' not found in database registry.`,
      };
    }

    return {
      success: true,
      data: config,
    };
  } catch (error) {
    console.error(`Failed to fetch system parameter for key ${key}:`, error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown query error occurred.",
    };
  }
};
