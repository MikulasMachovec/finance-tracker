import { usePreferences } from "../../context/preferencesContext";
import { formatCurrency } from "../../utils/formatCurrency";
import BackgroundCard from "../ui/BackgroundCard";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const MonthlySpendingTrend = ({monthlySpending}) => {  
    const { preferences } = usePreferences();

    return (
        <BackgroundCard
            title="Monthly Spending Trend"
            subtitle="Expenses over the last 7 months"
        >

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <LineChart
                    data={monthlySpending}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                    />

                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(value) => [
                            formatCurrency(value, preferences.currency),
                            "Spent",
                        ]}
                    />

                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#2563EB"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 7 }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </BackgroundCard>
    );
};

export default MonthlySpendingTrend;