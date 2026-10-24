import { usePreferences } from "../../context/preferencesContext";
import { useTheme } from "../../context/themeContext";
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
     const { isDark } = useTheme();
        
        const textColor = isDark ? "#cbd5e1" : "#475569";
        const gridColor = isDark ? "#475569" : "#e2e8f0";
        const tooltipBackground = isDark ? "#1e293b" : "#ffffff";
        const tooltipBorder = isDark ? "#475569" : "#e2e8f0";

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
                        stroke={gridColor}
                    />

                    <XAxis
                        dataKey="month"
                        tick={{fill: textColor}}
                        axisLine={{ stroke: gridColor }}
                        tickLine={{ stroke: gridColor }}
                    />

                    <YAxis 
                        tick={{ fill: textColor }}
                        axisLine={{ stroke: gridColor }}
                        tickLine={{ stroke: gridColor }}
                    />

                    <Tooltip
                        contentStyle={{
                            backgroundColor: tooltipBackground,
                            border: `1px solid ${tooltipBorder}`,
                            borderRadius: "8px",
                            color: textColor,
                        }}
                        labelStyle={{ color: textColor }}
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