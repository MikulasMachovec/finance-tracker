const TransactionItem = ({ transaction }) => {

    const isIncome = transaction.type === "INCOME";  

    return (
        <div className="flex items-center justify-between py-3">
            <div>
                <p className="font-medium text-slate-800">
                    {transaction.title}
                </p>

                <p className="text-sm text-slate-800">
                    {transaction.categoryName} • {transaction.transactionDate}
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
                €{Math.abs(transaction.amount).toLocaleString()}
            </span>

        </div>
    )
};

export default TransactionItem;