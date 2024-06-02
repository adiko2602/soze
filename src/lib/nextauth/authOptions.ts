import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../prisma/prismaClient";
import * as bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { type: "email", label: "email" },
        password: { type: "password", label: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Nieprawidłowe dane logowania");

        try {
          const user = await prisma.users.findFirst({
            where: {
              email: credentials.email,
            },
            include: {
              personals: true,
            },
          });

          if (!user) throw new Error("Nieprawidłowe dane logowania");

          if (!(await bcrypt.compare(credentials.password, user.password)))
            throw new Error("Nieprawidłowe dane logowania");

          if (user.userStatuses === "NOT_ACTIVE")
            throw new Error("Konto jest nieaktywne");

          return {
            id: user.id,
            email: user.email,
            userTypes: user.userTypes,
            personals: {
              firstName: user.personals?.firstName,
              lastName: user.personals?.lastName,
              pesel: user.personals?.pesel,
            },
          };
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
        } finally {
          await prisma.$disconnect();
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.user = {
          id: user.id as number,
          email: user.email,
          userTypes: user.userTypes,
          personals: {
            firstName: user.personals.firstName,
            lastName: user.personals.lastName,
            pesel: user.personals.pesel,
          },
        };
        return { ...token };
      }
      return { ...token };
    },

    async session({ session, token }) {
      if (token) {
        session.user = { ...token.user };
      }
      return { ...session };
    },
  },
};
