import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db";

export async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.userId),
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}
