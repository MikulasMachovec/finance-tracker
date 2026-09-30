import { useEffect, useState } from "react";
import {
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
} from "../api/budgetApi";

export default function useBudget(){
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBudgets();
    },[]);

    const loadBudgets = async () => {
        try{
            const data = await getBudgets();

            setBudgets(data);

        }finally{
            setLoading(false);
        }
    };

    const addBudget = async (budget) => {
        const created = await createBudget(budget);

        setBudgets(prev => [
            created,
            ...prev
        ]);
    };

    const editBudget = async (updatedBudget) => {
        const updated = 
            await updateBudget(
                updatedBudget.budgetId,
                updatedBudget
            )
        
            setBudgets(prev => 
                prev.map(item => 
                    item.budgetId === updated.budgetId
                    ? updated
                    : item
                )
            );
    };

    const removeBudget = async (id) => {
        await deleteBudget(id);
        setBudgets(prev =>
            prev.filter(item => item.budgetId !== id)
        )
    };

    return {
        budgets,
        loading,
        addBudget,
        editBudget,
        removeBudget,
        refresh: loadBudgets,
    };


}