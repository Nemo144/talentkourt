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

        return {
          id: user.id,
          email: user.email,
          TId: user.tid ?? undefined,
          userType: user.userType,
          status: user.status,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      //if user exists(runs only on first signin)
      if (user) {
        token.id = user.id;
        token.TId = user.tid;
        token.userType = user.userType;
        token.status = user.status;
      }
      return token;
    },
    session({ session, token }) {
      //expose token fields to the frontend session object
      session.user.id = token.id as string;
      session.user.tid = token.TId as string;
      session.user.userType = token.userType as
        | "ATHLETE"
        | "SCOUT"
        | "ADMIN"
        | undefined;
      session.user.status = token.status as
        | "PENDING"
        | "VERIFIED"
        | "REJECTED"
        | "SUSPENDED"
        | undefined;
      return session;
    },
  },
});
