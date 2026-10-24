import { usePreferences } from "../../../context/preferencesContext";
import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "../../../utils/formatDate";

const TransactionItem = ({ transaction }) => {

    const { preferences } = usePreferences();

    const isIncome = transaction.type === "INCOME";  

    return (
        <div className="flex items-center justify-between py-3">
            <div>
                <p className="font-medium text-slate-800">
                    {transaction.title}
                </p>

                <p className="text-sm text-slate-800">
                    {transaction.categoryName} • {formatDate(transaction.transactionDate, preferences.dateFormat)}
                </p>

            </div>

            <span
                className={`
                    font-semibold
                    ${
                        isIncome
                        ? "text-green-600"
                        : " text-red-500"
                    }
                `}
            >
                {isIncome ? "+" : "-"}
                {formatCurrency(
                    Math.abs(transaction.amount),
                    preferences.currency
                )}
            </span>

        </div>
    )
};

export default TransactionItem;