"use client";

import { useState } from "react";
import { addPot } from "../../app/pots/actions";

interface AddPotModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const COLORS = [
    { name: "Green", value: "green" },
    { name: "Blue", value: "blue" },
    { name: "Purple", value: "purple" },
    { name: "Orange", value: "orange" },
];

export default function AddPotModal({ isOpen, onClose }: AddPotModalProps) {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        await addPot(formData);
        setLoading(false);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-bold mb-4">Add New Pot</h2>

                <form action={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="name"
                        placeholder="Pot name"
                        required
                        className="border px-3 py-2 rounded"
                    />

                    <input
                        name="target"
                        type="number"
                        min={1}
                        placeholder="Target amount"
                        required
                        className="border px-3 py-2 rounded"
                    />

                    <select
                        name="theme"
                        required
                        className="border px-3 py-2 rounded"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select theme
                        </option>
                        {COLORS.map((c) => (
                            <option key={c.value} value={c.value}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-black text-white rounded"
                        >
                            {loading ? "Adding..." : "Add Pot"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
