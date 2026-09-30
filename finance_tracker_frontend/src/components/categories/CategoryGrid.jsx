import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ 
    categories,
    onEdit,
    onDelete
}) => {

    if (!categories.length) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <h3 className="text-lg font-semibold text-slate-700">
                    No categories found
                </h3>

                <p className="mt-2 text-slate-500">
                    Create your first category to start organizing your finances.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map(category => (
                <CategoryCard
                    key={category.categoryId}
                    category={category}
                    onEdit={() => onEdit(category)}
                    onDelete={() => onDelete(category)}
                />
            ))}
        </div>
    )
};
export default CategoryGrid;