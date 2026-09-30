import { FaSearch } from "react-icons/fa";

const BudgetFilter = ({
    search,
    setSearch
}) => {
    return(
        <div
            className="
                rounded-2xl
                border border-slate-200
                bg-white
                p-5
            "
        >
            <div className="relative">

                <FaSearch
                    className="absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    "
                />

                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search budget..."
                    className="
                        w-full
                        rounded-xl
                        border border-slate-200
                        py-2
                        pl-10
                        pr-4
                        outline-none
                        focus:border-blue-500
                    "
                />

            </div>

        </div>
    )
};
export default BudgetFilter;