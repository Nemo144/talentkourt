import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      sid?: string;
      userType?: "ATHLETE" | "SCOUT" | "ADMIN";
      status?: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED";
    } & DefaultSession["user"];
  }

  interface User {
    sid?: string;
    userType?: "ATHLETE" | "SCOUT" | "ADMIN";
    status?: "PENDING" | "VERIFIED" | "REJECTED" | "SUSPENDED" | null;
  }
}
