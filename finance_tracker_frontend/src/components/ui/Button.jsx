const variants = {
    primary:
        "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
        "border border-slate-300 text-slate-700 hover:bg-slate-100",

    danger:
        "bg-red-600 text-white hover:bg-red-700",
};


const Button = ({
    children,
    variant = "primary",
    type = "button",
    onClick,
    className = "",
    form
}) => {

    return (
        <button
            type={type}
            form={form}
            onClick={onClick}
            className={`
                rounded-xl
                px-5
                py-2.5
                text-sm
                font-medium
                transition
                ${variants[variant]}
                ${className}
            `}
        >
            {children}
        </button>
    );
};


export default Button;