"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const registerUser = async (
  email: string,
  password: string,
  userType: "ATHLETE" | "SCOUT",
) => {
  const normalised = email.trim().toLowerCase();

  if (!normalised.includes("@") || password.length < 8) {
    return {
      success: false,
      message: "Enter a valid email and a password of at least 8 characters.",
    };
  }
  if (userType !== "ATHLETE" && userType !== "SCOUT") {
    return { success: false, message: "Choose athlete or scout." };
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: normalised },
    });
    if (existing) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email: normalised, passwordHash, userType },
    });

    return {
      success: true,
      message: "Account created. An admin will review it shortly.",
    };
  } catch (error) {
    console.error("Failed to register user:", error);
    return { success: false, message: "Could not create the account." };
  }
};
