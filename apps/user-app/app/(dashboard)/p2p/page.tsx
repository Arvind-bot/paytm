import { SendMoneyCard } from "../../../components/SendMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { getBalance } from "../../../lib/utils/balanceUtils";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { getP2pTransactions } from "../../../lib/utils/p2pTransactionUtils";

export default async function () {
  const balance = await getBalance();
  const transactions = await getP2pTransactions();
  return (
    <div className="flex flex-col h-full">
      <div className="ml-5 text-4xl text-[#6a51a6] pt-8 mb-0 font-bold md:ml-0">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
        <div>
          <SendMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <P2PTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
