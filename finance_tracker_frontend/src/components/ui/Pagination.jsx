const Pagination = ({
    currentPage,
    totalPages,
    onPageChange
}) => {
    if (totalPages <= 1) return null;
    return(
        <div className="mt-6 flex items-center justify-between">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="
                    rounded-lg
                    border border-slate-300
                    px-4 py-2
                    text-sm font-medium
                    transition
                    hover:bg-slate-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                Previous
            </button>

            <div className="flex items-center gap-2">

                {Array.from(
                    { length: totalPages },
                    (_, index) => {
                        const page = index + 1;

                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`
                                    h-10 w-10 rounded-lg
                                    text-sm font-medium
                                    transition
                                    ${
                                        currentPage === page
                                            ? "bg-blue-600 text-white"
                                            : "border border-slate-300 hover:bg-slate-100"
                                    }
                                `}
                            >
                                {page}
                            </button>
                        );
                    }
                )}

            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="
                    rounded-lg
                    border border-slate-300
                    px-4 py-2
                    text-sm font-medium
                    transition
                    hover:bg-slate-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                Next
            </button>
        </div>
    )
};
export default Pagination;