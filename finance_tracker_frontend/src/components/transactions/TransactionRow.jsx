import DropdownMenu from "../ui/DropdownMenu";

const TransactionRow = ({ 
    transaction,
    onEdit,
    onDelete 
}) => {

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
                    {transaction.transactionDate}
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
                    {transaction.amount.toLocaleString()} €
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