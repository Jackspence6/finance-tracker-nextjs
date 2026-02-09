"use client";

import React from "react";
import Layout from "../../components/Layout";
import BudgetItem from "../../components/budgets/BudgetItem";

type Transaction = {
    id: number;
    name: string;
    avatar: string;
    amount: number;
    date: string;
};

type CategoryBreakdown = {
    category: string;
    spent: number;
    limit: number;
    color: string;
    latestTransactions: Transaction[];
};

export default function BudgetsPage() {
    const categoryBreakdowns: CategoryBreakdown[] = [
        {
            category: "Entertainment",
            spent: 150,
            limit: 200,
            color: "bg-blue-500",
            latestTransactions: [
                { id: 1, name: "Daniel Carter", avatar: "/assets/images/avatars/daniel-carter.jpg", amount: 50, date: "Feb 9" },
                { id: 2, name: "Ella Phillips", avatar: "/assets/images/avatars/ella-phillips.jpg", amount: 100, date: "Feb 8" },
            ],
        },
        {
            category: "Groceries",
            spent: 220,
            limit: 300,
            color: "bg-green-500",
            latestTransactions: [
                { id: 3, name: "James Thompson", avatar: "/assets/images/avatars/james-thompson.jpg", amount: 120, date: "Feb 7" },
                { id: 4, name: "Alice Green", avatar: "/assets/images/avatars/alice-green.jpg", amount: 100, date: "Feb 6" },
            ],
        },
        {
            category: "Transport",
            spent: 40,
            limit: 100,
            color: "bg-yellow-500",
            latestTransactions: [
                { id: 5, name: "Bob Smith", avatar: "/assets/images/avatars/bob-smith.jpg", amount: 15, date: "Feb 5" },
                { id: 6, name: "Cathy Lee", avatar: "/assets/images/avatars/cathy-lee.jpg", amount: 25, date: "Feb 4" },
            ],
        },
        {
            category: "Dining Out",
            spent: 110,
            limit: 150,
            color: "bg-red-500",
            latestTransactions: [
                { id: 7, name: "Tom Hardy", avatar: "/assets/images/avatars/tom-hardy.jpg", amount: 60, date: "Feb 3" },
                { id: 8, name: "Sally Brown", avatar: "/assets/images/avatars/sally-brown.jpg", amount: 50, date: "Feb 2" },
            ],
        },
    ];

    const totalSpent = categoryBreakdowns.reduce((acc, cat) => acc + cat.spent, 0);
    const totalBudget = categoryBreakdowns.reduce((acc, cat) => acc + cat.limit, 0);

    const spendingSummary = categoryBreakdowns.map(cat => ({
        category: cat.category,
        spent: cat.spent,
        limit: cat.limit,
    }));

    return (
        <Layout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Budgets</h1>

                <button
                    onClick={() => alert("Open Add Budget modal")}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                    + Add New Budget
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">

                {/* Left column */}
                <div className="lg:w-1/3 flex flex-col gap-6">

                    {/* Overall Budget Progress */}
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
                            {spendingSummary.map((s) => (
                                <li key={s.category} className="flex justify-between">
                                    <span>{s.category}</span>
                                    <span>${s.spent} of ${s.limit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* Right column: Budget cards */}
                <div className="lg:w-2/3 flex flex-col gap-6">
                    {categoryBreakdowns.map((cat) => (
                        <BudgetItem
                            key={cat.category}
                            category={cat.category}
                            spent={cat.spent}
                            limit={cat.limit}
                            color={cat.color}
                            latestTransactions={cat.latestTransactions}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
