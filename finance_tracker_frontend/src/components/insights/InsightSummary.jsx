import {
    FaArrowTrendUp,
    FaArrowTrendDown,
    FaPiggyBank,
    FaChartLine
} from "react-icons/fa6";

import InsightSummaryCard from "./InsightSummaryCard";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePreferences } from "../../context/preferencesContext";

const InsightSummary = ({ summary }) => {

    const {preferences} = usePreferences();
        
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
                    value={formatCurrency(summary.income, preferences.currency)}
                    subtitle="This month"
                    icon={FaArrowTrendUp}
                    iconColor="text-green-600"
                    iconBg="bg-green-100"
                />
    
    
                <InsightSummaryCard
                    title="Total Expenses"
                    value={formatCurrency(summary.expense, preferences.currency)}
                    subtitle="This month"
                    icon={FaArrowTrendDown}
                    iconColor="text-red-600"
                    iconBg="bg-red-100"
                />
    
    
                <InsightSummaryCard
                    title="Balance"
                    value={formatCurrency(summary.balance, preferences.currency)}
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