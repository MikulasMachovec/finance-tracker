import { useEffect, useState } from "react";
import { 
    getTransactions, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction
} from "../api/transactionApi";

export default function useTransaction() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        loadTransaction();
    },[])

    const loadTransaction = async () => {
        try {
            const data = await getTransactions();

            setTransactions(data);

        } finally {
            setLoading(false);
        }
    };

    const addTransaction = async (transaction) =>{
        const created = await createTransaction(transaction);

        setTransactions(prev => [
            created,
            ...prev
        ]);
    };

    const editTransaction = async (updatedTransaction) => {

        const updated =
            await updateTransaction(
                updatedTransaction.transactionId,
                updatedTransaction
            );
    
        setTransactions(prev =>
            prev.map(item =>
                item.transactionId === updated.transactionId
                    ? updated
                    : item
            )
        );
    };

    const removeTransaction = async (id) => {

        await deleteTransaction(id);
    
        setTransactions(prev =>
            prev.filter(item => item.transactionId !== id)
        );
    };

    return {
        transactions,
        loading,
        addTransaction,
        editTransaction,
        removeTransaction,
        refresh: loadTransaction,
    };


}