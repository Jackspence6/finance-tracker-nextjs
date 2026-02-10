import { query } from "./db";

export type Transaction = {
  id: number;
  name: string;
  category: string;
  amount: number;
  type: "income" | "expense"; // optional for clarity
  date: string;
  avatar?: string;
};

export async function getTransactions(): Promise<Transaction[]> {
  const result = await query<{
    id: number;
    name: string;
    amount: number;
    transaction_date: string;
    category: string;
    avatar?: string;
  }>(`
    SELECT
      t.id,
      t.name,
      t.amount,
      t.transaction_date,
      c.name AS category,
      t.avatar
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    ORDER BY t.transaction_date DESC
  `);

  return result.rows.map((tx) => {
    const isExpense = tx.amount < 0;

    return {
      id: tx.id,
      name: tx.name,
      category: tx.category,
      amount: Math.abs(Number(tx.amount)),
      type: isExpense ? "expense" : "income",
      date: new Date(tx.transaction_date).toISOString(),
      avatar: tx.avatar ? tx.avatar.replace(/^\.\/+/, "/") : undefined,
    };
  });
}
