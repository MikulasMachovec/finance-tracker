const SummaryCard = ({
    title,
    value,
    icon: Icon,
    color
}) => {
    return (
        <div className="
        bg-white 
        rounded-2xl 
        p-6 shadow-sm 
        border 
        border-slate-200 
        hover:shadow-md 
        hover:-translate-y-1 
        transition-all 
        duration-300"
        >
            {/* Top */}
            <div className="flex items-center justify-between">
                <h3 className="text-slate-500 font-medium">
                    {title}
                </h3>

                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="text-white text-lg" />
                </div>

            </div>

            {/* Value */}

            <h2 className="text-3xl font-bold text-slate-800 mt-6">
                {value}
            </h2>

        </div>
    );
};

export default SummaryCard;