import { prisma } from "../lib/prisma"
import bcrypt from "bcryptjs"

async function main() {
  const hash = await bcrypt.hash("admin123", 10)
  
  await prisma.user.upsert({
    where: { email: "admin@talentcourt.com" },
    update: {},
    create: {
      email: "admin@talentcourt.com",
      passwordHash: hash,
      userType: "ADMIN",
      status: "VERIFIED",
    },
  })
  
  console.log("Admin user created!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())