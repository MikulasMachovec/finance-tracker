import { usePreferences } from "../../../context/preferencesContext";
import { formatCurrency } from "../../../utils/formatCurrency";

const BudgetProgressItem = ({ budget }) => {

    const { preferences } = usePreferences();
    
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
                        {formatCurrency(budget.spentAmount,preferences.currency)} 
                        / 
                        {formatCurrency(budget.limitAmount,preferences.currency)}
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
                            ? `${formatCurrency( remaining, preferences.currency)} left`
                            : `${formatCurrency( Math.abs(remaining), preferences.currency)} over`}
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