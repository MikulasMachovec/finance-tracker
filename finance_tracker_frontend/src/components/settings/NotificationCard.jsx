import { useState } from "react";
import BackgroundCard from "../ui/BackgroundCard";

const NotificationCard = () => {
    const [settings, setSettings] = useState({
        budgetAlerts: true,
        monthlySummary: true,
        emailNotifications: false,
    });

    const toggle = (key) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const options = [
        {
            key: "budgetAlerts",
            title: "Budget Alerts",
            description:
                "Receive a warning when you're close to your monthly budget.",
        },
        {
            key: "monthlySummary",
            title: "Monthly Summary",
            description:
                "Receive a summary of your spending every month.",
        },
        {
            key: "emailNotifications",
            title: "Email Notifications",
            description:
                "Receive notifications by email.",
        },
    ];

    return (
        <BackgroundCard
            title="Notifications"
            subtitle="Manage reminders and alerts."
        >

            <div className="space-y-5">

                {options.map(option => (

                    <div
                        key={option.key}
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            border
                            border-slate-200
                            p-4
                        "
                    >

                        <div>

                            <h3 className="font-medium text-slate-800">
                                {option.title}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                {option.description}
                            </p>

                        </div>

                        <input
                            type="checkbox"
                            checked={settings[option.key]}
                            onChange={() => toggle(option.key)}
                            className="
                                h-5
                                w-5
                                accent-blue-600
                            "
                        />

                    </div>

                ))}

            </div>

        </BackgroundCard>
    );

};
export default NotificationCard;