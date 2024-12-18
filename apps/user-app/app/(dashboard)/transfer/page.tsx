import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getBalance } from "../../../lib/utils/balanceUtils";
import { getOnRampTransactions } from "../../../lib/utils/onRampTransactionUtils";

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="">
      <div className="ml-5 text-4xl text-[#6a51a6] pt-8 mb-8 font-bold md:ml-0">
        Wallet Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
