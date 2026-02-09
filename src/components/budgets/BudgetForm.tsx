"use client";

import { useState } from "react";

interface BudgetFormProps {
    initialCategory: string;
    initialLimit: number;
    initialColor: string;
    onSubmit: (data: {
        limit: number;
        color: string;
    }) => void;
    onCancel: () => void;
}

const COLORS = [
    { name: "Green", value: "bg-green-500" },
    { name: "Blue", value: "bg-blue-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Orange", value: "bg-orange-500" },
    { name: "Red", value: "bg-red-500" },
];

export default function BudgetForm({
    initialCategory,
    initialLimit,
    initialColor,
    onSubmit,
    onCancel,
}: BudgetFormProps) {
    const [limit, setLimit] = useState(initialLimit);
    const [color, setColor] = useState(initialColor);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ limit, color });
            }}
            className="flex flex-col gap-4"
        >
            {/* Category (read-only) */}
            <div>
                <label className="block text-sm font-medium mb-1">Budget Category</label>
                <input
                    value={initialCategory}
                    disabled
                    className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-500"
                />
            </div>

            {/* Monthly Limit */}
            <div>
                <label className="block text-sm font-medium mb-1">
                    Maximum Spend
                </label>
                <input
                    type="number"
                    min={0}
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>

            {/* Theme Picker */}
            <div>
                <label className="block text-sm font-medium mb-2">
                    Theme
                </label>
                <div className="flex gap-3">
                    {COLORS.map((c) => (
                        <button
                            key={c.value}
                            type="button"
                            onClick={() => setColor(c.value)}
                            className={`w-8 h-8 rounded-full ${c.value} ${color === c.value
                                ? "ring-2 ring-black ring-offset-2"
                                : ""
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}
