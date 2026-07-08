import { prisma } from "@/lib/prisma";
import { generateTId } from "../utils/tid";

export const issueTId = async (userId: string, userType: string) => {
  let prefix: "ATH" | "SCT";

  //determine prefix based on userType
  if (userType === "ATHLETE") {
    prefix = "ATH";
  } else if (userType === "SCOUT") {
    prefix = "SCT";
  } else {
    throw new Error(`Invalid user type: ${userType}`);
  }

  //generate the unique tid
  const tid = generateTId(prefix);

  //save tid to the data table and update user status
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { tid: tid, status: "VERIFIED" },
    }),

    prisma.tid.create({
      data: {
        uid: tid,
        prefix: prefix,
        userId: userId,
      },
    }),
  ]);
};
