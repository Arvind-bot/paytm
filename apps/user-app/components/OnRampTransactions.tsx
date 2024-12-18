import { Card } from "@repo/ui/card";

const amountTextColors = {
  Default: "text-gray-400",
  Success: "text-green-600",
  Failure: "text-red-600",
  Processing: "text-gray-400",
};

const transactionTexts = {
  Default: "-",
  Success: "Amount Credited",
  Failure: "Transaction Failed",
  Processing: "Processing Transaction",
};

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: "Success" | "Failure" | "Processing";
    provider: string;
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
          const transactionText = transactionTexts[t.status || "Default"];
          return (
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <div>
                  <div className="font-bold text-slate-600 text-xs">
                    {t.provider}
                  </div>
                  <div className="text-sm">
                    <span>{transactionText}</span>
                  </div>
                  <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                  </div>
                </div>
              </div>
              <div
                className={`font-bold text-green flex flex-col justify-center ${amountTextColors[t.status || "Default"]}`}
              >
                + Rs {t.amount / 100}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
