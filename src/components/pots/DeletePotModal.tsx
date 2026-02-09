"use client";

import Modal from "../Modal";

type Pot = {
    id: number;
    title: string;
};

interface DeletePotModalProps {
    pot: Pot | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeletePotModal({
    pot,
    isOpen,
    onClose,
    onConfirm,
}: DeletePotModalProps) {
    if (!pot) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${pot.title}?`}>
            <p className="text-gray-500 mb-4">
                Are you sure you want to delete this pot? This action cannot be undone.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Yes, Delete
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
