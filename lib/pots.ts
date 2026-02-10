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

export async function createPot(
    name: string,
    target: number,
    theme: string
) {
    await query(
        `INSERT INTO pots (name, target, total, theme)
     VALUES ($1, $2, 0, $3)`,
        [name, target, theme]
    );
}

export async function updatePot(
    id: number,
    name: string,
    target: number,
    theme: string
) {
    await query(
        `UPDATE pots SET name = $1, target = $2, theme = $3 WHERE id = $4`,
        [name, target, theme, id]
    );
}

export async function deletePot(id: number) {
    await query(`DELETE FROM pots WHERE id = $1`, [id]);
}

export async function addMoneyToPot(potId: number, amount: number) {
    await query(`UPDATE pots SET total = total + $1 WHERE id = $2`, [amount, potId]);
}

export async function withdrawMoneyFromPot(potId: number, amount: number) {
    // preventing negative balances
    await query(
        `UPDATE pots SET total = GREATEST(total - $1, 0) WHERE id = $2`,
        [amount, potId]
    );
}
