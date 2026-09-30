import { FaLock, FaShieldAlt } from "react-icons/fa";
import BackgroundCard from "../ui/BackgroundCard";

const SecurityCard = () => {

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

                            <h3 className="font-medium text-slate-800">
                                Password
                            </h3>

                            <p className="text-sm text-slate-500">
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
                        "
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

                            <h3 className="font-medium text-slate-800">
                                Two-Factor Authentication
                            </h3>

                            <p className="text-sm text-slate-500">
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
                        "
                    >
                        Coming Soon
                    </button>

                </div>

            </div>

        </BackgroundCard>
    );

};
export default SecurityCard;