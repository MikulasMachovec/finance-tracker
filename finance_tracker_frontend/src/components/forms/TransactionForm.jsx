import { useEffect, useState } from "react";
import TRANSACTION_TYPES from "../../constants/transactionType";
import useCategories from "../../hooks/useCategories";

const TransactionForm = ({ 
    onSubmit, 
    initialData = {} 
}) => {

    const {
            categories, 
            loading
        } = useCategories();
        
    const [formData, setFormData] = useState({
        title: initialData.title || "",
        amount: initialData.amount || "",
        categoryId: initialData.categoryId || "",
        type: initialData.type || TRANSACTION_TYPES.EXPENSE,
        transactionDate:
            initialData.transactionDate ||
            new Date().toISOString().split("T")[0],
        description: initialData.description || "",
    })

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "type" && value === TRANSACTION_TYPES.INCOME
                ? {categoryId: ""}
                : {}
            )
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Fields validation
        const validationErrors = {};

        if (!formData.title.trim()) {
            validationErrors.title = "Title is required.";
        }
    
        if (formData.amount <= 0) {
            validationErrors.amount = "Amount must be greater than zero.";
        }
    
        if (
            formData.type === TRANSACTION_TYPES.EXPENSE &&
            !formData.categoryId
        ) {
            validationErrors.categoryId = "Choose a category.";
        }
    
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        onSubmit({
            ...formData,
            transactionId: initialData.transactionId || "",
            amount: Number(formData.amount),
            categoryId: Number(formData.categoryId)
        });

    };

    useEffect(()=> {
        setFormData({
            title: initialData.title || "",
            amount: initialData.amount || "",
            categoryId: initialData.categoryId || "",
            type: initialData.type || TRANSACTION_TYPES.EXPENSE,
            transactionDate:
                initialData.date ||
                new Date().toISOString().split("T")[0],
            description: initialData.description || "",
        })
    }, [initialData.id])

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
            id="transaction-form"
        >
            {/* Title */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="
                        w-full
                        rounded-xl
                        border border-slate-300
                        px-4 py-2
                        focus:border-blue-500
                        focus:outline-none
                    "
                />

                {errors.title && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.title}
                    </p>
                )}

            </div>

            {/* Amount */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Amount (€)
                </label>

                <input
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="
                        w-full
                        rounded-xl
                        border border-slate-300
                        px-4 py-2
                        focus:border-blue-500
                        focus:outline-none
                    "
                />

                {errors.amount && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.amount}
                    </p>
                )}

            </div>

            {/* Category + Type */}
            <div className="grid grid-cols-2 gap-4">

            <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Type
                    </label>

                    <select
                        name="type"
                        value={formData.type}
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
                        <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
                        <option value={TRANSACTION_TYPES.INCOME}>Income</option>
                    </select>

                </div>
                {formData.type === TRANSACTION_TYPES.EXPENSE && (
                    <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                        Category
                    </label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        required
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-300
                            px-4
                            py-2
                        "
                    >
                        <option value="">Select category</option>
                        {categories.map((category) => (
                            <option
                                key={category.categoryId}
                                value={category.categoryId}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {errors.category && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.category}
                        </p>
                    )}

                </div>
                )}
                

                
            </div>

            {/* Date */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Date
                </label>
                
                <input
                    name="transactionDate"
                    type="date"
                    value={formData.transactionDate}
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

            </div>

            {/* Description */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Description
                </label>

                <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-2
                        resize-none
                    "
                />

            </div>

            <button type="submit" hidden />

        </form>
    )


};
export default TransactionForm;