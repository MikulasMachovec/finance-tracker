const InsightSummaryCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconBg = "bg-blue-100",
    iconColor = "text-blue-600"
}) => {

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

            <div className="flex justify-between">

                <div>
                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-slate-800">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-1 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}

                </div>


                {Icon && (
                    <div
                        className={`
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            ${iconBg}
                        `}
                    >
                        <Icon
                            className={`${iconColor} text-xl`}
                        />
                    </div>
                )}

            </div>

        </div>
    );
};

export default InsightSummaryCard;