import DropdownMenu from "../ui/DropdownMenu";

const BudgetCard = ({
    budget,
    onEdit,
    onDelete
}) => {
    const percentage = (budget.spentAmount / budget.limitAmount) * 100;

    const progress = Math.min(percentage, 100);

    const remaining = budget.limitAmount - budget.spentAmount;


    let statusColor = "text-green-600";

    if (percentage >= 75 && percentage < 100) {
        statusColor = "text-amber-600";
    }

    if (percentage >= 100) {
        statusColor = "text-red-600";
    }

    return (
        <div
            className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
                shadow-sm
            "
        >

            {/* Header */}
            <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                    <div
                        className="h-4 w-4 rounded-full"
                        style={{
                            backgroundColor: budget.categoryColor
                        }}
                    />

                    <div>
                        <h3 className="font-semibold text-slate-800">
                            {budget.categoryName}
                        </h3>

                        <p className="text-sm text-slate-500">
                            Monthly budget
                        </p>
                    </div>

                </div>


                <DropdownMenu
                    onEdit={() => onEdit(budget)}
                    onDelete={() => onDelete(budget)}
                />

            </div>


            {/* Amount */}
            <div className="mt-6 flex items-end justify-between">

                <div>
                    <p className="text-2xl font-bold text-slate-800">
                        €{(budget.spentAmount ?? 0).toLocaleString()}
                    </p>

                    <p className="text-sm text-slate-500">
                        of €{(budget.limitAmount ?? 0).toLocaleString()}
                    </p>
                </div>


                <div className="text-right">

                    <p
                        className={`
                            font-semibold
                            ${statusColor}
                        `}
                    >
                        {percentage.toFixed(0)}%
                    </p>

                    <p className="text-sm text-slate-500">
                        {remaining >= 0
                            ? `${remaining.toLocaleString()}€ left`
                            : `${Math.abs(remaining).toLocaleString()}€ over`
                        }
                    </p>

                </div>

            </div>


            {/* Progress */}
            <div
                className="
                    mt-5
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-slate-200
                "
            >

                <div
                    className="
                        h-full
                        rounded-full
                        transition-all
                    "
                    style={{
                        width: `${progress}%`,
                        backgroundColor: budget.categoryColor
                    }}
                />

            </div>

        </div>
    );
};
export default BudgetCard;