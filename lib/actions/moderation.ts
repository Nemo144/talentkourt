"use server";

import { prisma } from "@/lib/prisma";
import { UserType } from "../generated/prisma/enums";

export const approveContent = async (
  userId: string,
  adminId: string,
  userType: UserType,
) => {};
