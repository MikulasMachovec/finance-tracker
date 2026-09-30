import { useMemo } from "react";

const ITEM_PER_PAGE = 10;

export default function useFilteredTransaction({
    transactions,
    search,
    category,
    type,
    sortBy,
    currentPage
}) {
    
    const filteredTransactions = useMemo(() => {
        return [...transactions]
            .filter(transaction =>{
                const matchesSearch =
                    transaction.title
                        ?.toLowerCase()
                        .includes(search.toLowerCase());
                
                const matchesCategory =
                    category === "all" ||
                    transaction.categoryId === Number(category);
                
                const matchesType =
                    type === "all" ||
                    transaction.type === type.toUpperCase();

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesType
                );
            })
            .sort((a, b) => {
                switch (sortBy) {
                    
                    case "oldest":
                        return new Date(a.transactionDate) - new Date(b.transactionDate);

                    case "highest":
                        return b.amount - a.amount;

                    case "lowest":
                        return a.amount - b.amount;

                    case "az":
                        return a.title.localeCompare(b.title);

                    case "za":
                        return b.title.localeCompare(a.title);

                    default:
                        return new Date(b.transactionDate) - new Date(a.transactionDate);
                }

            });

    }, [
        transactions,
        search,
        category,
        type,
        sortBy,
    ]);

    const totalPages = Math.ceil(
        filteredTransactions.length / ITEM_PER_PAGE
    );

    const paginatedTransactions = useMemo(() => {
        const start = 
            (currentPage - 1) * ITEM_PER_PAGE;

        return filteredTransactions.slice(
            start,
            start + ITEM_PER_PAGE
        );
    },[
        filteredTransactions,
        currentPage
    ]);

    return{
        filteredTransactions,
        paginatedTransactions,
        totalPages
    };

}