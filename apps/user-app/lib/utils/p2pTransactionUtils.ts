import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db";

export async function getP2pTransactions() {
  const session = await getServerSession(authOptions);
  const currUserId = Number(session?.user?.userId);
  const txns = await db.p2PTransfers.findMany({
    where: {
      OR: [
        { fromUserId: Number(currUserId) },
        { toUserId: Number(currUserId) },
      ],
    },
    orderBy: {
      timestamp: "desc",
    },
    include: {
      fromUser: { select: { phone: true } },
      toUser: { select: { phone: true } },
    },
  });
  return txns.map((t) => ({
    time: t.timestamp,
    fromUserId: t.fromUserId,
    toUserId: t.toUserId,
    amount: t.amount,
    isSent: currUserId == t.fromUserId ? true : false,
    otherPartiePhone:
      currUserId !== t.fromUserId
        ? t.fromUser.phone
        : currUserId !== t.toUserId
          ? t.toUser.phone
          : null,
  }));
}
