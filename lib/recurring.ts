import { query } from "./db";

export type RecurringBill = {
    id: number;
    name: string;
    category: string;
    date: string;
    amount: number;
    type: "income" | "expense";
};

export async function getRecurringBills(): Promise<RecurringBill[]> {
    const result = await query<{
        id: number;
        name: string;
        amount: number;
        transaction_date: string;
        category: string;
    }>(
        `
    SELECT t.id, t.name, t.amount, t.transaction_date, c.name AS category
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.recurring = true
    ORDER BY t.transaction_date DESC
    `
    );

    return result.rows.map((row) => {
        const isExpense = row.amount < 0;

        return {
            id: row.id,
            name: row.name,
            category: row.category,
            date: new Date(row.transaction_date).toISOString(),
            amount: Math.abs(Number(row.amount)),
            type: isExpense ? "expense" : "income",
        };
    });
}
