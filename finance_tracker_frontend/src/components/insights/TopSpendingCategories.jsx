import { usePreferences } from "../../context/preferencesContext";
import { formatCurrency } from "../../utils/formatCurrency";

const TopSpendingCategories = ({ categories }) => {  
    const {preferences} = usePreferences();

    const totalSpent = categories.reduce(
        (sum, category) => sum + category.amount,
        0
    )

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:bg-slate-800">

            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Top Spending Categories
            </h2>

            <div className="mt-6 space-y-5">

                {categories.map(category => {

                    const percentage =
                        totalSpent === 0
                            ? 0
                            : (category.amount / totalSpent) * 100;

                    return (

                        <div key={category.categoryName}>

                            <div className="mb-2 flex justify-between">

                                <div className="flex items-center gap-3">

                                    <div
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            backgroundColor:
                                                category.categoryColor
                                        }}
                                    />

                                    <span className="font-medium dark:text-white">
                                        {category.categoryName}
                                    </span>

                                </div>

                                <div className="text-right">

                                    <p className="font-semibold dark:text-white">
                                        {formatCurrency(category.amount, preferences.currency)}
                                    </p>

                                    <p className="text-xs text-slate-500 dark:text-slate-300">
                                        {percentage.toFixed(1)}%
                                    </p>

                                </div>

                            </div>

                            <div className="h-2 rounded-full bg-slate-200">

                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${percentage}%`,
                                        backgroundColor:
                                        category.categoryColor
                                    }}
                                />

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default TopSpendingCategories;