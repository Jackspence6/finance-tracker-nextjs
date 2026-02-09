"use client";

import Modal from "../Modal";

type Pot = {
    id: number;
    title: string;
    targetAmount: number;
};

interface EditPotModalProps {
    pot: Pot | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditPotModal({
    pot,
    isOpen,
    onClose,
}: EditPotModalProps) {
    if (!pot) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Edit ${pot.title}`}>
            <form className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold">Pot Name</label>
                    <input
                        className="w-full border border-gray-300 rounded p-2"
                        defaultValue={pot.title}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Target</label>
                    <input
                        className="w-full border border-gray-300 rounded p-2"
                        defaultValue={pot.targetAmount}
                    />
                </div>

                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Save Changes
                </button>
            </form>
        </Modal>
    );
}
