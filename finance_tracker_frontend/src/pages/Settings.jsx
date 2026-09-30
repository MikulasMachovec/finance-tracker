import PageHeader from "../components/layout/PageHeader";
import ProfileCard from "../components/settings/ProfileCard";
import PreferencesCard from "../components/settings/PreferencesCard";
import NotificationCard from "../components/settings/NotificationCard";
import SecurityCard from "../components/settings/SecurityCard";
import DangerZoneCard from "../components/settings/DangerZoneCard";

import useUserSetting from "../hooks/useUserSetting";

const Settings = () => {

    const { 
        user,
        editUserProfile
     } = useUserSetting();  

    return(
        <>
            <PageHeader
                title="Settings"
                subtitle="Manage your account and application preferences."
            />
            
            <div className="space-y-6">
                <ProfileCard 
                    user={user} 
                    editUserProfile={editUserProfile}
                    />

                <PreferencesCard />

                <NotificationCard />

                <SecurityCard />

                <DangerZoneCard />
            </div>
        </>
    )
};
export default Settings;