import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password || password.length < 12) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and a SEED_ADMIN_PASSWORD of at least 12 characters.",
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      userType: "ADMIN",
      status: "VERIFIED",
    },
  });

  const defaults = [
    {
      key: "VERIFICATION_REQUIRED",
      value: "true",
      description:
        "Users must be verified by an admin before receiving a T.id.",
    },
    {
      key: "TID_FORMAT",
      value: "PREFIX-00000",
      description: "Format of issued T.ids.",
    },
    {
      key: "MAX_FLAGS_BEFORE_REVIEW",
      value: "3",
      description: "Flags needed before content is sent for review.",
    },
    {
      key: "REGISTRATION_OPEN",
      value: "true",
      description: "Allow new users to register.",
    },
    {
      key: "EMAIL_NOTIFICATIONS_ENABLED",
      value: "false",
      description: "Send email notifications (not implemented yet).",
    },
    {
      key: "CONTENT_MODERATION_ENABLED",
      value: "true",
      description: "Enable the moderation queue.",
    },
    {
      key: "RATE_LIMIT_REQUESTS_PER_MINUTE",
      value: "60",
      description: "Maximum requests per minute.",
    },
    {
      key: "SUSPENSION_DURATION_DAYS",
      value: "7",
      description: "Default length of an automatic suspension.",
    },
  ] as const;

  for (const setting of defaults) {
    await prisma.systemConfig.upsert({
      where: { key: setting.key },
      update: {},
      create: { ...setting, adminId: admin.id },
    });
  }

  console.log(`Seeded admin ${email} and ${defaults.length} settings.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
