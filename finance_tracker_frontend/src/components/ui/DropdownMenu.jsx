import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

const DropdownMenu = ({
    onEdit,
    onDelete
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOut = (e) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOut
        );
        
        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOut
            );
        };
        
    },[])

    return(
        <div
            className="relative"
            ref={menuRef}
        >
            <button
                onClick={() =>setIsOpen(prev => !prev)}
                className="
                    rounded-lg
                    p-2
                    text-slate-500
                    transition-colors
                    hover:bg-slate-100
                    hover:text-slate-700
                "
            >
                <FaEllipsisV />
            </button>

            {isOpen && (
                <div
                    className="
                        absolute
                        right-0
                        top-10
                        z-50
                        w-36
                        overflow-hidden
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        shadow-lg
                    "
                >
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onEdit?.();
                        }}
                        className="
                            w-full
                            px-4
                            py-2.5
                            text-left
                            text-sm
                            text-slate-700
                            transition-colors
                            hover:bg-slate-100
                        "
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            onDelete?.();
                        }}
                        className="
                            w-full
                            px-4
                            py-2.5
                            text-left
                            text-sm
                            text-red-600
                            transition-colors
                            hover:bg-red-50
                        "
                    >
                        Delete
                    </button>
                </div>
            )}

        </div>
    )
};
export default DropdownMenu;