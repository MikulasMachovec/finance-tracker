import { useState } from "react";
import BackgroundCard from "../ui/BackgroundCard";

const PreferencesCard = () => {
    
    const [preferences, setPreferences] = useState({
        currency: "EUR",
        dateFormat: "DD/MM/YYYY",
        language: "English",
    }) 

    const handleChange = (e) => {
        const { name, value } = e.target;

        setPreferences(prev => ({
            ...prev,
            [name]: value,
        }));
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
                        className="
                            w-full
                            rounded-xl
                            border border-slate-300
                            px-4 py-2
                            focus:border-blue-500
                            focus:outline-none
                        "
                    >
                        <option>EUR</option>
                        <option>USD</option>
                        <option>GBP</option>
                        <option>CZK</option>
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
                        className="
                            w-full
                            rounded-xl
                            border border-slate-300
                            px-4 py-2
                            focus:border-blue-500
                            focus:outline-none
                        "
                    >
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
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
                        className="
                            w-full
                            rounded-xl
                            border border-slate-300
                            px-4 py-2
                            focus:border-blue-500
                            focus:outline-none
                        "
                    >
                        <option>English</option>
                        <option>Slovak</option>
                        <option>Czech</option>
                    </select>
                </div>

                </div>
        </BackgroundCard>
    )
};
export default PreferencesCard;