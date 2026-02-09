"use client";

import React, { useState } from "react";
import Layout from "../../components/Layout";

type Bill = {
    id: number;
    name: string;
    category: string;
    dueDate: string;
    amount: number;
    status: "Paid" | "Upcoming" | "Due Soon";
};

export default function RecurringBillsPage() {
    const [bills] = useState<Bill[]>([
        { id: 1, name: "Electricity", category: "Utilities", dueDate: "Feb 10, 2026", amount: 120, status: "Paid" },
        { id: 2, name: "Water", category: "Utilities", dueDate: "Feb 15, 2026", amount: 45, status: "Upcoming" },
        { id: 3, name: "Netflix", category: "Entertainment", dueDate: "Feb 12, 2026", amount: 15, status: "Due Soon" },
        { id: 4, name: "Gym", category: "Lifestyle", dueDate: "Feb 20, 2026", amount: 50, status: "Upcoming" },
    ]);

    // Summary calculations
    const totalBills = bills.reduce((sum, bill) => sum + bill.amount, 0);
    const paidBills = bills.filter((b) => b.status === "Paid").reduce((sum, b) => sum + b.amount, 0);
    const upcomingBills = bills.filter((b) => b.status === "Upcoming").reduce((sum, b) => sum + b.amount, 0);
    const dueSoonBills = bills.filter((b) => b.status === "Due Soon").length;

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Recurring Bills</h1>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white rounded-lg shadow text-center">
                    <h3 className="font-semibold text-gray-600 mb-1">Total Bills</h3>
                    <p className="text-2xl font-bold">${totalBills.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow text-center">
                    <h3 className="font-semibold text-gray-600 mb-1">Paid Bills</h3>
                    <p className="text-2xl font-bold">${paidBills.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow text-center">
                    <h3 className="font-semibold text-gray-600 mb-1">Total Upcoming</h3>
                    <p className="text-2xl font-bold">${upcomingBills.toLocaleString()}</p>
                    <p className="text-gray-500 text-sm">{dueSoonBills} Due Soon</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search bills"
                    className="flex-1 p-2 border border-gray-300 rounded"
                />
                <select className="p-2 border border-gray-300 rounded">
                    <option>Sort by: Latest</option>
                    <option>Oldest</option>
                    <option>A to Z</option>
                    <option>Z to A</option>
                    <option>Highest</option>
                    <option>Lowest</option>
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
                        {bills.map((bill) => (
                            <tr key={bill.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{bill.name}</td>
                                <td className="px-6 py-4">{bill.category}</td>
                                <td className="px-6 py-4">{bill.dueDate}</td>
                                <td className="px-6 py-4 text-right font-bold">${bill.amount.toLocaleString()}</td>
                                <td className={`px-6 py-4 font-semibold ${bill.status === "Paid" ? "text-green-500" : bill.status === "Upcoming" ? "text-blue-500" : "text-red-500"}`}>
                                    {bill.status}
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
