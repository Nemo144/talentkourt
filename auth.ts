import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        //to find user by email
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        //return null if user is not found
        if (!user) return null;

        //compare the password against the stored hashed password
        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) return null;

        return user;
      },
    }),
  ],
});
