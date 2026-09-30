import { cache, useState } from "react";
import { FaCamera } from "react-icons/fa";
import BackgroundCard from "../ui/BackgroundCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/modal/Modal";
import Button from "../ui/Button";
import EditProfileForm from "../forms/EditProfileForm";
import toast from "react-hot-toast";
import useUserSetting from "../../hooks/useUserSetting";

const ProfileCard = ({
    user, 
    editUserProfile
}) => {

    const [ showRenameModal, setShowRenameModal] = useState(false);

    if (!user) {
        return (
            <BackgroundCard>
                <LoadingSpinner />
            </BackgroundCard>
        )
    }
    
    const handleUpdateProfile = async (updatedProfile) =>{
        try {
            await editUserProfile(updatedProfile)
            toast.success("Profile updated successfully")
        } catch (error) {

            console.log("Error has occured: ", error);
            toast.error("Error has occured")
        } finally {
            setShowRenameModal(false)
        }   
        
    }

    return (
        <>
        <BackgroundCard
            title="Profile"
            subtitle="Manage your personal information"
        >
            <div 
                className="
                    flex flex-col
                    gap-6
                    md:flex-row md:items-center md:justify-between
                "
            >
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src="https://i.pravatar.cc/120"
                            alt="Profile"
                            className="h-20 w-20 rounded-full object-cover"
                        />
                        <button 
                            className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white 
                            shadow-md transition hover:bg-blue-700"
                        >
                            <FaCamera className="text-xs" />        
                        </button>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            {user.firstName} {user.lastName}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {user.email}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Finance Tracker user since {new Date(user.createdAt).getFullYear()}
                        </p>

                    </div>

                </div>

                <button
                    className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={()=> setShowRenameModal(prev => !prev)}
                >
                    Edit Profile
                </button>


            </div>


        </BackgroundCard>

        <Modal
            isOpen={showRenameModal}
            onClose={() => setShowRenameModal(prev => !prev)}
            title="Edit profile"
            footer={
                <>
                    <Button
                        onClick={()=>setShowRenameModal(prev => !prev)}
                        variant="secondary"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        form="rename-form"
                    >
                        Save
                    </Button>
                </>
            }
        >
            <EditProfileForm 
                data={user}
                onSubmit={handleUpdateProfile}
            />
        </Modal>
    </>
    )
};
export default ProfileCard;