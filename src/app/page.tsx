import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import { getBalance, Balance } from "../../lib/balances";
import { getBudgets, Budget } from "../../lib/budgets";
import { getPots, Pot } from "../../lib/pots";
import { getRecurringBills, RecurringBill } from "../../lib/recurring";
import BudgetsPieChart from "../components/budgets/BudgetsPieChart";

export default async function OverviewPage() {
  const balance: Balance | null = await getBalance();
  const budgets: Budget[] = await getBudgets();
  const pots: Pot[] = await getPots();
  const bills: RecurringBill[] = await getRecurringBills();

  // Reference date for status calculations
  const referenceDate = new Date("2024-08-01T00:00:00Z");

  const billsWithStatus = bills.map((bill) => {
    const billDate = new Date(bill.date);
    let status: "Paid" | "Upcoming" | "Due Soon" = "Upcoming";
    const diffDays = (billDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 0) status = "Paid";
    else if (diffDays <= 3) status = "Due Soon";

    return { ...bill, status };
  });

  const totalBills = billsWithStatus.reduce((sum, b) => sum + b.amount, 0);
  const paidBills = billsWithStatus
    .filter((b) => b.status === "Paid")
    .reduce((sum, b) => sum + b.amount, 0);
  const upcomingBills = billsWithStatus
    .filter((b) => b.status === "Upcoming")
    .reduce((sum, b) => sum + b.amount, 0);
  const dueSoonCount = billsWithStatus.filter((b) => b.status === "Due Soon").length;

  const totalBudgetSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const totalBudgetLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalBudgetPercentage =
    totalBudgetLimit > 0
      ? Math.min(100, (totalBudgetSpent / totalBudgetLimit) * 100)
      : 0;

  const totalPotSaved = pots.reduce((acc, p) => acc + p.currentAmount, 0);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      {/* Current Balance / Income / Expenses */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-black text-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Current Balance</h2>
          <p className="text-2xl font-bold">
            ${balance ? parseFloat(balance.current_balance).toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Income</h2>
          <p className="text-2xl font-bold">
            ${balance ? parseFloat(balance.income).toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-2xl font-bold">
            ${balance ? parseFloat(balance.expenses).toFixed(2) : "0.00"}
          </p>
        </div>
      </section>

      <section className="mb-6 flex gap-6 items-start">

        {/* Left column: Pots & Transactions */}
        <div className="w-[55%] flex flex-col gap-6">
          {/* Pots Card */}
          <div className="p-6 bg-white rounded-lg shadow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Pots</h3>
              <Link href="/pots" className="text-blue-500 hover:underline text-sm">
                See Details
              </Link>
            </div>
            <h4 className="text-lg font-semibold mb-4">Total Saved</h4>
            <p className="text-2xl font-bold mb-6">${totalPotSaved.toLocaleString()}</p>
            <ul className="space-y-2">
              {pots.map((p) => (
                <li key={p.id} className="flex justify-between">
                  <span>{p.title}</span>
                  <span>
                    ${p.currentAmount.toLocaleString()} / ${p.targetAmount.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Transactions Card */}
          <div className="flex-1 p-6 bg-white rounded-lg shadow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Transactions</h3>
              <Link href="/transactions" className="text-blue-500 hover:underline text-sm">
                View All
              </Link>
            </div>
            <ul className="flex-1 overflow-y-auto space-y-4">
              {budgets.flatMap((b) => b.latestTransactions).map((t) => (
                <li key={t.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {t.avatar && (
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <span>{t.name}</span>
                  </div>
                  <span className="font-bold">${t.amount}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(t.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: Budgets & Recurring Bills */}
        <div className="w-[45%] flex flex-col gap-6">

          {/* Budgets Card */}
          <div className="p-6 bg-white rounded-lg shadow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Budgets</h3>
              <Link href="/budgets" className="text-blue-500 hover:underline text-sm">
                See Details
              </Link>
            </div>

            <div className="w-full h-64 mb-4">
              <BudgetsPieChart budgets={budgets} />
            </div>

            <ul className="space-y-3 flex-1">
              {budgets.map((b) => (
                <li key={b.id} className="flex justify-between">
                  <span>{b.category}</span>
                  <span>${b.spent} / ${b.limit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm text-gray-500">
              Total spent: ${totalBudgetSpent} / ${totalBudgetLimit}
            </div>
          </div>


          {/* Recurring Bills Card */}
          <div className="flex flex-col gap-2 p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recurring Bills</h3>
              <Link href="/recurring" className="text-blue-500 hover:underline text-sm">
                See Details
              </Link>
            </div>

            {/* Dynamic Summary */}
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner text-center">
                <h4 className="font-semibold mb-1 text-sm">Paid Bills Total</h4>
                <p className="text-lg font-bold">${paidBills.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner text-center">
                <h4 className="font-semibold mb-1 text-sm">Total Upcoming Bills</h4>
                <p className="text-lg font-bold">${upcomingBills.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner text-center">
                <h4 className="font-semibold mb-1 text-sm">Due Soon</h4>
                <p className="text-lg font-bold">{dueSoonCount} Bills</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner text-center">
                <h4 className="font-semibold mb-1 text-sm">Total Bills</h4>
                <p className="text-lg font-bold">${totalBills.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
