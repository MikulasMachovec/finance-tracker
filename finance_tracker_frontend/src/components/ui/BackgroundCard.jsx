const BackgroundCard = ({
    title, 
    subtitle,
    children,
}) => {
    return (
        <div className={`
            bg-white 
            border border-slate-200 
            rounded-2xl 
            shadow-sm 
            p-6 
            mt-2
            `}>
            <div className="mb-2">
                <h2 className="text-lg font-semibold text-slate-800">
                    {title}
                </h2>

                {subtitle && (
                    <p className="text-sm text-slate-500 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>

                {children}

        </div>
    );
};

export default BackgroundCard;