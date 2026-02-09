"use client";

import React, { useState } from "react";

interface PotItemProps {
    title: string;
    currentAmount: number;
    targetAmount: number;
    onAdd?: () => void;
    onWithdraw?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function PotItem({
    title,
    currentAmount,
    targetAmount,
    onAdd,
    onWithdraw,
    onEdit,
    onDelete,
}: PotItemProps) {
    const progress = Math.min(100, (currentAmount / targetAmount) * 100);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="relative p-4 bg-white rounded-lg shadow flex flex-col gap-3">

            {/* Ellipsis Menu */}
            <div className="absolute top-2 right-2">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-1 rounded hover:bg-gray-200"
                >
                    &#x2026;
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <button
                            onClick={onEdit}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <h3 className="text-lg font-semibold">{title}</h3>

            {/* Total Saved */}
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Saved</span>
                <span className="text-lg font-bold">${currentAmount.toLocaleString()}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Progress Label & Target */}
            <div className="flex justify-between text-sm text-gray-600">
                <span>{progress.toFixed(0)}% completed</span>
                <span>Target: ${targetAmount.toLocaleString()}</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={onAdd}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Add Money
                </button>
                <button
                    onClick={onWithdraw}
                    className="flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Withdraw
                </button>
            </div>
        </div>
    );
}
