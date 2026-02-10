"use client";

import Modal from "../Modal";
import { useState } from "react";

interface AdjustPotModalProps {
    potTitle: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (amount: number) => void;
    actionType: "Add" | "Withdraw";
}

export default function AdjustPotModal({
    potTitle,
    isOpen,
    onClose,
    onSubmit,
    actionType,
}: AdjustPotModalProps) {
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount <= 0) return;
        onSubmit(amount);
        setAmount(0);
        onClose();
    };

    return (
        <Modal
            title={`${actionType} Money to ${potTitle}`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="block text-sm font-medium">
                    Amount
                </label>
                <input
                    type="number"
                    min={0}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded"
                    required
                />

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
                    >
                        {actionType}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
