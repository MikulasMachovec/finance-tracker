import { FaSearch } from "react-icons/fa";
import useCategories from "../../hooks/useCategories";


const TransactionFilter = ({
    search,
    setSearch,
    category,
    setCategory,
    type,
    setType,
    sortBy,
    setSortBy
}) => {

    const {
            categories, 
            loading
        } = useCategories();

    return(
        <div
            className="
                frounded-2xl
                border border-slate-200
                bg-white
                p-5
                space-y-4
            "
        >
            {/* Search */}
            <div className="relative">
                <FaSearch
                    className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    "
                />

                <input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search transaction..."
                    className="
                        w-full
                        rounded-xl
                        border border-slate-200
                        py-2 pl-10 pr-4
                        outline-none
                        focus:border-blue-500
                    "
                />
            </div>

            <div 
                className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-3
                "
            >            

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="
                        rounded-xl
                        border border-slate-200
                        px-4 py-2
                        text-slate-600
                    "
                >
                    <option value="all">
                        All categories
                    </option>

                    {categories.map((category) => (
                        <option
                            key={category.categoryId}
                            value={category.categoryId}
                        >
                            {category.name}
                        </option>
                    ))}

                </select>

                {/* Type */}
                <select
                    value={type}
                    onChange={(e)=>setType(e.target.value)}
                    className="
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-2
                        text-slate-600
                    "
                >

                    <option value="all">
                        All types
                    </option>

                    <option value="Income">
                        Income
                    </option>

                    <option value="Expense">
                        Expense
                    </option>

                </select>
                {/* Filters */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="
                        rounded-xl
                        border
                        border-slate-200
                        px-4
                        py-2
                        text-slate-600"
                >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="highest">Highest amount</option>
                    <option value="lowest">Lowest amount</option>
                    <option value="az">Title A-Z</option>
                    <option value="za">Title Z-A</option>
                </select>

            </div>

        </div>
    )
}
export default TransactionFilter;