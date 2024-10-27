import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db";

export async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session?.user?.userId),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
