import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../components/layout/PageHeader";
import CategoryFilter from "../components/categories/CategoryFilter";
import CategoryGrid from "../components/categories/CategoryGrid";
import Modal from "../components/ui/modal/Modal";
import CategoryForm from "../components/forms/CategoryForm";
import Button from "../components/ui/Button";
import useCategories from "../hooks/useCategories";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";

const Categories = () => {

    const [search, setSearch] = useState("");
    
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const {
        categories,
        loading,
        addCategory,
        editCategory,
        removeCategory
    } = useCategories();

    const filteredCategories = (categories ?? [])
        .filter(category =>
            category.name
                .toLowerCase()
                .includes(search.toLowerCase())
        )

    const handleAddCategory = async ( category ) => {
        
        await addCategory(category)

        setShowAddModal(false);

        toast.success(
            "Category created successfully"
        );
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setShowEditModal(true);
    };

    const handleUpdateCategory = async (updatedCategory) => {
        
        await editCategory(updatedCategory);
    
        setShowEditModal(false);
        setSelectedCategory(null);
        toast.success(
            "Category updated successfully"
        );
    };

    const handleDelete = (category) => {
        setSelectedCategory(category);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        await removeCategory(selectedCategory.id)
    
        setShowDeleteModal(false);
        setSelectedCategory(null);
        toast.success(
            "Category deleted"
        );
    };

    if(loading) {
        return <LoadingSpinner />
    }
  
    
    return (
        <>

            <PageHeader
                title="Categories"
                subtitle="Manage your spending categories."
                buttonText="Add Category"
                onButtonClick={() => setShowAddModal(true)}
            />

            <div className="space-y-6">
                <CategoryFilter
                    search={search}
                    setSearch={setSearch}
                />
                
                {!loading & categories.length === 0 ? (
                    
                    <EmptyState
                    title="No categories yet"
                    message="Create your first category to organize your expenses."
                    action={
                        <Button
                            onClick={() => setShowAddModal(true)}
                        >
                            Add Category
                        </Button>
                        }
                    />

                ) : (

                <CategoryGrid 
                    categories={filteredCategories}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            )}
            </div>

            

            {/* Add modal */}
            <Modal 
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Add Category"
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
                            form="category-form"
                            type="submit"
                        >
                            Save Category
                        </Button>
                    </>
                }
            >
                <CategoryForm 
                    onSubmit={handleAddCategory}
                />
            </Modal>

            {/* Edit modal */}
            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                }}
                title="Edit Category"
                size="md"
                footer={
                    <>
                        <Button
                            type="button"
                            onClick={() => {
                                setShowEditModal(false);
                                setSelectedCategory(null);
                            }}
                            variant="secondary"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            form="category-form"
                        >
                            Save Changes
                        </Button>
                    </>
                }
            >
                {selectedCategory && (
                    <CategoryForm
                        initialData={selectedCategory}
                        onSubmit={handleUpdateCategory}
                    />
                )}
            </Modal>

            {/* Delete modal */}
            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedCategory(null);
                }}
                title="Delete Category"
                size="sm"
                footer={
                    <>
                        <Button
                            type="button"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setSelectedCategory(null);
                            }}
                            variant="scondary"
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
                        Are you sure you want to delete this category?
                    </p>

                    {selectedCategory && (
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
                                    className="h-4 w-4 rounded-full"
                                    style={{
                                        backgroundColor: selectedCategory.color,
                                    }}
                                />

                                <p className="font-semibold">
                                    {selectedCategory.name}
                                </p>

                            </div>
                        </div>
                    )}

                    <p className="text-sm text-red-500">
                        This action cannot be undone.
                    </p>

                </div>
            </Modal>


        </>
    )
}
export default Categories;