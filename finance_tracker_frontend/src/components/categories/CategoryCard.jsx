import { usePreferences } from "../../context/preferencesContext";
import { formatCurrency } from "../../utils/formatCurrency";
import BackgroundCard from "../ui/BackgroundCard";
import DropdownMenu from "../ui/DropdownMenu";

const CategoryCard = ({ 
    category,
    onEdit,
    onDelete
}) => {
    const {preferences} = usePreferences();
    const percentage = (category.spent / category.budget) * 100;
    const progress = Math.min(percentage, 100);
    const remaining = category.budget - category.spent;

    let progressColor = "bg-green-500";

    if (percentage >= 75 && percentage < 100) {
        progressColor = "bg-amber-500";
    }

    if (percentage >= 100) {
        progressColor = "bg-red-500";
    }

    return (
        <BackgroundCard>
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="h-4 w-4 rounded-full"
                        style={{
                            backgroundColor: category.color,
                        }}
                    />
                        <div>

                            <h3 className="font-semibold text-slate-800">
                                {category.name}
                            </h3>

                            <p className="text-sm text-slate-500">
                                {category.transactions} transactions
                            </p>

                        </div>

                </div>

                <DropdownMenu 
                        onEdit={() => onEdit(category)}
                        onDelete={() => onDelete(category)}
                    />
            </div> 

            {/* Budget */}
            <div className="mt-4 space-y-2">
                
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                        Budget
                    </span>  

                    <span className="font-medium">
                        {formatCurrency(category.budget, preferences.currency)}
                    </span>

                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                        Spent
                    </span>  

                    <span className="font-medium">
                        {formatCurrency(category.spent ?? 0, preferences.currency)}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">
                        Remaining
                    </span>  

                    <span 
                        className={
                            remaining >= 0
                            ? "font-medium text-green-600"
                            : "font-medium text-red-500"
                        }
                    
                    >
                        {formatCurrency(Math.abs(remaining), preferences.currency)}
                    </span>
                </div>

            </div>

            {/* Progress */}
            <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-500">
                    {(Number.isFinite(percentage) ? percentage : 0).toFixed(0)}% used
                    </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">

                <div
                    className={`h-full rounded-full ${progressColor}`}
                    style={{
                        width: `${progress}%`,
                    }}
                />

                </div>

            </div>
             
        </BackgroundCard>
        
    )
};
export default CategoryCard;