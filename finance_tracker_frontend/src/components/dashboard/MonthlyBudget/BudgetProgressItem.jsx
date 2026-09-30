const BudgetProgressItem = ({ budget }) => {
    
    const percentage = (budget.spentAmount / budget.limitAmount) * 100;
    
    const progress = Math.min(percentage, 100);
    
    const remaining = budget.limitAmount - budget.spentAmount;

    let progressColor = "bg-green-500";

    if (percentage >= 75 && percentage < 100) {
        progressColor = "bg-amber-500";
    }

    if (percentage >= 100) {
        progressColor = "bg-red-500";
    }
    
    return (
        <div className="space-y-2">

            <div className="flex items-center justify-between">
                
                <div>
                    <p className="font-medium text-slate-800">
                        {budget.categoryName}
                    </p>

                    <p  className="text-sm text-slate-500">
                        €{budget.spentAmount.toLocaleString()} / €{budget.limitAmount.toLocaleString()}
                    </p>
                </div>

                <div className="text-right">
                    
                    <p className="font-semibold"> 
                        {percentage.toFixed(0)}%
                    </p>

                    <p
                        className={`text-xs ${
                            remaining >= 0
                                ? "text-slate-500"
                                : "text-red-500"
                        }`}
                    >
                        {remaining >= 0
                            ? `€${remaining.toLocaleString()} left`
                            : `€${Math.abs(remaining).toLocaleString()} over`}
                    </p>

                </div>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                    className={`h-full rounded-full transition-all duration-300 ${progressColor}`}
                    style={{ width: `${progress}%` }}
                />

            </div>

        </div>
    )

};
export default BudgetProgressItem;