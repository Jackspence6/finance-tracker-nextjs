import Layout from "../../components/Layout";
import { getRecurringBills, RecurringBill } from "../../../lib/recurring";

export default async function RecurringBillsPage() {
    const bills: RecurringBill[] = await getRecurringBills();

    // Reference date for calculations
    const referenceDate = new Date("2024-08-01T00:00:00Z");

    const billsWithStatus = bills.map((bill) => {
        const dueDate = new Date(bill.date);
        let status: "Paid" | "Upcoming" | "Due Soon" = "Upcoming";

        const diffDays = (dueDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diffDays < 0) status = "Paid";
        else if (diffDays <= 3) status = "Due Soon";

        return { ...bill, status };
    });

    const totalBills = billsWithStatus.reduce((sum, b) => sum + b.amount, 0);
    const paidBills = billsWithStatus
        .filter((b) => b.status === "Paid")
        .reduce((sum, b) => sum + b.amount, 0);
    const upcomingBills = billsWithStatus
        .filter((b) => b.status === "Upcoming")
        .reduce((sum, b) => sum + b.amount, 0);
    const dueSoonCount = billsWithStatus.filter((b) => b.status === "Due Soon").length;

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Recurring Bills</h1>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-black text-white rounded-lg shadow text-center">
                    <h3 className="font-semibold mb-1">Total Bills</h3>
                    <p className="text-2xl font-bold">${totalBills.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow text-center">
                    <h3 className="font-semibold text-gray-600 mb-1">Paid Bills</h3>
                    <p className="text-2xl font-bold">${paidBills.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow text-center">
                    <h3 className="font-semibold text-gray-600 mb-1">Total Upcoming</h3>
                    <p className="text-2xl font-bold">${upcomingBills.toLocaleString()}</p>
                    <p className="text-gray-500 text-sm">{dueSoonCount} Due Soon</p>
                </div>
            </div>

            {/* Bills Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bill Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Due Date</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {billsWithStatus.map((bill) => (
                            <tr key={bill.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{bill.name}</td>
                                <td className="px-6 py-4">{bill.category}</td>
                                <td className="px-6 py-4">{new Date(bill.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right font-bold">${bill.amount.toLocaleString()}</td>
                                <td
                                    className={`px-6 py-4 font-semibold ${bill.status === "Paid"
                                        ? "text-green-500"
                                        : bill.status === "Upcoming"
                                            ? "text-blue-500"
                                            : "text-red-500"
                                        }`}
                                >
                                    {bill.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
