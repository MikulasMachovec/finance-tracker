import BudgetCard from "./BudgetCard";

const BudgetList = ({
    budgets,
    onEdit,
    onDelete,
})=> {

    if (!budgets.length) {
        return (
            <div
                className="
                    rounded-2xl
                    border border-slate-200
                    bg-white
                    p-10
                    text-center
                "
            >
                <h3 className="text-lg font-semibold text-slate-800">
                    No budgets found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    Create your first budget to start tracking your spending.
                </p>
            </div>
        );
    }

    return (
        <div
            className="
                grid
                gap-6
                md:grid-cols-2
                xl:grid-cols-3
            "
        >
            {budgets.map((budget) => (
                <BudgetCard
                    key={budget.budgetId}
                    budget={budget}
                    onEdit={() => onEdit(budget)}
                    onDelete={() => onDelete(budget)}
                />
            ))}
        </div>
    );
};
export default BudgetList;