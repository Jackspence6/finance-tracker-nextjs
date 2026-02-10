// src/app/transactions/page.tsx
import Image from "next/image";
import Layout from "../../components/Layout";
import { getTransactions, Transaction } from "../../../lib/transactions";

export default async function TransactionsPage() {
    const transactions: Transaction[] = await getTransactions();

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input type="text" placeholder="Search transactions" className="flex-1 p-2 border border-gray-300 rounded" />
                <select className="p-2 border border-gray-300 rounded">
                    <option>Sort by: Latest</option>
                    <option>Oldest</option>
                    <option>A to Z</option>
                    <option>Z to A</option>
                    <option>Highest</option>
                    <option>Lowest</option>
                </select>
                <select className="p-2 border border-gray-300 rounded">
                    <option>All Categories</option>
                    <option>Entertainment</option>
                    <option>Bills</option>
                    <option>Groceries</option>
                    <option>Dining Out</option>
                    <option>Transportation</option>
                    <option>Personal Care</option>
                    <option>Education</option>
                    <option>Lifestyle</option>
                    <option>Shopping</option>
                    <option>General</option>
                </select>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Recipient/Sender</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Transaction Date</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.map(tx => (
                            <tr key={tx.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    {tx.avatar && (
                                        <Image
                                            src={tx.avatar}
                                            alt={tx.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                    )}
                                    <span>{tx.name}</span>
                                </td>
                                <td className="px-6 py-4">{tx.category}</td>
                                <td className="px-6 py-4">{new Date(tx.date).toLocaleDateString()}</td>
                                <td className={`px-6 py-4 text-right font-bold ${tx.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                                    ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Prev</button>
                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Next</button>
            </div>
        </Layout>
    );
}
