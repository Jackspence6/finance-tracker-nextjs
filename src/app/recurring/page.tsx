import Layout from "../../components/Layout";
import RecurringBillsTable from "./RecurringBillsTable";
import { getRecurringBills, RecurringBill } from "../../../lib/recurring";

export default async function RecurringBillsPage() {
    const bills: RecurringBill[] = await getRecurringBills();

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Recurring Bills</h1>

            <RecurringBillsTable bills={bills} />
        </Layout>
    );
}
