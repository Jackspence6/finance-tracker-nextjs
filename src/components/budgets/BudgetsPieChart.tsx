"use client";

import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    TooltipItem,
    ChartOptions,
} from "chart.js";
import type { Budget } from "../../../lib/budgets";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetsPieChartProps {
    budgets: Budget[];
}

const SOFT_COLORS = [
    "#BFDBFE",
    "#A7F3D0",
    "#FDE68A",
    "#FECACA",
    "#DDD6FE",
    "#FED7AA",
    "#C7D2FE",
];

export default function BudgetsPieChart({ budgets }: BudgetsPieChartProps) {
    const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);

    const data = {
        labels: budgets.map((b) => b.category),
        datasets: [
            {
                label: "% of Total Spent",
                data: budgets.map((b) => b.spent),
                backgroundColor: budgets.map(
                    (_, i) => SOFT_COLORS[i % SOFT_COLORS.length]
                ),
                borderColor: "#ffffff",
                borderWidth: 1,
                hoverOffset: 8,
            },
        ],
    };

    const options: ChartOptions<"pie"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 12,
                    padding: 12,
                    font: {
                        size: 11,
                    },
                    color: "#374151", // gray-700
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: TooltipItem<"pie">) => {
                        const budget = budgets[tooltipItem.dataIndex];
                        const percent =
                            totalSpent > 0
                                ? ((budget.spent / totalSpent) * 100).toFixed(1)
                                : "0";

                        return `${budget.category}: $${budget.spent.toLocaleString()} (${percent}%)`;
                    },
                },
            },
        },
    };

    return <Pie data={data} options={options} />;
}
