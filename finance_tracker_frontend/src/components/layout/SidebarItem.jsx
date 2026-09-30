import { NavLink } from "react-router-dom";

const SidebarItem = ({ 
    title, 
    path, 
    icon: Icon, 
    collapsed, 
    onClick 
}) => {
    const baseClass =
        `flex items-center rounded-xl transition-all duration-200
        ${collapsed ? "justify-center px-3" : "gap-3 px-4"}
        py-3`;
        
    const hoverClass =
        "text-gray-600 hover:bg-gray-100 hover:text-black";

    if (path) {
        return (
            <NavLink
                to={path}
                className={({ isActive }) =>
                    `${baseClass} ${
                    isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : hoverClass
                    }`
                }
            >
                <Icon size={20} className={collapsed ? "justify-center" : ""}/>
                {!collapsed && (
                    <span>{title}</span>
                )}
            </NavLink>
        );
    };

    return(
        <button
            onClick={onClick}
            className={`
                ${baseClass}
                ${hoverClass}
                `}
        >
            <Icon size={20} className={collapsed ? "justify-center" : ""}/>
            {!collapsed && <span>{title}</span>}
        </button>
    )
};
export default SidebarItem;