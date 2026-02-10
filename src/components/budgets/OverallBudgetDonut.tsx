"use client";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    TooltipItem,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
    totalSpent: number;
    totalLimit: number;
}

export default function OverallBudgetDonut({
    totalSpent,
    totalLimit,
}: Props) {
    const remaining = Math.max(totalLimit - totalSpent, 0);
    const percentage =
        totalLimit > 0 ? Math.min((totalSpent / totalLimit) * 100, 100) : 0;

    const data = {
        labels: ["Spent", "Remaining"],
        datasets: [
            {
                data: [totalSpent, remaining],
                backgroundColor: [
                    "#93C5FD", // soft blue
                    "#E5E7EB", // light gray
                ],
                borderWidth: 0,
                cutout: "70%",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (ctx: TooltipItem<"doughnut">) => {
                        const value = ctx.raw as number;
                        return `${ctx.label}: $${value.toLocaleString()}`;
                    },
                },
            },
        },
    };

    return (
        <div className="relative w-40 h-40 mx-auto">
            <Doughnut data={data} options={options} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm text-gray-500">Spent</span>
                <span className="text-xl font-bold">
                    {percentage.toFixed(0)}%
                </span>
            </div>
        </div>
    );
}
