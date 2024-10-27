import { Card } from "@repo/ui/card";

const amountTextColors: Record<string, string> = {
  false: "text-green-600",
  true: "text-gray-700",
};

export const P2PTransactions = async ({
  transactions,
}: {
  transactions: {
    time: Date;
    fromUserId: number;
    toUserId: number;
    otherPartiePhone: string | null;
    amount: number;
    isSent: boolean;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2 flex flex-col gap-3">
        {transactions.map((t) => {
          const { isSent, otherPartiePhone } = t || {};
          const transactionText = `${isSent ? `Sent To` : `Received from`}`;
          return (
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <div>
                  <div className="text-sm">
                    <span className="font-semibold">{transactionText}</span>{" "}
                    {otherPartiePhone}
                  </div>
                  <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                  </div>
                </div>
              </div>
              <div
                className={`font-bold text-green flex flex-col justify-center ${amountTextColors[`${isSent}`] || ""}`}
              >
                {isSent ? "" : "+ "}Rs {t.amount / 100}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
