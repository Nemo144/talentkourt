// prisma/seed.ts
import path from "node:path";
import { createRequire } from "node:module";

// Dynamically track the absolute directory root path regardless of execute location
const require = createRequire(import.meta.url);
const projectRoot = path.resolve(process.cwd());

// Target the exact absolute location specified by your schema generator output
const generatedPath = path.join(projectRoot, "lib", "generated", "prisma");

console.log(`📦 Attempting absolute resolution hook: ${generatedPath}`);
const { PrismaClient } = require(generatedPath);

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
} as any);

async function main() {
  console.log("⏳ Flushing and resetting seed matrices for recording...");
  
  await prisma.verificationLog.deleteMany({});
  await prisma.user.deleteMany({});

  const mockHash = "$2b$10$EPf9kabc123fakehash";

  // 1. test-admin
  await prisma.user.create({
    data: {
      id: "test-admin",
      email: "admin@talentcourt.test",
      passwordHash: mockHash,
      userType: "ADMIN",
      status: "VERIFIED",
    },
  });

  // 2. test-nonadmin
  await prisma.user.create({
    data: {
      id: "test-nonadmin",
      email: "athlete-hacker@talentcourt.test",
      passwordHash: mockHash,
      userType: "ATHLETE",
      status: "VERIFIED",
    },
  });

  // 3. test-pending-a
  await prisma.user.create({
    data: {
      id: "test-pending-a",
      email: "pending-a@talentcourt.test",
      passwordHash: mockHash,
      userType: "ATHLETE",
      status: "PENDING",
    },
  });

  // 4. test-pending-b
  await prisma.user.create({
    data: {
      id: "test-pending-b",
      email: "pending-b@talentcourt.test",
      passwordHash: mockHash,
      userType: "SCOUT",
      status: "PENDING",
    },
  });

  // 5. test-verified-c
  await prisma.user.create({
    data: {
      id: "test-verified-c",
      email: "verified-c@talentcourt.test",
      passwordHash: mockHash,
      userType: "ATHLETE",
      status: "VERIFIED",
      tid: "TID-PREEXISTING-1234",
    },
  });

  console.log("🎯 Seed complete! Database rows match your recording guide exactly.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
