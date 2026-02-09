import { query } from "./db";

export type Transaction = {
    id: number;
    recipient: string;
    avatar?: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
};

export async function getTransactions(): Promise<Transaction[]> {
    const result = await query<Transaction>(`
    SELECT
      t.id,
      t.name AS recipient,
      t.avatar,
      c.name AS category,
      t.amount,
      t.recurring,
      t.transaction_date AS date
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    ORDER BY t.transaction_date DESC
  `);

    // Converts numeric strings to nums (if needed)
    return result.rows.map(tx => ({
        ...tx,
        amount: Number(tx.amount),
        date: new Date(tx.date).toISOString(),
        avatar: tx.avatar ? tx.avatar.replace(/^\.\/+/, "/") : undefined,
    }));
}
