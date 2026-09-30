import { FaPlus } from "react-icons/fa";
import Button from "../ui/Button";

const PageHeader = ({
    title,
    subtitle,
    buttonText,
    onButtonClick
}) => {
    return (
        <header className="flex items-center justify-between mb-8">

            {/* Left */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">
                    {title}
                </h1>

                <p className="text-slate-500 mt-1">
                    {subtitle}
                </p>
            </div>

            {/* Right */}
            {buttonText && (
                <Button
                onClick={onButtonClick}
                className="
                        flex
                        items-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        font-medium
                        transition
                    "
                >
                    <FaPlus />
                    {buttonText}
                </Button>
            )}
        </header>
    )
}

export default PageHeader;