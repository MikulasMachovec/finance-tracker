const CustomLegend = ({ data }) => {
    return (
        <div className="mt-6 space-y-3">
            {data.map((item) => (
                <div
                    key={item.categoryName}
                    className="flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{
                                backgroundColor: item.categoryColor,
                            }}
                        />

                        <span className="text-sm text-slate-700">
                            {item.categoryName}
                        </span>
                    </div>

                    <span className="font-medium">
                        €{item.amount.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;