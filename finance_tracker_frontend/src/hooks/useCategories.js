import { useEffect, useState } from "react";
import { 
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
 } from "../api/categoryApi";

export default function useCategories(){
    const [categories,setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (category) => {
        const created = await createCategory(category);

        setCategories(prev => [
            created,
            ...prev
        ]);
    };

    const editCategory = async (updatedCategory) => {
        const updated = 
            await updateCategory(
                updatedCategory.categoryId,
                updatedCategory
            );
        
        setCategories(prev => 
            prev.map(item =>
                item.categoryId === updated.categoryId
                ? updated
                : item
            )
        );
    };

    const removeCategory = async (id) => {
        await deleteCategory(id);

        setCategories(prev => 
            prev.filter(item => item.categoryId !== id)
        );
    };

    return {
        categories,
        loading,
        addCategory,
        editCategory,
        removeCategory,
        refresh: loadCategories,
    }
}