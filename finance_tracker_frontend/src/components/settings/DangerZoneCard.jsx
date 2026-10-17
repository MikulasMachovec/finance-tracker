import { useState } from "react";
import BackgroundCard from "../ui/BackgroundCard";
import { FaDownload, FaTrash } from "react-icons/fa";
import Modal from "../ui/modal/Modal";
import Button from "../ui/Button";
import useUserSetting from "../../hooks/useUserSetting";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../context/sessionProvider";

const DangerZoneCard = () => {

    const [ isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const navigate = useNavigate();
    const { 
        deleteUserAccount
    } = useUserSetting();
    const { logout } = useSession();
    
    const handleDeleteAccount = async () => {
        try {
            await deleteUserAccount();
            logout();
            toast.success("Your account was deleted.")
        } catch (error) {
            console.log("Error deleting acc: ", error);
            toast.error("Error has occured")
        } 
        
    }

    return (
        <BackgroundCard
            title="Danger Zone"
            subtitle="These actions affect your account permanently."
        >

            <div className="space-y-6">

                {/* Export */}

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        rounded-xl
                        border
                        border-slate-200
                        p-5
                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-blue-100
                            "
                        >
                            <FaDownload className="text-blue-600" />
                        </div>

                        <div>

                            <h3 className="font-semibold text-slate-800">
                                Export Data
                            </h3>

                            <p className="text-sm text-slate-500">
                                Download your transactions, categories and budgets.
                            </p>

                        </div>

                    </div>

                    {/* <button
                        className="
                            rounded-xl
                            border
                            border-slate-300
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            transition
                            hover:bg-slate-100
                        "
                    >
                        Export
                    </button> */}

                    <button
                        disabled
                        className="
                            cursor-not-allowed
                            rounded-xl
                            bg-slate-100
                            px-5 py-2.5
                            text-sm font-medium
                            text-slate-500
                        "
                    >
                        Coming Soon
                    </button>

                </div>

                {/* Delete */}

                <div
                    className="
                        flex
                        flex-col
                        gap-4
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-5
                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-red-100
                            "
                        >
                            <FaTrash className="text-red-600" />
                        </div>

                        <div>

                            <h3 className="font-semibold text-red-700">
                                Delete Account
                            </h3>

                            <p className="text-sm text-red-600">
                                Permanently remove your account and all associated data.
                            </p>

                        </div>

                    </div>

                    <button
                        className="
                            rounded-xl
                            bg-red-600
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-red-700
                        "
                        onClick={() => setIsDeleteModalOpen(prev => !prev)}
                    >
                        Delete Account
                    </button>

                </div>

            </div>

            <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(prev => !prev)}
            title="Delete Account"
            footer={
                <>
                    <Button
                        onClick={()=>setIsDeleteModalOpen(prev => !prev)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={handleDeleteAccount}
                    >
                        Delete
                    </Button>
                </>
            }
        >
            <h1
                className="text-center"
            >
                Are you sure you want to delete your account?
            </h1>
            
        </Modal>

        </BackgroundCard>
    );
};
export default DangerZoneCard;