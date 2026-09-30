import { useEffect, useState } from "react";

import { getCurrentUser, updateUserProfile } from "../api/userApi";

export default function useUserSetting(){

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        loadUser();
    },[]);

    const loadUser = async () => {
        try{
            const data = await getCurrentUser();
            setUser(data);
        } finally {
            setLoading(false)
        }
    };

    const editUserProfile = async (updatedUserProfile) => {
        
        const updated = 
            await updateUserProfile(updatedUserProfile)
            
        setUser(updated)
    };

    const editUserPassword = async (updatedPassword) => {
        // TODO editUserPassword
        return;
    }

    const deleteUserAccount = async (updatedPassword) => {
        // TODO deleteUserAccount
        return;
    }

    return{
        user,
        loading,
        loadUser,
        editUserProfile
    }

}