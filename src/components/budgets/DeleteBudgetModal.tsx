"use client";

import Modal from "../Modal";

interface DeleteBudgetModalProps {
    category: string | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteBudgetModal({
    category,
    isOpen,
    onClose,
    onConfirm,
}: DeleteBudgetModalProps) {
    if (!category) return null;

    return (
        <Modal
            title={`Delete ${category}`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <p className="text-gray-500 mb-4">
                Are you sure you want to delete this budget? This action cannot be undone.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Yes, Delete
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
