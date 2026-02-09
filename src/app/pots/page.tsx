"use client";

import React, { useState } from "react";
import Layout from "../../components/Layout";
import PotItem from "../../components/PotItem";
import Modal from "../../components/Modal";

type Pot = {
    id: number;
    title: string;
    currentAmount: number;
    targetAmount: number;
};

export default function PotsPage() {
    const pots = [
        { id: 1, title: "Vacation", currentAmount: 400, targetAmount: 1000 },
        { id: 2, title: "New Laptop", currentAmount: 500, targetAmount: 800 },
        { id: 3, title: "Emergency Fund", currentAmount: 1200, targetAmount: 1500 },
        { id: 4, title: "Home Decor", currentAmount: 200, targetAmount: 500 },
    ];

    const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);


    const handleEdit = (pot: Pot) => {
        setSelectedPot(pot);
        setIsEditOpen(true);
    };

    const handleDelete = (pot: Pot) => {
        setSelectedPot(pot);
        setIsDeleteOpen(true);
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Pots</h1>

            {/* Add New Pot */}
            <div className="flex justify-end items-end mb-6">
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                    Add New Pot
                </button>
            </div>

            {/* Pots List */}
            <section className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pots.map((pot) => (
                    <PotItem
                        key={pot.id}
                        title={pot.title}
                        currentAmount={pot.currentAmount}
                        targetAmount={pot.targetAmount}
                        onAdd={() => alert(`Add money to ${pot.title}`)}
                        onWithdraw={() => alert(`Withdraw money from ${pot.title}`)}
                        onEdit={() => handleEdit(pot)}
                        onDelete={() => handleDelete(pot)}
                    />
                ))}
            </section>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title={`Edit ${selectedPot?.title}`}
            >
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Pot Name</label>
                        <input
                            className="w-full border border-gray-300 rounded p-2"
                            defaultValue={selectedPot?.title}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">Target</label>
                        <input
                            className="w-full border border-gray-300 rounded p-2"
                            defaultValue={selectedPot?.targetAmount}
                        />
                    </div>

                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Save Changes
                    </button>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title={`Delete ${selectedPot?.title}?`}
            >
                <p className="text-gray-500 mb-4">
                    Are you sure you want to delete this pot? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Yes, Delete
                    </button>
                    <button
                        onClick={() => setIsDeleteOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </Layout>
    );
}
