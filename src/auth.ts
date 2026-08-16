import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "@/db";
import { signInSchema } from "@/lib/validations/sign-validations";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const result = signInSchema.safeParse(credentials);

        if (!result.success) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: result.data.email,
          },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          result.data.password,
          user.password,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          isTeacher: user.isTeacher,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isTeacher = user.isTeacher;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isTeacher = token.isTeacher as boolean;
      }

      return session;
    },
  },
});
