"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Transaction } from "../../../lib/transactions";

type Props = { initialTransactions: Transaction[] };

export default function TransactionsTable({ initialTransactions }: Props) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [currentPage, setCurrentPage] = useState(1);

    const transactionsPerPage = 10;

    const filteredTransactions = useMemo(() => {
        let filtered = [...initialTransactions];

        if (search) filtered = filtered.filter(tx => tx.name.toLowerCase().includes(search.toLowerCase()));
        if (categoryFilter !== "All Categories") filtered = filtered.filter(tx => tx.category === categoryFilter);

        filtered.sort((a, b) => {
            switch (sort) {
                case "latest": return new Date(b.date).getTime() - new Date(a.date).getTime();
                case "oldest": return new Date(a.date).getTime() - new Date(b.date).getTime();
                case "AtoZ": return a.name.localeCompare(b.name);
                case "ZtoA": return b.name.localeCompare(a.name);
                case "highest": return b.amount - a.amount;
                case "lowest": return a.amount - b.amount;
                default: return 0;
            }
        });

        return filtered;
    }, [initialTransactions, search, sort, categoryFilter]);

    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * transactionsPerPage,
        currentPage * transactionsPerPage
    );

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search transactions"
                    className="flex-1 p-2 border border-gray-300 rounded"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select className="p-2 border border-gray-300 rounded" value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="latest">Sort by: Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="AtoZ">A to Z</option>
                    <option value="ZtoA">Z to A</option>
                    <option value="highest">Highest</option>
                    <option value="lowest">Lowest</option>
                </select>
                <select className="p-2 border border-gray-300 rounded" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
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

            {/* Table */}
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
                        {paginatedTransactions.map(tx => (
                            <tr key={tx.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    {tx.avatar && <Image src={tx.avatar} alt={tx.name} width={40} height={40} className="rounded-full" />}
                                    <span>{tx.name}</span>
                                </td>
                                <td className="px-6 py-4">{tx.category}</td>
                                <td className="px-6 py-4">{new Date(tx.date).toLocaleDateString()}</td>
                                <td className={`px-6 py-4 text-right font-bold ${tx.type === "expense" ? "text-red-500" : "text-green-500"}`}>
                                    ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                <button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
