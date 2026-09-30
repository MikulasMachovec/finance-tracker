import { useEffect, useState } from "react";
import useCategories from "../../hooks/useCategories";


const BudgetForm = ({
    initialData = {},
    onSubmit
}) => {

    const {
        categories, 
        loading
    } = useCategories();
    
    const [formData, setFormData] = useState({
        category: "",
        limitAmount: "",
        description: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

        setFormData({
            categoryId: initialData.categoryId || "",
            limitAmount: initialData.limitAmount || "",
            description: initialData.description || "",
        });

        setErrors({});

    }, [initialData.id]);


    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));


        setErrors(prev => ({
            ...prev,
            [name]: "",
        }));
    };


    const handleSubmit = (e) => {

        e.preventDefault();


        const validationErrors = {};


        if (!formData.categoryId) {
            validationErrors.categoryId =
                "Choose a category.";
        }


        if (Number(formData.limitAmount) <= 0) {
            validationErrors.limitAmount =
                "Budget must be greater than zero.";
        }


        if (Object.keys(validationErrors).length) {

            setErrors(validationErrors);
            return;

        }

        const now = new Date();

        onSubmit({
            ...formData,
            budgetId : initialData.budgetId || "",
            categoryId: Number(formData.categoryId),
            limitAmount: Number(formData.limitAmount),
            spent: initialData.spent ?? 0,
            month: now.getMonth() + 1,
            year: now.getFullYear(),
        });

    };

    return (
        <form
            id="budget-form"
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            {/* Category */}
            <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Category
                </label>


                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-2
                    "
                >

                    <option value="">
                        Select category
                    </option>


                    {categories.map(category => (

                        <option
                            key={category.categoryId}
                            value={category.categoryId}
                        >
                            {category.name}
                        </option>

                    ))}

                </select>


                {errors.categoryId && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.categoryId}
                    </p>
                )}

            </div>


            {/* Limit */}
            <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Monthly limit (€)
                </label>


                <input
                    type="number"
                    name="limitAmount"
                    min="0"
                    step="0.01"
                    value={formData.limitAmount}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-2
                    "
                />


                {errors.limitAmount && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.limitAmount}
                    </p>
                )}

            </div>


            {/* Description */}
            <div>

                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Description
                </label>


                <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-2
                    "
                />

            </div>


        </form>
    );
};
export default BudgetForm;