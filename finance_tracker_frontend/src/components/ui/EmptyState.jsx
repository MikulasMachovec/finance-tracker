import { FaInbox } from "react-icons/fa";

const EmptyState = ({
    title = "Nothing here yet",
    message = "There is no data to display.",
    action,
    icon: Icon = FaInbox
}) => {
    return(
        <div className="
            flex flex-col items-center
            justify-center
            rounded-2xl
            border border-dashed border-slate-300
            bg-white
            py-16
            text-center
        ">
            <Icon className="mb-5 text-5xl text-slate-300" />

            <h3 className="text-xl font-semibold text-slate-800">
                {title}
            </h3>

            <p className="mt-2 max-w-sm text-slate-500">
                {message}
            </p>

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}

        </div>
    )
}
export default EmptyState;