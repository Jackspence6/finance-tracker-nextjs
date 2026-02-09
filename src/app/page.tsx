import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import { getBalance, Balance } from "../../lib/balances";

export default async function OverviewPage() {
  const balance: Balance | null = await getBalance();

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      {/* Current Balance / Income / Expenses */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow-lg">
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

              {/* Link to Pots page */}
              <Link
                href="/pots"
                className="text-blue-500 hover:underline text-sm"
              >
                See Details
              </Link>
            </div>

            <h4 className="text-lg font-semibold mb-4">Total Saved</h4>
            <p className="text-2xl font-bold mb-6">$3,500</p>

            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Vacation</span>
                <span>$1,000</span>
              </li>
              <li className="flex justify-between">
                <span>New Laptop</span>
                <span>$800</span>
              </li>
              <li className="flex justify-between">
                <span>Emergency Fund</span>
                <span>$1,200</span>
              </li>
              <li className="flex justify-between">
                <span>Home Decor</span>
                <span>$500</span>
              </li>
            </ul>
          </div>


          {/* Transactions Card */}
          <div className="flex-1 p-6 bg-white rounded-lg shadow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Transactions</h3>

              {/* Link to Transactions page */}
              <Link
                href="/transactions"
                className="text-blue-500 hover:underline text-sm"
              >
                View All
              </Link>
            </div>

            <ul className="flex-1 overflow-y-auto space-y-4">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/images/avatars/daniel-carter.jpg"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>Daniel Carter</span>
                </div>
                <span className="font-bold">-$5.50</span>
                <span className="text-gray-500 text-sm">Feb 9, 2026</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/images/avatars/ella-phillips.jpg"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>Ella Phillips</span>
                </div>
                <span className="font-bold">-$120.00</span>
                <span className="text-gray-500 text-sm">Feb 8, 2026</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/images/avatars/james-thompson.jpg"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>James Thompson</span>
                </div>
                <span className="font-bold">-$15.99</span>
                <span className="text-gray-500 text-sm">Feb 7, 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right column: Budgets & Recurring Bills */}
        <div className="w-[45%] flex flex-col gap-6">

          {/* Budgets Card */}
          <div className="p-6 bg-white rounded-lg shadow flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Budgets</h3>

              {/* Link to Budgets page */}
              <Link
                href="/budgets"
                className="text-blue-500 hover:underline text-sm"
              >
                See Details
              </Link>
            </div>

            {/* Pie Progress */}
            <div className="w-32 h-32 mx-auto mb-6">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle
                  className="text-gray-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                />
                <circle
                  className="text-blue-500"
                  strokeWidth="4"
                  strokeDasharray="70, 100"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  cx="18"
                  cy="18"
                  r="16"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <p className="text-center font-bold mt-2">70% spent</p>
            </div>

            {/* Budget items */}
            <ul className="space-y-3 flex-1">
              <li className="flex justify-between">
                <span>Groceries</span>
                <span>$200 / $300</span>
              </li>
              <li className="flex justify-between">
                <span>Entertainment</span>
                <span>$150 / $200</span>
              </li>
              <li className="flex justify-between">
                <span>Utilities</span>
                <span>$100 / $150</span>
              </li>
              <li className="flex justify-between">
                <span>Transport</span>
                <span>$50 / $100</span>
              </li>
            </ul>
          </div>

          {/* Recurring Bills Card */}
          <div className="flex flex-col gap-2 p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recurring Bills</h3>

              {/* Link to Recurring Bills page */}
              <Link
                href="/recurring"
                className="text-blue-500 hover:underline text-sm"
              >
                See Details
              </Link>
            </div>

            {/* Stacked sections */}
            <div className="flex flex-col gap-2">
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner text-center">
                <h4 className="font-semibold mb-1 text-sm">Paid Bills Total</h4>
                <p className="text-lg font-bold">$1,200</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner text-center">
                <h4 className="font-semibold mb-1 text-sm">Total Upcoming Bills</h4>
                <p className="text-lg font-bold">$800</p>
              </div>
              <div className="p-2 bg-gray-50 rounded-lg shadow-inner text-center">
                <h4 className="font-semibold mb-1 text-sm">Due Soon</h4>
                <p className="text-lg font-bold">3 Bills</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>

  );
}
