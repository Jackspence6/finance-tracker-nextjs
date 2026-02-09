export default function OverviewPage() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Finance</h1>

        <nav className="flex flex-col gap-4">
          <button className="font-semibold text-left">Overview</button>
          <button className="text-left">Transactions</button>
          <button className="text-left">Budgets</button>
          <button className="text-left">Pots</button>
          <button className="text-left">Recurring Bills</button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Overview</h1>

        {/* Current Balance / Income / Expenses */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow">
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

        {/* Pots */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Pots</h2>
            <button className="text-blue-500 hover:underline">See Details</button>
          </div>

          <div className="p-6 bg-white rounded-lg shadow w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Total Saved</h3>
            <p className="text-2xl font-bold mb-6">$3,500</p>

            <h4 className="font-semibold mb-2">Your Pots</h4>
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
        </section>


        {/* Budgets */}
        <section className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Budgets</h2>
            <button className="text-blue-500 hover:underline">See Details</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">Budget 1 - $0.00</div>
            <div className="p-4 bg-white rounded-lg shadow">Budget 2 - $0.00</div>
            <div className="p-4 bg-white rounded-lg shadow">Budget 3 - $0.00</div>
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
