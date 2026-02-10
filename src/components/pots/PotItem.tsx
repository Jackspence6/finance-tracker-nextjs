import { useState } from "react";
import type { Pot } from "../../../lib/pots";

interface PotItemProps {
    pot: Pot;
    onAdd?: () => void;
    onWithdraw?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function PotItem({
    pot,
    onAdd,
    onWithdraw,
    onEdit,
    onDelete,
}: PotItemProps) {
    const { title, currentAmount, targetAmount } = pot;
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
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
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

            <div className="flex justify-between">
                <span className="text-sm text-gray-500">Total Saved</span>
                <span className="text-lg font-bold">
                    ${currentAmount.toLocaleString()}
                </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                    className="bg-blue-300 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex justify-between text-sm text-gray-600">
                <span>{progress.toFixed(0)}%</span>
                <span>Target: ${targetAmount.toLocaleString("en-US")}</span>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onAdd}
                    className="flex-1 px-3 py-2 bg-gray-100 text-black font-bold rounded hover:bg-gray-300"
                >
                    + Add Money
                </button>
                <button
                    onClick={onWithdraw}
                    className="flex-1 px-3 py-2 bg-gray-100 text-black font-bold rounded hover:bg-gray-300"
                >
                    Withdraw
                </button>
            </div>
        </div>
    );
}
