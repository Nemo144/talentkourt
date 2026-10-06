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

//getAllConfigs to pull the entire configuration stack layout table to populate admin dashboards
export const getAllConfigs = async () => {
  try {
    const configs = await prisma.systemConfig.findMany({
      include: {
        updatedBy: {
          select: {
            email: true,
            userType: true,
          },
        },
      },
      orderBy: {
        key: "asc", // Alphabetical enumeration order sorting
      },
    });

    return { success: true, data: configs };
  } catch (error) {
    console.error(
      "Failed to compile system configuration settings catalog:",
      error,
    );
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown retrieval error occurred.",
    };
  }
};

//updateConfig(key, value, adminId) function which Modifies runtime tracking values and links accountability logs
export const updateConfig = async (
  key: ConfigKey,
  value: string,
  adminId: string,
) => {
  try {
    const updatedConfig = await prisma.systemConfig.upsert({
      where: { key },
      update: { value, adminId },
      create: { key, value, adminId, description: "" },
    });

    // realidatePath purges static layout caches instantly for admin
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: `System parameter '${key}' successfully committed to value: "${value}".`,
      data: updatedConfig,
    };
  } catch (error) {
    console.error(
      `Failed to mutate configuration entry for key ${key}:`,
      error,
    );
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unknown database update failure occurred.",
    };
  }
};
