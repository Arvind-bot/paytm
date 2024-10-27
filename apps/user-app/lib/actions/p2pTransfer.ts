"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db, { Prisma } from "@repo/db";

async function p2pTransfer(amount: number, number: string) {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.userId;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }

  try {
    await db.$transaction(
      async (tx) => {
        const transferUser = await db.user.findUnique({
          where: {
            phone: number,
          },
        });
        if (!transferUser) {
          throw new Error(
            "Cannot find any user with the provided number. Please check the provided number is correct and try again."
          );
        }
        const query: any = Prisma.sql`SELECT * FROM "Balance" WHERE "userId" = $1 FOR UPDATE`;
        query.values = [Number(userId)];
        await tx.$queryRaw(query);
        const balance = await tx.balance.findUnique({
          where: {
            userId: Number(userId),
          },
        });

        if (!balance) {
          throw new Error("No balance info found for the user");
        }
        if (balance?.amount < amount) {
          throw new Error("No sufficent funds to transfer");
        }

        const transferUserBalance = await tx.balance.findUnique({
          where: {
            userId: transferUser?.id,
          },
        });

        if (!transferUserBalance) {
          await tx.balance.create({
            data: {
              userId: transferUser?.id,
              amount: 0,
              locked: 0,
            },
          });
        }
        await tx.balance.update({
          where: {
            userId: Number(userId),
          },
          data: {
            amount: {
              decrement: amount,
            },
          },
        });
        await tx.balance.update({
          where: {
            userId: Number(transferUser.id),
          },
          data: {
            amount: {
              increment: amount,
            },
          },
        });

        await tx.p2PTransfers.create({
          data: {
            toUserId: Number(transferUser.id),
            fromUserId: Number(userId),
            amount: amount,
            timestamp: new Date(),
          },
        });

        return {
          message: "Transfer Successfull!",
        };
      },
      {
        maxWait: 8000, // default: 2000
        timeout: 10000, // default: 5000
      }
    );
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      status: 411,
      error: "Error while processing webhook",
      errorInfo: errorMessage,
    };
  }
}

export { p2pTransfer };
