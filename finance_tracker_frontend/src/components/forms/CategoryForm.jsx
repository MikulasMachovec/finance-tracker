import { useEffect, useState } from "react";
import CATEGORY_COLORS from "../../constants/categoryColor";
import { FaCheck } from "react-icons/fa";

const DEFAULT_COLOR = "#3B82F6";

const CategoryForm = ({
    initialData = {},
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        color: DEFAULT_COLOR,
        description : "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData({
            name: initialData.name || "",
            color: initialData.color || DEFAULT_COLOR,
            description: initialData.description || "",
        });

        setErrors({});
    },[initialData.categoryId])

    const handleChange = (e) => {
        const { name, value } = e.target;

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

        if (!formData.name.trim()) {
            validationErrors.name = "Category name is required.";
        }

        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        onSubmit({
            ...formData,
            categoryId: initialData.categoryId,
        });
    };

    return (
        <form
            id="category-form"
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* Category name */}
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                    Category Name
                </label>

                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />

                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name}
                    </p>
                )}
            </div>

                {/* Category budget */}

            {/* Color */}
            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Color
                </label>

                <div className="flex flex-wrap gap-3">
                    {CATEGORY_COLORS.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() =>
                                setFormData(prev => ({
                                    ...prev,
                                    color,
                                }))
                            }
                            className={`
                                flex
                                items-center
                                justify-center
                                h-10
                                w-10
                                rounded-full
                                transition-all
                                duration-200
                                ${
                                    formData.color === color
                                        ? "ring-4 ring-blue-200 scale-110"
                                        : "hover:scale-105"
                                }
                            `}
                            style={{
                                backgroundColor: color,
                            }}
                        >
                            {formData.color === color && (
                                <FaCheck className="mx-auto text-xs text-white" />
                            )}
                        </button>
                    ))}
                </div>
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
                    className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2"
                />
            </div>

            <button type="submit" hidden />

        </form>
    )

};
export default CategoryForm;