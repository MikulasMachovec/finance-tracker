import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";


const widths = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
};

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = "md"
}) =>{
    // overflow control
    useEffect(()=> {
        if(!isOpen) return ;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        }

    },[isOpen])

    // ESC closes modal
    useEffect(()=> {
        if(!isOpen) return;
        
        const handleEscape = (e) => {
            if (e.key === "Escape"){
                onClose();
            }
        }

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        }

    },[isOpen])

    if(!isOpen) return null;

    return createPortal(
        // Backdrop
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/40
                backdrop-blur-sm
            "
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            {/* Modal background */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    w-full ${widths[size]}
                    rounded-2xl
                    bg-white
                    shadow-2xl
                    mx-4
                    `}
            >
                <div 
                    className="
                    flex items-center justify-between
                    border-b border-slate-200
                    px-6 py-4                    
                    "
                >
                    <h2 className="text-lg font-semibold text-slate-800">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                    >
                        <FaTimes />
                    </button>

                </div>

                <div className="p-6">
                    {children}
                </div>

                {footer && (
                    <div
                        className="
                            flex items-center justify-end gap-3
                            border-t border-slate-200
                            bg-slate-50
                            px-6 py-4
                            rounded-b-2xl
                        "
                    >
                        {footer}
                    </div>
                )}

            </div>

        </div>,
        document.getElementById("modal-root")
    )

};
export default Modal;