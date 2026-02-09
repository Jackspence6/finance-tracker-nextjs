export default function OverviewPage() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-black text-2xl font-bold mb-8">Finance</h1>

        <nav className="flex flex-col gap-4 text-black">
          <button className="font-semibold text-left">Overview</button>
          <button className="text-left">Transactions</button>
          <button className="text-left">Budgets</button>
          <button className="text-left">Pots</button>
          <button className="text-left">Recurring Bills</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 text-black">
        <h1 className="text-3xl font-bold mb-6">Overview</h1>

        {/* Current Balance / Income / Expenses */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Current Balance</h2>
            <p className="text-2xl font-bold">$0.00</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Income</h2>
            <p className="text-2xl font-bold">$0.00</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Expenses</h2>
            <p className="text-2xl font-bold">$0.00</p>
          </div>
        </section>

        {/* Pots & Budgets */}
        <section className="mb-6 flex gap-6 items-start">
          {/* Pots Card */}
          <div className="w-[55%] h-75 p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Pots</h3>

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

          {/* Budgets */}
          <div className="w-[45%] p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Budgets</h3>
              <button className="text-blue-500 hover:underline">See Details</button>
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
            <ul className="space-y-3">
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
        </section>


        {/* Transactions */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <button className="text-blue-500 hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p>No transactions yet</p>
          </div>
        </section>

        {/* Recurring Bills */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Recurring Bills</h2>
            <button className="text-blue-500 hover:underline">See Details</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">Bill 1 - Pending</div>
            <div className="p-4 bg-white rounded-lg shadow">Bill 2 - Paid</div>
          </div>
        </section>
      </main>
    </div>
  );
}
