import { usePreferences } from "../../context/preferencesContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import DropdownMenu from "../ui/DropdownMenu";

const TransactionRow = ({ 
    transaction,
    onEdit,
    onDelete 
}) => {

    const { preferences } = usePreferences();

    const income = transaction.type === "INCOME"

    return(
        <div
            className="
                flex items-center justify-between
                border-b border-slate-100
                py-4
            "
        >
            <div>

                <p className="font-medium text-slate-800">
                    {transaction.title}
                </p>

                <p className="text-sm text-slate-500">
                    {transaction.categoryName}
                    {" • "}
                    {formatDate(transaction.transactionDate, preferences.dateFormat)}
                </p>

            </div>
            <div className="flex items-center gap-4">
                <p 
                    className={`
                        font-semibold
                        ${
                            income
                            ? "text-green-600"
                            : "text-red-500"
                        }
                    `}
                >
                    {income ? "+" : "-"}
                    {formatCurrency(
                        transaction.amount,
                        preferences.currency
                    )}
                </p>

                <DropdownMenu
                    onEdit={() => onEdit(transaction)}
                    onDelete={() => onDelete(transaction)}
                />
            </div>
        </div>
    )
}

export default TransactionRow;