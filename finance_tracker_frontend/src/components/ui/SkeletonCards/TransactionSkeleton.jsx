const TransactionSkeleton = () => {

    return (
        <div
            className="
                flex
                justify-between
                border-b
                border-slate-100
                py-4
                animate-pulse
            "
        >

            <div className="space-y-2">

                <div
                    className="
                        h-4
                        w-40
                        rounded
                        bg-slate-200
                    "
                />

                <div
                    className="
                        h-3
                        w-28
                        rounded
                        bg-slate-200
                    "
                />

            </div>


            <div
                className="
                    h-5
                    w-20
                    rounded
                    bg-slate-200
                "
            />

        </div>
    )
}

export default TransactionSkeleton;