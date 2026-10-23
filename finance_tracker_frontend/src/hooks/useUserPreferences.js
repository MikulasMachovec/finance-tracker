import { useEffect, useState,useCallback } from "react";
import { getUserPreferences, updateUserPreferences } from "../api/userApi";

const DEFAULT_PREFERENCES = {
    dateFormat: "dd/MM/yyyy",
    currency: "EUR",
    language: "en",
};

export default function useUserPreferences(){
    const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const loadPreferences = useCallback(async () => {
        setLoading(true);

        try {
            const data = await getUserPreferences();

            setPreferences({
                ...DEFAULT_PREFERENCES,
                ...data,
            });
        } catch (error) {
            console.error("Failed to load preferences:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(()=> {
        loadPreferences()
    },[loadPreferences])

    const savePreferences = async (nextPreferences) => {
        setSaving(true)

        try{
            const saved = await updateUserPreferences(nextPreferences);

            setPreferences({
                ...DEFAULT_PREFERENCES,
                ...saved,
            });

            return saved;
        } finally {
            setSaving(false);
        }
    };

    return {
        preferences,
        setPreferences,
        loading,
        saving,
        savePreferences,
        reloadPreferences: loadPreferences,
    };
}