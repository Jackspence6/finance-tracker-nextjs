"use client";

import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import PotItem from "../../components/pots/PotItem";
import EditPotModal from "../../components/pots/EditPotModal";
import DeletePotModal from "../../components/pots/DeletePotModal";

type Pot = {
    id: number;
    title: string;
    currentAmount: number;
    targetAmount: number;
    theme: string;
};

export default function PotsPage() {
    const [pots, setPots] = useState<Pot[]>([]);
    const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/pots");
            const data: Pot[] = await res.json();
            setPots(data);
        }
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Pots</h1>
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
                    + Add New Pot
                </button>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pots.map((pot) => (
                    <PotItem
                        key={pot.id}
                        title={pot.title}
                        currentAmount={pot.currentAmount}
                        targetAmount={pot.targetAmount}
                        onAdd={() => { }}
                        onWithdraw={() => { }}
                        onEdit={() => {
                            setSelectedPot(pot);
                            setIsEditOpen(true);
                        }}
                        onDelete={() => {
                            setSelectedPot(pot);
                            setIsDeleteOpen(true);
                        }}
                    />
                ))}
            </section>

            <EditPotModal
                pot={selectedPot}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />

            <DeletePotModal
                pot={selectedPot}
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={() => {
                    alert(`Deleted ${selectedPot?.title}`);
                    setIsDeleteOpen(false);
                }}
            />
        </Layout>
    );
}
