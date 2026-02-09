import { query } from "./db";

export type BudgetTransaction = {
    id: number;
    name: string;
    avatar?: string;
    amount: number;
    date: string;
};

export type Budget = {
    id: number;
    category: string;
    spent: number;
    limit: number;
    color: string;
    latestTransactions: BudgetTransaction[];
};

export async function getBudgets(): Promise<Budget[]> {
    const result = await query<{
        budget_id: number;
        category: string;
        limit: number;
        spent: number;
    }>(`
    SELECT
      b.id AS budget_id,
      c.name AS category,
      b.maximum AS limit,
      COALESCE(SUM(t.amount), 0) AS spent
    FROM budgets b
    JOIN categories c ON b.category_id = c.id
    LEFT JOIN transactions t
      ON t.category_id = c.id
      AND t.amount < 0
    GROUP BY b.id, c.name
    ORDER BY c.name
  `);

    const budgets: Budget[] = [];

    for (const row of result.rows) {
        const txResult = await query<BudgetTransaction>(
            `
      SELECT
        t.id,
        t.name,
        t.avatar,
        t.amount,
        t.transaction_date AS date
      FROM transactions t
      JOIN categories c ON t.category_id = c.id
      WHERE c.name = $1
      ORDER BY t.transaction_date DESC
      LIMIT 1
      `,
            [row.category]
        );

        const latestTransactions = txResult.rows.map(tx => ({
            ...tx,
            amount: Number(tx.amount),
            date: new Date(tx.date).toISOString(),
            avatar: tx.avatar ? tx.avatar.replace(/^\.\/+/, "/") : undefined,
        }));

        budgets.push({
            id: row.budget_id,
            category: row.category,
            spent: Number(row.spent),
            limit: Number(row.limit),
            color: assignColor(row.category),
            latestTransactions,
        });
    }

    return budgets;
}

function assignColor(category: string) {
    switch (category.toLowerCase()) {
        case "entertainment":
            return "bg-blue-500";
        case "groceries":
            return "bg-green-500";
        case "transport":
            return "bg-yellow-500";
        case "dining out":
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
}
