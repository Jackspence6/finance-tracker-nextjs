"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    // Current path
    const pathname = usePathname();

    const navItems = [
        { label: "Overview", href: "/", icon: "/assets/images/icon-nav-overview.svg" },
        { label: "Transactions", href: "/transactions", icon: "/assets/images/icon-nav-transactions.svg" },
        { label: "Budgets", href: "/budgets", icon: "/assets/images/icon-nav-budgets.svg" },
        { label: "Pots", href: "/pots", icon: "/assets/images/icon-nav-pots.svg" },
        { label: "Recurring Bills", href: "/recurring", icon: "/assets/images/icon-nav-recurring-bills.svg" },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-black shadow-lg p-6 flex flex-col">
                <div className="mb-8">
                    <Image
                        src="/assets/images/logo-large.svg"
                        alt="Finance logo"
                        width={140}
                        height={40}
                        priority
                    />
                </div>
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 font-semibold px-3 py-2 rounded hover:underline ${isActive ? "bg-white text-black" : "text-white"
                                    }`}
                            >
                                <Image
                                    src={item.icon}
                                    alt={`${item.label} icon`}
                                    width={20}
                                    height={20}
                                />
                                <span>{item.label}</span>
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
