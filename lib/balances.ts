import { query } from "./db";

export type Balance = {
    current_balance: string;
    income: string;
    expenses: string;
};

export async function getBalance(): Promise<Balance | null> {
    const result = await query<Balance>("SELECT current_balance, income, expenses FROM accounts LIMIT 1");

    if (result.rows.length === 0) return null;

    return result.rows[0];
}
