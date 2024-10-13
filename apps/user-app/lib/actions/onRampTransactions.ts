"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db";

async function createOnRampTransaction(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString(36).substring(2);

  const userId = session?.user?.userId;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }

  await db.onRampTransaction.create({
    data: {
      userId: Number(userId),
      startTime: new Date(),
      status: "Processing",
      amount: amount,
      provider: provider,
      token,
    }
  });

  return {
    message: "On ramp transaction added"
  }
}

export {
  createOnRampTransaction
}
