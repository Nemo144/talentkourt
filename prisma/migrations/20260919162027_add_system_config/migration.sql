/*
  Warnings:

  - The primary key for the `SystemConfig` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `key` on the `SystemConfig` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ConfigKey" AS ENUM ('VERIFICATION_REQUIRED', 'TID_FORMAT', 'MAX_FLAGS_BEFORE_REVIEW', 'REGISTRATION_OPEN', 'EMAIL_NOTIFICATIONS_ENABLED', 'CONTENT_MODERATION_ENABLED', 'RATE_LIMIT_REQUESTS_PER_MINUTE', 'SUSPENSION_DURATION_DAYS');

-- AlterTable
ALTER TABLE "SystemConfig" DROP CONSTRAINT "SystemConfig_pkey",
DROP COLUMN "key",
ADD COLUMN     "key" "ConfigKey" NOT NULL,
ADD CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("key");
