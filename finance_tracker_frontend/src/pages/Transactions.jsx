import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import TransactionList from "../components/transactions/TransactionList";
import TransactionFilter from "../components/transactions/TransactionFilter";
import Modal from "../components/ui/modal/Modal";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import TransactionForm from "../components/forms/TransactionForm";
import Pagination from "../components/ui/Pagination";
import Button from "../components/ui/Button";
import useTransaction from "../hooks/useTransaction";
import useFilteredTransaction from "../hooks/useFilteredTransactions";

const Transaction = () => {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [type, setType] = useState("all");
    const [sortBy, setSortBy] = useState("newest")
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const {
        transactions,
        loading,
        addTransaction,
        editTransaction,
        removeTransaction
    } = useTransaction();
    
    const {
        paginatedTransactions,
        totalPages
    } = useFilteredTransaction({
        transactions,
        search,
        category,
        type,
        sortBy,
        currentPage,
    });
    
    const handleAddTransaction = async ( transaction ) =>{
        
        await addTransaction(transaction)

        setShowAddModal(false);

        toast.success(
            "Transaction created successfully"
        );
    }

    const handleEdit = (transaction) => {
        setSelectedTransaction(transaction);
        setShowEditModal(true);
    };

    const handleDelete = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDeleteModal(true);
    }

    const handleUpdateTransaction = async (updatedTransaction) => {
        console.log("selected" + selectedTransaction)
        console.log(updatedTransaction)
        
        await editTransaction(updatedTransaction);

        setShowEditModal(false);
        setSelectedTransaction(null);

        toast.success(
            "Transaction updated successfully"
        );
    };

    const handleConfirmDelete = async () => {
                
        await removeTransaction(selectedTransaction.transactionId)

        setShowDeleteModal(false);
        setSelectedTransaction(null);

        toast.success(
            "Transaction deleted"
        );
    };

    if(loading) {
        return <LoadingSpinner />
    }

    return(
        <>
            <PageHeader
                title="Transactions"
                subtitle="Manage your income and expeses."
                buttonText="Add transaction"
                onButtonClick={() => setShowAddModal(true)}
            />

            <div className="space-y-6">
                <TransactionFilter 
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    type={type}
                    setType={setType}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {!loading && transactions.length === 0?(
                    <EmptyState
                        title="No transactions found"
                        message="Try changing your filters or add a new transaction."
                    />
                ):(
                    <TransactionList 
                        transactions={paginatedTransactions}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}

                

                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Add transaction modal */}
            <Modal 
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Add Transaction"
                size="lg"
                footer={
                    <>
                        <Button
                            type="button"
                            onClick={() => setShowAddModal(false)}
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="transaction-form"
                        >
                            Save Transaction
                        </Button>
                    
                    </>
                }
            >
                <TransactionForm
                    onSubmit={handleAddTransaction}
                />
            </Modal>

            {/* Edit transaction modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedTransaction(null);
                }}
                title="Edit Transaction"
                size="lg"
                footer={
                    <>
                        <Button
                            type="button"
                            onClick={() => {
                                setShowEditModal(false);
                                setSelectedTransaction(null);
                            }}
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="transaction-form"
                        >
                            Save Changes
                        </Button>
                    </>
                }
                >
                    {selectedTransaction && (
                        <TransactionForm
                            initialData={selectedTransaction}
                            onSubmit={handleUpdateTransaction}
                        />
                    )}
            </Modal>

            {/* Delete transaction modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedTransaction(null);
                }}
                title="Delete Transaction"
                size="sm"
                footer={
                    <>
                        <Button
                            type="button"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setSelectedTransaction(null);
                            }}
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={handleConfirmDelete}
                            variant="danger"
                        >
                            Delete
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">

                    <p className="text-slate-700">
                        Are you sure you want to delete this transaction?
                    </p>

                    {selectedTransaction && (
                        <div
                            className="
                                rounded-xl
                                border border-slate-200
                                bg-slate-50
                                p-4
                            "
                        >
                            <p className="font-semibold">
                                {selectedTransaction.title}
                            </p>

                            <p className="text-sm text-slate-500">
                                {selectedTransaction.category}
                            </p>

                            <p className="mt-2 text-sm font-medium">
                                €{selectedTransaction.amount.toLocaleString()}
                            </p>
                        </div>
                    )}

                    <p className="text-sm text-red-500">
                        This action cannot be undone.
                    </p>

                </div>
            </Modal>


        </>
    )
};
export default Transaction;