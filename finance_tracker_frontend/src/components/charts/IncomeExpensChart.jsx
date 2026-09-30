import BackgroundCard from "../ui/BackgroundCard";

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

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip 
                        formatter={(value,name) => [`${value} €`, name]}
                    />

                    <Legend />

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