import { useState } from "react";
import PageHeader from "../components/layout/PageHeader";
import BudgetSummary from "../components/budgets/BudgetSummary";
import Modal from "../components/ui/modal/Modal";
import toast from "react-hot-toast";

import BudgetList from "../components/budgets/BudgetList";
import BudgetForm from "../components/forms/BudgetForm";
import BudgetFilter from "../components/budgets/BudgetFilter";
import Button from "../components/ui/Button";
import useBudget from "../hooks/useBudgets";
import EmptyState from "../components/ui/EmptyState";

const Budgets = () => {

    const [selectedBudget, setSelectedBudget] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [search,setSearch] = useState("");

    const {
        budgets,
        loading,
        addBudget,
        editBudget,
        removeBudget,
    } = useBudget();

     // ADD

     const handleAddBudget = async (budget) => {
        

        await addBudget(budget);

        setShowAddModal(false);
        toast.success(
            "Budget created successfully"
        );
    };

    // EDIT

    const handleEdit = (budget) => {

        setSelectedBudget(budget);
        setShowEditModal(true);

    };


    const handleUpdateBudget = async (updatedBudget) => {
        console.log(selectedBudget)
        console.log(updatedBudget)
        await editBudget(updatedBudget)


        setShowEditModal(false);
        setSelectedBudget(null);

        toast.success(
            "Budget updated successfully"
        );
    };

    // DELETE

    const handleDelete = (budget) => {

        setSelectedBudget(budget);
        setShowDeleteModal(true);

    };

    const handleConfirmDelete = async() => {

        await removeBudget(selectedBudget.budgetId)

        setShowDeleteModal(false);
        setSelectedBudget(null);

        toast.success(
            "Budget deleted"
        );

    };
    const filteredBudgets = budgets.filter(
        budget =>
            budget.categoryName
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return(
        <>
            <PageHeader
                title="Budgets"
                subtitle="Manage your monthly budgets."
                buttonText="Add Budget"
                onButtonClick={() => setShowAddModal(true)}
            />

            <div className="space-y-6">

                <BudgetSummary 
                    budgets={budgets}
                />

                <BudgetFilter
                    search={search}
                    setSearch={setSearch}
                />

                {budgets.length === 0 ? (
                    <EmptyState
                        title="No budgets created"
                        message="Create a budget to start tracking your spending."
                        action={
                            <Button
                                onClick={() => setShowAddModal(true)}
                            >
                                Add Budget
                            </Button>
                            }
                    />
                ) : (
                    <BudgetList 
                    budgets={filteredBudgets}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                )}

                
            </div>

            {/* Add Budget Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Add Budget"
                size="md"
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
                            form="budget-form"
                        >
                            Save Budget
                        </Button>
                    </>
                }
            >
                <BudgetForm
                    onSubmit={handleAddBudget}
                />
            </Modal>

            {/* Edit Budget Modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedBudget(null);
                }}
                title="Edit Budget"
                size="md"
                footer={
                    <>
                        <Button
                            type="button"
                            onClick={() => {
                                setShowEditModal(false);
                                setSelectedBudget(null);
                            }}
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="budget-form"
                        >
                            Save Changes
                        </Button>
                    </>
                }
            >
                {selectedBudget && (
                    <BudgetForm
                        initialData={selectedBudget}
                        onSubmit={handleUpdateBudget}
                    />
                )}

            </Modal>
            
            {/* Delete Budget Modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedBudget(null);
                }}
                title="Delete Budget"
                size="sm"
                footer={
                    <>
                        <Button
                            type="button"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setSelectedBudget(null);
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
                        Are you sure you want to delete this budget?
                    </p>


                    {selectedBudget && (
                        <div
                            className="
                                rounded-xl
                                border border-slate-200
                                bg-slate-50
                                p-4
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        h-4
                                        w-4
                                        rounded-full
                                    "
                                    style={{
                                        backgroundColor: selectedBudget.color
                                    }}
                                />

                                <p className="font-semibold">
                                    {selectedBudget.category}
                                </p>

                            </div>


                            <p className="mt-2 text-sm text-slate-500">
                                €{selectedBudget.limitAmount.toLocaleString()} monthly limit
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
export default Budgets;