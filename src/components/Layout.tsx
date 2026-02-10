"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    // current path
    const pathname = usePathname();

    const navItems = [
        { label: "Overview", href: "/" },
        { label: "Transactions", href: "/transactions" },
        { label: "Budgets", href: "/budgets" },
        { label: "Pots", href: "/pots" },
        { label: "Recurring Bills", href: "/recurring" },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-black shadow-lg p-6 flex flex-col">
                <h1 className="text-white text-2xl font-bold mb-8">Finance</h1>

                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-left font-semibold px-3 py-2 rounded hover:underline ${isActive
                                    ? "bg-white text-black" // active link style
                                    : "text-white"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 text-black">{children}</main>
        </div>
    );
}
