// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config"; // Import the env token utility

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // This safely extracts the environment variable without empty host issues
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"], 
  },
});
