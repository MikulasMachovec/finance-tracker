import { usePreferences } from "../../context/preferencesContext";
import { formatCurrency } from "../../utils/formatCurrency";
import BackgroundCard from "../ui/BackgroundCard";
import { useTheme } from "../../context/themeContext";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

const IncomeExpenseChart = ( {monthlyFinance} ) => {
    const {preferences} = usePreferences();
    const { isDark } = useTheme();
    
    const textColor = isDark ? "#cbd5e1" : "#475569";
    const gridColor = isDark ? "#475569" : "#e2e8f0";
    const tooltipBackground = isDark ? "#1e293b" : "#ffffff";
    const tooltipBorder = isDark ? "#475569" : "#e2e8f0";
    
    return(
        <BackgroundCard
        title="Income vs Expenses"
        subtitle="Monthly comparison"
        >
            <ResponsiveContainer
                width="100%"
                height={320}
            >
                <LineChart data={monthlyFinance}>

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
                        formatter={(value,name) => [
                            formatCurrency(value, preferences.currency), 
                            name,
                        ]}
                    />

                    <Legend 
                        wrapperStyle={{ color: textColor }}
                    />

                    <Line 
                        type="monotone"
                        dataKey="income"
                        stroke="#22c55e"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />

                    <Line 
                        type="monotone"
                        dataKey="expense"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />

                </LineChart>
            </ResponsiveContainer>
        </BackgroundCard>
    );
};

export default IncomeExpenseChart;