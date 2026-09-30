import {
    FaArrowTrendUp,
    FaCircleExclamation,
    FaPiggyBank,
    FaLightbulb,
} from "react-icons/fa6";

const FinancialRecommendations = ({ recommendations }) => {

    const getRecommendationStyle = (type) => {
        switch (type) {

            case "SUCCESS":
                return {
                    icon: FaPiggyBank,
                    color: "text-green-600",
                    bg: "bg-green-100",
                };

            case "SPENDING":
                return {
                    icon: FaArrowTrendUp,
                    color: "text-red-600",
                    bg: "bg-red-100",
                };

            case "WARNING":
                return {
                    icon: FaCircleExclamation,
                    color: "text-amber-600",
                    bg: "bg-amber-100",
                };

            case "INFO":
            default:
                return {
                    icon: FaLightbulb,
                    color: "text-blue-600",
                    bg: "bg-blue-100",
                };
        }
    }

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-800">
                Financial Insights
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Personalized observations based on your spending.
            </p>

            <div className="mt-6 space-y-4">

                {recommendations.map((recommendation, index) => {

                    const {
                        icon: Icon,
                        color,
                        bg
                    } = getRecommendationStyle(recommendation.type);

                    return (

                        <div
                            key={index}
                            className="
                                flex
                                items-start
                                gap-4
                                rounded-xl
                                border
                                border-slate-200
                                p-4
                            "
                        >

                            <div
                                className={`
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${bg}
                                `}
                            >
                                <Icon className={color} />
                            </div>

                            <div>

                                <h3 className="font-medium text-slate-800">
                                    {recommendation.title}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500">
                                    {recommendation.message}
                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>
    );
};

export default FinancialRecommendations;