import db from "@repo/db";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface Credentials {
  phone: string;
  password: string;
}

// interface CustomUser extends User {
//   token: string;
// }

declare module "next-auth" {
  interface Session {
    user: User & {
      userId: string;
      balance: number;
      balanceId: number;
    };
  }
}

type ExtendedUser = User & {
  balanceId?: number;
  balance?: number;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(
        credentials: Credentials | undefined
      ): Promise<ExtendedUser | null> {
        if (!credentials) return null;

        // Do zod validation, OTP validation here
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            phone: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.phone,
            };
          }
          return null;
        }

        try {
          const user = await db.user.create({
            data: {
              phone: credentials.phone,
              password: hashedPassword,
            },
          });

          const userBalance = await db.balance.create({
            data: {
              userId: Number(user?.id),
              amount: 0,
              locked: 0,
            },
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.phone,
            balance: userBalance?.id,
            balanceId: userBalance?.amount,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({
      token,
      session,
    }: {
      token: JWT;
      session: Session;
    }): Promise<Session> {
      if (session.user) {
        session.user = { ...session.user, userId: token.sub ?? "" };
      }
      return session;
    },
  },
};
