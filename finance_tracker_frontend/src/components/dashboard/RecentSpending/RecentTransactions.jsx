import { NavLink } from "react-router-dom";
import BackgroundCard from "../../ui/BackgroundCard";
import TransactionItem from "./TransactionItem";

const RecentTransactions = ({ transactions }) => {

    const recentTransaction = [...transactions]
        .sort(
            (a, b) =>
                new Date(b.transactionDate) -
                new Date(a.transactionDate)
        )
        .slice(0, 5)

    return(
        <BackgroundCard
            title="Recent Transactions"
            subtitle="Latest activity"
            >
                <div className="divide-y divide-slate-100">
                    {recentTransaction.map(transaction => (
                        <TransactionItem
                            key={transaction.transactionId}
                            transaction={transaction}
                        />
                    ))}
                </div>

                <button
                    className="
                        mt-4
                        w-full
                        text-sm
                        font-medium
                        text-blue-600
                        hover:backgound-blue-700
                    "
                >
                    <NavLink
                        to="/transactions"
                    >
                        View all transactions →
                        </NavLink>
                    
                </button>
            </BackgroundCard>
    )
};
export default RecentTransactions;