import "dotenv/config";
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  // Demo accounts get a random hash, so nobody can sign in as them.
  const passwordHash = await bcrypt.hash(randomBytes(24).toString("hex"), 10);

  const demoUsers = [
    { email: "athlete1@demo.talentcourt.test", userType: "ATHLETE" },
    { email: "athlete2@demo.talentcourt.test", userType: "ATHLETE" },
    { email: "scout1@demo.talentcourt.test", userType: "SCOUT" },
  ] as const;

  const [athlete1, athlete2, scout1] = await Promise.all(
    demoUsers.map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: { ...u, passwordHash, status: "PENDING" },
      }),
    ),
  );

  await prisma.content.upsert({
    where: { id: "demo-content-1" },
    update: {},
    create: {
      id: "demo-content-1",
      userId: athlete1.id,
      type: "VIDEO",
      referenceUrl: "https://example.com/demo-highlight-reel",
      status: "UNDER_REVIEW",
    },
  });

  await prisma.content.upsert({
    where: { id: "demo-content-2" },
    update: {},
    create: {
      id: "demo-content-2",
      userId: athlete2.id,
      type: "MESSAGE",
      status: "UNDER_REVIEW",
    },
  });

  await prisma.flag.upsert({
    where: { id: "demo-flag-1" },
    update: {},
    create: {
      id: "demo-flag-1",
      contentId: "demo-content-1",
      reportedBy: scout1.id,
      reason: "Misleading title",
    },
  });

  await prisma.flag.upsert({
    where: { id: "demo-flag-2" },
    update: {},
    create: {
      id: "demo-flag-2",
      contentId: "demo-content-2",
      reportedBy: athlete1.id,
      reason: "Inappropriate language",
    },
  });

  console.log("Demo data ready.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
