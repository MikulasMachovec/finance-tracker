import {
    FaWallet,
    FaArrowTrendUp,
    FaPiggyBank,
} from "react-icons/fa6";
import BudgetSummaryCard from "./BudgetSummaryCard";

const BudgetSummary = ({ budgets }) => {
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
                value={`€${totalBudget.toLocaleString()}`}
                subtitle="Monthly budget"
                icon={FaWallet}
            />

            <BudgetSummaryCard
                title="Spent"
                value={`€${totalSpent.toLocaleString()}`}
                subtitle="Current spending"
                icon={FaArrowTrendUp}
            />

            <BudgetSummaryCard
                title="Remaining"
                value={`€${remaining.toLocaleString()}`}
                subtitle="Available to spend"
                icon={FaPiggyBank}
            />
        </div>
    )
};
export default BudgetSummary;