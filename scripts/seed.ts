import { Client } from "pg";
import fs from "fs";
import path from "path";

type Balance = {
    current: number;
    income: number;
    expenses: number;
};

type Transaction = {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
};

type Budget = {
    category: string;
    maximum: number;
    theme: string;
};

type Pot = {
    name: string;
    target: number;
    total: number;
    theme: string;
};

type SeedData = {
    balance: Balance;
    transactions: Transaction[];
    budgets: Budget[];
    pots: Pot[];
};

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function seed() {
    await client.connect();

    const dataPath = path.join(process.cwd(), "data", "data.json");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const data: SeedData = JSON.parse(raw);

    console.log("🌱 Seeding database...");

    // Account / balance
    await client.query(
        `
    INSERT INTO accounts (current_balance, income, expenses)
    VALUES ($1, $2, $3)
    `,
        [
            data.balance.current,
            data.balance.income,
            data.balance.expenses,
        ]
    );

    // Categories
    const categorySet = new Set<string>();

    data.transactions.forEach((t) => categorySet.add(t.category));
    data.budgets.forEach((b) => categorySet.add(b.category));


    for (const name of categorySet) {
        await client.query(
            `
      INSERT INTO categories (name)
      VALUES ($1)
      ON CONFLICT (name) DO NOTHING
      `,
            [name]
        );
    }

    // Budgets
    for (const budget of data.budgets) {
        const { rows } = await client.query<{ id: number }>(
            `SELECT id FROM categories WHERE name = $1`,
            [budget.category]
        );


        await client.query(
            `
      INSERT INTO budgets (category_id, maximum)
      VALUES ($1, $2)
      `,
            [rows[0].id, budget.maximum]
        );
    }

    // Pots
    for (const pot of data.pots) {
        await client.query(
            `
      INSERT INTO pots (name, target, total, theme)
      VALUES ($1, $2, $3, $4)
      `,
            [pot.name, pot.target, pot.total, pot.theme]
        );
    }

    // Transactions
    for (const tx of data.transactions) {
        const { rows } = await client.query(
            `SELECT id FROM categories WHERE name = $1`,
            [tx.category]
        );

        await client.query(
            `
      INSERT INTO transactions
        (name, avatar, category_id, amount, recurring, transaction_date)
      VALUES
        ($1, $2, $3, $4, $5, $6)
      `,
            [
                tx.name,
                tx.avatar,
                rows[0].id,
                tx.amount,
                tx.recurring,
                tx.date,
            ]
        );
    }

    await client.end();
    console.log("Seeding complete!");
}

seed().catch((err) => {
    console.error("Seed failed", err);
    process.exit(1);
});
