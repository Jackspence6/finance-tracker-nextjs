"use server";

import { revalidatePath } from "next/cache";
import { createPot, updatePot, deletePot, addMoneyToPot, withdrawMoneyFromPot } from "../../../lib/pots";

export async function addPot(formData: FormData) {
    const name = formData.get("name") as string;
    const target = Number(formData.get("target"));
    const theme = formData.get("theme") as string;

    if (!name || target <= 0) throw new Error("Invalid input");

    await createPot(name, target, theme);
    revalidatePath("/pots");
}

export async function editPot(formData: FormData) {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;
    const target = Number(formData.get("target"));
    const theme = formData.get("theme") as string;

    if (!id || target <= 0 || !name) throw new Error("Invalid input");

    await updatePot(id, name, target, theme);
    revalidatePath("/pots");
}

export async function removePot(id: number) {
    await deletePot(id);
    revalidatePath("/pots");
}

export async function addMoney(potId: number, amount: number) {
    if (amount <= 0) throw new Error("Invalid amount");
    await addMoneyToPot(potId, amount);
    // Refreshing page
    revalidatePath("/pots");
}

export async function withdrawMoney(potId: number, amount: number) {
    if (amount <= 0) throw new Error("Invalid amount");
    await withdrawMoneyFromPot(potId, amount);
    revalidatePath("/pots");
}
