"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import EditBudgetModal from "./EditBudgetModal";
import DeleteBudgetModal from "./DeleteBudgetModal";

type Transaction = {
    id: number;
    name: string;
    avatar?: string;
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
                                onClick={() => setEditOpen(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                                onClick={() => setDeleteOpen(true)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress */}
            <span className="text-sm text-gray-600">${spent} / ${limit}</span>
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div className={`${color} h-4 rounded-full`} style={{ width: `${progress}%` }} />
            </div>

            {/* Latest Transactions */}
            <div className="mt-3">
                <h4 className="text-sm font-semibold mb-2">Latest Spending</h4>
                <ul className="space-y-2">
                    {latestTransactions.map((t) => (
                        <li key={t.id} className="flex items-center justify-between">
                            {/* Name + avatar */}
                            <div className="flex items-center gap-3 w-1/2 truncate">
                                {t.avatar && (
                                    <Image
                                        src={t.avatar}
                                        alt={t.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                )}
                                <span className="truncate">{t.name}</span>
                            </div>

                            {/* Amount */}
                            <span className="w-1/4 text-right font-bold">
                                ${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>

                            {/* Date */}
                            <span className="w-1/4 text-right text-gray-500 text-sm">
                                {new Date(t.date).toLocaleDateString()}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modals */}
            <EditBudgetModal
                category={category}
                limit={limit}
                color={color}
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                onSave={({ limit, color }) => console.log("Updated budget:", category, limit, color)}
            />

            <DeleteBudgetModal
                category={category}
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={() => setDeleteOpen(false)}
            />
        </div>
    );
}
