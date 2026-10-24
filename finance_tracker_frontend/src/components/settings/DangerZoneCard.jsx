import { useState } from "react";
import BackgroundCard from "../ui/BackgroundCard";
import { FaDownload, FaTrash } from "react-icons/fa";
import Modal from "../ui/modal/Modal";
import Button from "../ui/Button";
import useUserSetting from "../../hooks/useUserSetting";
import toast from "react-hot-toast";
import { useSession } from "../../context/sessionProvider";
import ExportOptions from "../forms/ExportOptions";
import useExportData from "../../hooks/useExportData";

const DangerZoneCard = () => {

    const [ isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [ isExportModalOpen, setIsExportModalOpen] = useState(false)
    const [ exportOptions, setExportOptions] = useState({
        exportType: "transactions",
        fromDate: "",
        toDate: "",
    });

    const { 
        deleteUserAccount
    } = useUserSetting();

    const { 
        exportDataCsv, 
    } = useExportData();

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

    const handleExport = async () => {
        const { exportType, fromDate, toDate } = exportOptions
        
        if (exportType === "dateRange"){
            if (!fromDate || !toDate) {
                toast.error("Please select both dates.")
            }
        }

        if (fromDate > toDate) {
            toast.error("Start date must be before end date.");
            return;
        }

        console.log("Export options:", exportOptions);
        try {
            if (exportType === "transactions") {
                await exportDataCsv();
            } else if (exportType === "dateRange") {
                await exportDataCsv(fromDate,toDate)
                return;
            } else if (exportType === "categories" || exportType === "budgets") {
                toast.error("This export option is not available yet.");
                return;
            }
    
            setIsExportModalOpen(false);
        } catch (error) {
            console.error("Error exporting data:", error);
            toast.error("Failed to export data.");
        }
        
    };


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

                            <h3 className="font-semibold text-slate-800 dark:text-white">
                                Export Data
                            </h3>

                            <p className="text-sm text-slate-500">
                                Download your transactions, categories and budgets.
                            </p>

                        </div>

                    </div>

                    <button
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
                            dark:text-white
                            dark:hover:bg-slate-700
                        "
                        onClick={() => {
                            setIsExportModalOpen(prev => !prev)
                            setExportOptions({
                                exportType: "transactions",
                                fromDate: "",
                                toDate: "",
                            });
                        }}
                    >
                        Export
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
                        dark:bg-red-800
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

                            <h3 className="font-semibold text-red-700 dark:text-red-300">
                                Delete Account
                            </h3>

                            <p className="text-sm text-red-600 dark:text-red-300">
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
{/* Delete Modal */}
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

{/* Export Data modal */}
        <Modal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(prev => !prev)}
            title="What would you like to export?"
            footer={
                <>
                    <Button
                        onClick={()=>setIsExportModalOpen(prev => !prev)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="success"
                        onClick={() => handleExport()}
                    >
                        Export
                    </Button>
                </>
            }
        >
            <ExportOptions onChange={setExportOptions}/>
            
        </Modal>

        </BackgroundCard>
    );
};
export default DangerZoneCard;