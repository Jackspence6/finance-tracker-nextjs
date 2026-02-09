import Layout from "../../components/Layout";
import BudgetItem from "../../components/budgets/BudgetItem";
import { getBudgets, Budget } from "../../../lib/budgets";

export default async function BudgetsPage() {
    const budgets: Budget[] = await getBudgets();

    const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
    const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);

    return (
        <Layout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Budgets</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left column */}
                <div className="lg:w-1/3 flex flex-col gap-6">
                    {/* Overall Budget */}
                    <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-4">
                        <h2 className="text-lg font-semibold">Overall Budget</h2>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-blue-500 h-4 rounded-full"
                                style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
                            />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            ${totalSpent} spent of ${totalBudget}
                        </p>
                    </div>

                    {/* Spending Summary */}
                    <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-3">
                        <h2 className="text-lg font-semibold mb-2">Spending Summary</h2>
                        <ul className="space-y-2">
                            {budgets.map((b) => (
                                <li key={b.id} className="flex justify-between">
                                    <span>{b.category}</span>
                                    <span>${b.spent} of ${b.limit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right column: Budget Cards */}
                <div className="lg:w-2/3 flex flex-col gap-6">
                    {budgets.map((b) => (
                        <BudgetItem
                            key={b.id}
                            category={b.category}
                            spent={b.spent}
                            limit={b.limit}
                            color={b.color}
                            latestTransactions={b.latestTransactions}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
