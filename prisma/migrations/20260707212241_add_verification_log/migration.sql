-- CreateTable
CREATE TABLE "VerificationLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verificationStatus" "VerificationStatus" NOT NULL,
    "notes" TEXT,

    CONSTRAINT "VerificationLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VerificationLog" ADD CONSTRAINT "VerificationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationLog" ADD CONSTRAINT "VerificationLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
