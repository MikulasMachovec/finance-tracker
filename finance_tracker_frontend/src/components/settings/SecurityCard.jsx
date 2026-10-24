import { FaLock, FaShieldAlt } from "react-icons/fa";
import BackgroundCard from "../ui/BackgroundCard";
import { useState } from "react";
import toast from "react-hot-toast";
import PasswordChangeForm from "../forms/PasswordChangeForm";
import Modal from "../ui/modal/Modal";
import Button from "../ui/Button";
import useUserSetting from "../../hooks/useUserSetting";

const SecurityCard = () => {

    const [ showChangePasswordModal , setShowChangePasswordModal] = useState(false)

    const { 
        updateUserPassword
    } = useUserSetting();

    const handlePasswordUpdate = async (formData) => {
        
        try {
            await updateUserPassword(formData)
            toast.success("Password updated successfully")
            setShowChangePasswordModal(false)
        } catch (error) {
            console.log("Error updating password: ", error);
            toast.error("Failed to update password")
        } 
    }

    return (
        <BackgroundCard
            title="Security"
            subtitle="Manage your account security."
        >

            <div className="space-y-6">

                {/* Password */}
                <div
                    className="
                        flex flex-col gap-4
                        rounded-xl
                        border border-slate-200
                        p-4
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
                            <FaLock className="text-blue-600" />
                        </div>

                        <div>

                            <h3 className="font-medium text-slate-800 dark:text-white">
                                Password
                            </h3>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                ••••••••••••
                            </p>

                        </div>

                    </div>

                    <button
                        className="
                            rounded-xl
                            border border-slate-300
                            px-5 py-2.5
                            text-sm font-medium
                            transition-colors
                            hover:bg-slate-100
                            dark:text-white
                            dark:hover:bg-slate-700
                        "
                        onClick={() => setShowChangePasswordModal(prev => !prev)}
                    >
                        Change Password
                    </button>

                </div>

                {/* Two Factor */}
                <div
                    className="
                        flex flex-col gap-4
                        rounded-xl
                        border border-slate-200
                        p-4
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
                                bg-green-100
                            "
                        >
                            <FaShieldAlt className="text-green-600" />
                        </div>

                        <div>

                            <h3 className="font-medium text-slate-800 dark:text-white">
                                Two-Factor Authentication
                            </h3>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Add an extra layer of protection.
                            </p>

                        </div>

                    </div>

                    <button
                        disabled
                        className="
                            cursor-not-allowed
                            rounded-xl
                            bg-slate-100
                            px-5 py-2.5
                            text-sm font-medium
                            text-slate-500
                            dark:bg-slate-700
                            dark:text-slate-500
                        "
                    >
                        Coming Soon
                    </button>

                </div>

            </div>

            <Modal
            isOpen={showChangePasswordModal}
            onClose={() => setShowChangePasswordModal(prev => !prev)}
            title="Change password"
            footer={
                <>
                    <Button
                        onClick={()=>setShowChangePasswordModal(prev => !prev)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        form="change-password-form"
                    >
                        Save
                    </Button>
                </>
            }
        >
            <PasswordChangeForm
                onSubmit={handlePasswordUpdate}
            />
        </Modal>

        </BackgroundCard>
    );

};
export default SecurityCard;