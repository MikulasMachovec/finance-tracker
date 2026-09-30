import BackgroundCard from "../ui/BackgroundCard";
import TransactionRow from "./TransactionRow";
import EmptyState from "../ui/EmptyState";
import TransactionSkeleton from "../ui/SkeletonCards/TransactionSkeleton";

const TransactionList = ({ 
    transactions,
    onEdit,
    onDelete
 }) => {

    // Emptystate
    if (transactions.length === 0) {
        return (
            <EmptyState
                title="No transactions found"
                description="Try changing your filters or add a new transaction."
            />
        );
    }


    return(
        <BackgroundCard
            title="Transactions"
        >
            
            {transactions.map(transaction => (
                <TransactionRow
                    key={transaction.transactionId}
                    transaction={transaction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

        </BackgroundCard>
    )
}
export default TransactionList;