import { query } from "./db";

export type Pot = {
    id: number;
    title: string;
    currentAmount: number;
    targetAmount: number;
    theme: string;
};

export async function getPots(): Promise<Pot[]> {
    const result = await query<{
        id: number;
        name: string;
        total: number;
        target: number;
        theme: string;
    }>(`
    SELECT id, name, total, target, theme
    FROM pots
    ORDER BY id
  `);

    return result.rows.map((row) => ({
        id: row.id,
        title: row.name,
        currentAmount: Number(row.total),
        targetAmount: Number(row.target),
        theme: row.theme,
    }));
}
