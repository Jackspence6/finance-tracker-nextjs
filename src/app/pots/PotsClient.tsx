"use client";

import { useState } from "react";
import PotItem from "../../components/pots/PotItem";
import EditPotModal from "../../components/pots/EditPotModal";
import DeletePotModal from "../../components/pots/DeletePotModal";
import AddPotModal from "../../components/pots/AddPotModal";
import AdjustPotModal from "../../components/pots/AdjustPotModal";
import type { Pot } from "../../../lib/pots";
import { removePot, addMoney, withdrawMoney } from "./actions"; // server actions

export default function PotsClient({ pots }: { pots: Pot[] }) {
    const [selectedPot, setSelectedPot] = useState<Pot | null>(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isAdjustOpen, setIsAdjustOpen] = useState(false);
    const [adjustType, setAdjustType] = useState<"Add" | "Withdraw">("Add");

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Pots</h1>
                <button
                    onClick={() => setIsAddOpen(true)}
                    className="px-4 py-2 bg-black text-white rounded-lg"
                >
                    + Add New Pot
                </button>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pots.map((pot) => (
                    <PotItem
                        key={pot.id}
                        pot={pot}
                        onEdit={() => {
                            setSelectedPot(pot);
                            setIsEditOpen(true);
                        }}
                        onDelete={() => {
                            setSelectedPot(pot);
                            setIsDeleteOpen(true);
                        }}
                        onAdd={() => {
                            setSelectedPot(pot);
                            setAdjustType("Add");
                            setIsAdjustOpen(true);
                        }}
                        onWithdraw={() => {
                            setSelectedPot(pot);
                            setAdjustType("Withdraw");
                            setIsAdjustOpen(true);
                        }}
                    />
                ))}
            </section>

            <AddPotModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

            <EditPotModal pot={selectedPot} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

            <DeletePotModal
                pot={selectedPot}
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={async () => {
                    if (!selectedPot) return;
                    await removePot(selectedPot.id);
                    setIsDeleteOpen(false);
                }}
            />

            {selectedPot && (
                <AdjustPotModal
                    potTitle={selectedPot.title}
                    isOpen={isAdjustOpen}
                    onClose={() => setIsAdjustOpen(false)}
                    actionType={adjustType}
                    onSubmit={async (amount) => {
                        if (!selectedPot) return;
                        if (adjustType === "Add") {
                            await addMoney(selectedPot.id, amount);
                        } else {
                            await withdrawMoney(selectedPot.id, amount);
                        }
                    }}
                />
            )}
        </>
    );
}
