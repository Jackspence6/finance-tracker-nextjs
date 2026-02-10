import Layout from "../../components/Layout";
import TransactionsTable from "./TransactionsTable";
import { getTransactions, Transaction } from "../../../lib/transactions";

export default async function TransactionsPage() {
    const transactions: Transaction[] = await getTransactions();

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Transactions</h1>
            <TransactionsTable initialTransactions={transactions} />
        </Layout>
    );
}
