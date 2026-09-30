import {
    FaArrowTrendUp,
    FaTriangleExclamation,
    FaCircleInfo
} from "react-icons/fa6";

const ICONS = {
    success: FaArrowTrendUp,
    warning: FaTriangleExclamation,
    info: FaCircleInfo
};
const COLORS = {
    success: "bg-green-100 text-green-600",
    warning: "bg-amber-100 text-amber-600",
    info: "bg-blue-100 text-blue-600"
};

const InsightItem = ({ insight }) => {
    const Icon = ICONS[insight.type];

    return (
        <div className="flex items-start gap-4 py-4">
            <div
                className={`
                    flex h-10 w-10 items-center justify-center rounded-full
                    ${COLORS[insight.type]}
                    `}    
            >
                <Icon size={18} />
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-slate-800">
                    {insight.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    {insight.description}
                </p>
            </div>

        </div>
    );
};

export default InsightItem;