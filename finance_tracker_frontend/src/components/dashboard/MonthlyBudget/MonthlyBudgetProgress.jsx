import BackgroundCard from "../../ui/BackgroundCard";
import BudgetProgressItem from "./BudgetProgressItem";

const MonthlyBudgetProgress = ({ budgets }) => {
    return(
        <BackgroundCard
        title="Monthly Budget Progress"
        subtitle="Track your category budget"
        >
            <div className="space-y-6">

                {budgets.map((budget) => (
                    <BudgetProgressItem
                        key={budget.budgetId}
                        budget={budget}
                    />
                ))}

            </div>
        </BackgroundCard>
    );
};

export default MonthlyBudgetProgress;