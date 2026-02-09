"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import EditBudgetModal from "./EditBudgetModal";
import DeleteBudgetModal from "./DeleteBudgetModal";

type Transaction = {
    id: number;
    name: string;
    avatar: string;
    amount: number;
    date: string;
};

interface BudgetItemProps {
    category: string;
    spent: number;
    limit: number;
    color: string;
    latestTransactions: Transaction[];
}

export default function BudgetItem({
    category,
    spent,
    limit,
    color,
    latestTransactions,
}: BudgetItemProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const progress = Math.min(100, (spent / limit) * 100);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-3 relative">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{category}</h3>

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-gray-500 font-bold"
                    >
                        &#x2026;
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                            <button
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                                onClick={() => {
                                    setEditOpen(true);
                                    setMenuOpen(false);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                                onClick={() => {
                                    setDeleteOpen(true);
                                    setMenuOpen(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <span className="text-sm text-gray-600">
                ${spent} / ${limit}
            </span>

            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className={`${color} h-4 rounded-full`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Latest Transactions */}
            <div className="mt-3">
                <h4 className="text-sm font-semibold mb-2">Latest Spending</h4>
                <ul className="space-y-2">
                    {latestTransactions.map((t) => (
                        <li key={t.id} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={t.avatar}
                                    alt={t.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <span>{t.name}</span>
                            </div>
                            <span className="font-bold">${t.amount}</span>
                            <span className="text-gray-500 text-sm">{t.date}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <EditBudgetModal
                category={category}
                limit={limit}
                color={color}
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                onSave={({ limit, color }) => {
                    console.log("Updated budget:", category, limit, color);
                }}
            />

            <DeleteBudgetModal
                category={category}
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={() => {
                    alert(`Deleted ${category}`);
                    setDeleteOpen(false);
                }}
            />
        </div>
    );
}
