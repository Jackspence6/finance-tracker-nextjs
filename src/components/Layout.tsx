import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-black shadow-lg p-6 flex flex-col">
                <h1 className="text-white text-2xl font-bold mb-8">Finance</h1>

                <nav className="flex flex-col gap-4 text-white">
                    <Link href="/" className="font-semibold text-left hover:underline">
                        Overview
                    </Link>
                    <Link href="/transactions" className="text-left hover:underline">
                        Transactions
                    </Link>
                    <Link href="/budgets" className="text-left hover:underline">
                        Budgets
                    </Link>
                    <Link href="/pots" className="text-left hover:underline">
                        Pots
                    </Link>
                    <Link href="/recurring" className="text-left hover:underline">
                        Recurring Bills
                    </Link>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 text-black">{children}</main>
        </div>
    );
}
