import GoogleProvider from "next-auth/providers/google";
import db, { AuthType } from "@repo/db";
import { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
      async  signIn({ user, account }: {
        user: User | AdapterUser,
        account: Account | null
      }) {
        console.log("hi signin")
        if (!user || !user.email) {
          return false;
        }

        await db.merchant.upsert({
          select: {
            id: true
          },
          where: {
            email: user.email
          },
          create: {
            email: user.email,
            name: user.name,
            auth_type: account?.provider === "google" ? AuthType.Google : AuthType.Github // Use a prisma type here
          },
          update: {
            name: user.name,
            auth_type: account?.provider === "google" ? AuthType.Google : AuthType.Github // Use a prisma type here
          }
        });

        return true;
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
  }