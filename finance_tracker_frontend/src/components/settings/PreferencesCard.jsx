import { useEffect, useState } from "react";
import BackgroundCard from "../ui/BackgroundCard";
import useUserPreferences from "../../hooks/useUserPreferences";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const DEFAULT_PREFERENCES = {
    currency: "EUR",
    dateFormat: "dd/MM/yyyy",
    language: "en",
};

const PreferencesCard = () => {
    
    const {
        preferences,
        setPreferences,
        loading,
        saving,
        savePreferences,
    } = useUserPreferences();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPreferences(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await savePreferences(preferences);
            toast.success("Preferences saved successfully.");
        } catch (error) {
            console.error("Failed to save preferences:", error);
            toast.error("Could not save preferences.");
        }
    };

    return(
        <BackgroundCard
            title="Preferences"
            subtitle="Customize your application."
        >
            <div className="grid gap-5 md:grid-cols-3">

                {/* Currency */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Currency
                    </label>

                    <select
                        name="currency"
                        value={preferences.currency}
                        onChange={handleChange}
                        disabled={saving}
                        className="
                            w-full
                            rounded-xl
                            border border-slate-300
                            px-4 py-2
                            focus:border-blue-500
                            focus:outline-none
                        "
                    >
                        <option value="EUR">EUR (€)</option>
                        <option value="USD">USD ($)</option>
                    </select>
                </div>

                {/* Date format */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Date Format
                    </label>

                    <select
                        name="dateFormat"
                        value={preferences.dateFormat}
                        onChange={handleChange}
                        disabled={saving}
                        className="
                            w-full
                            rounded-xl
                            border border-slate-300
                            px-4 py-2
                            focus:border-blue-500
                            focus:outline-none
                        "
                    >
                        <option value="dd/MM/yyyy">
                            DD/MM/YYYY
                        </option>
                        <option value="MM/dd/yyyy">
                            MM/DD/YYYY
                        </option>
                        <option value="yyyy-MM-dd">
                            YYYY-MM-DD
                        </option>
                    </select>
                </div>

                {/* Language */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Language
                    </label>

                    <select
                        name="language"
                        value={preferences.language}
                        onChange={handleChange}
                        disabled={saving}
                        className="
                            w-full
                            rounded-xl
                            border border-slate-300
                            px-4 py-2
                            focus:border-blue-500
                            focus:outline-none
                        "
                    >
                        <option value="en">English</option>
                        <option value="sk">Slovak</option>
                    </select>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                        <Button
                            onClick={() => handleSave()}
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save preferences"}
                        </Button>
                    </div>

        </BackgroundCard>
    )
};
export default PreferencesCard;