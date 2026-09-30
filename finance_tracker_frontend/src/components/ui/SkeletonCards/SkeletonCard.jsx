const SkeletonCard = () => {

    return (
        <div
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                animate-pulse
            "
        >

            <div
                className="
                    h-4
                    w-32
                    rounded
                    bg-slate-200
                "
            />

            <div
                className="
                    mt-4
                    h-8
                    w-24
                    rounded
                    bg-slate-200
                "
            />

            <div
                className="
                    mt-4
                    h-3
                    w-full
                    rounded
                    bg-slate-200
                "
            />

        </div>
    );
};

export default SkeletonCard;