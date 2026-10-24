import {
    FaWallet,
    FaArrowTrendUp,
    FaPiggyBank,
} from "react-icons/fa6";
import BudgetSummaryCard from "./BudgetSummaryCard";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePreferences } from "../../context/preferencesContext";

const BudgetSummary = ({ budgets }) => {
    const {preferences} = usePreferences();
    const totalBudget = budgets.reduce(
        (sum, budget) => sum + budget.limitAmount,
        0
    );

    const totalSpent = budgets.reduce(
        (sum, budget) => sum + budget.spentAmount,
        0
    );

    const remaining = totalBudget - totalSpent;

    return (
        <div className=" grid gap-6 md:grid-cols-3">
            <BudgetSummaryCard
                title="Total Budget"
                value={formatCurrency(totalBudget, preferences.currency)}
                subtitle="Monthly budget"
                icon={FaWallet}
            />

            <BudgetSummaryCard
                title="Spent"
                value={formatCurrency(totalSpent, preferences.currency)}
                subtitle="Current spending"
                icon={FaArrowTrendUp}
            />

            <BudgetSummaryCard
                title="Remaining"
                value={formatCurrency(remaining, preferences.currency)}
                subtitle="Available to spend"
                icon={FaPiggyBank}
            />
        </div>
    )
};
export default BudgetSummary;