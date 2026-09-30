import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({
    size = "text-xl"
}) => {

    return (
        <FaSpinner
            className={`
                animate-spin
                text-blue-600
                ${size}
            `}
        />
    );
};

export default LoadingSpinner;