import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaPiggyBank,
    FaChartLine
} from "react-icons/fa6";

import InsightSummaryCard from "./InsightSummaryCard";

const InsightSummary = ({ summary }) => {
        
        return (
            <div
                className="
                    grid
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-4
                "
            >
    
                <InsightSummaryCard
                    title="Total Income"
                    value={`${summary.income}€`}
                    subtitle="This month"
                    icon={FaArrowTrendUp}
                    iconColor="text-green-600"
                    iconBg="bg-green-100"
                />
    
    
                <InsightSummaryCard
                    title="Total Expenses"
                    value={`${summary.expense}€`}
                    subtitle="This month"
                    icon={FaArrowTrendDown}
                    iconColor="text-red-600"
                    iconBg="bg-red-100"
                />
    
    
                <InsightSummaryCard
                    title="Balance"
                    value={`${summary.balance}€`}
                    subtitle="Income - Expenses"
                    icon={FaChartLine}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-100"
                />
    
    
                <InsightSummaryCard
                    title="Saving Rate"
                    value={`${summary.savingsPercentage}%`}
                    subtitle="Of income saved"
                    icon={FaPiggyBank}
                    iconColor="text-purple-600"
                    iconBg="bg-purple-100"
                />
    
            </div>
        );

};
export default InsightSummary;