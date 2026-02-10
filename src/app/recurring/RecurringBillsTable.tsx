"use client";

import { useState, useMemo } from "react";
import { RecurringBill } from "../../../lib/recurring";

type Props = { bills: RecurringBill[] };

export default function RecurringBillsTable({ bills }: Props) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");

    const referenceDate = new Date("2024-08-01T00:00:00Z");

    // Adding their status
    const billsWithStatus = useMemo(() => {
        return bills.map((bill) => {
            const dueDate = new Date(bill.date);
            let status: "Paid" | "Upcoming" | "Due Soon" = "Upcoming";

            const diffDays = (dueDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diffDays < 0) status = "Paid";
            else if (diffDays <= 3) status = "Due Soon";

            return { ...bill, status };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bills]);

    // Filtered & sorted
    const filteredBills = useMemo(() => {
        let filtered = billsWithStatus;

        if (search) {
            filtered = filtered.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
        }

        filtered = [...filtered].sort((a, b) => {
            switch (sort) {
                case "latest":
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case "oldest":
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                case "AtoZ":
                    return a.name.localeCompare(b.name);
                case "ZtoA":
                    return b.name.localeCompare(a.name);
                case "highest":
                    return b.amount - a.amount;
                case "lowest":
                    return a.amount - b.amount;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [billsWithStatus, search, sort]);

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search bills"
                    className="flex-1 p-2 border border-gray-300 rounded"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 rounded"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                >
                    <option value="latest">Sort by: Latest</option>
                    <option value="oldest">Oldest</option>
                    <option value="AtoZ">A to Z</option>
                    <option value="ZtoA">Z to A</option>
                    <option value="highest">Highest</option>
                    <option value="lowest">Lowest</option>
                </select>
            </div>

            {/* Bills Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bill Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredBills.map(bill => (
                            <tr key={bill.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{bill.name}</td>
                                <td className="px-6 py-4">{bill.category}</td>
                                <td className="px-6 py-4">{new Date(bill.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right font-bold">${bill.amount.toLocaleString()}</td>
                                <td className={`px-6 py-4 font-semibold ${bill.status === "Paid" ? "text-green-500" :
                                    bill.status === "Upcoming" ? "text-blue-500" : "text-red-500"
                                    }`}>{bill.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
