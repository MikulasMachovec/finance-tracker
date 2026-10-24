const BudgetSummaryCard = ({
    title,
    subtitle,
    value,
    icon: Icon,
}) => {
    return(
        <div className="
            rounded-2xl
            border border-slate-200
            bg-white dark:bg-slate-800
            p-5
            shadow-sm
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="test-sm text-slate-500 dark:text-white">
                        {title}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-800 dark:text-white">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500 dark:text-white">
                            {subtitle}
                        </p>
                    )}

                </div>

                {Icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                        <Icon className="text-xl text-slate-600" />
                    </div>
                )}

            </div>

        </div>
    )
};
export default BudgetSummaryCard;