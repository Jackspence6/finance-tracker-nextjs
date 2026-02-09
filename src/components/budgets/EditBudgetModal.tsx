"use client";

import Modal from "../Modal";
import BudgetForm from "./BudgetForm";

interface EditBudgetModalProps {
    category: string | null;
    limit: number;
    color: string;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { limit: number; color: string }) => void;
}

export default function EditBudgetModal({
    category,
    limit,
    color,
    isOpen,
    onClose,
    onSave,
}: EditBudgetModalProps) {
    if (!category) return null;

    return (
        <Modal
            title={`Edit ${category}`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <BudgetForm
                initialCategory={category}
                initialLimit={limit}
                initialColor={color}
                onCancel={onClose}
                onSubmit={(data) => {
                    onSave(data);
                    onClose();
                }}
            />
        </Modal>
    );
}
