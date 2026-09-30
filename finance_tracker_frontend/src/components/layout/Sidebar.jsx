import {FaWallet, FaMoon, FaChevronRight, FaChevronLeft, FaUser, FaPowerOff} from 'react-icons/fa';
import SidebarItem from './SidebarItem';
import sidebarItems from '../../data/sidebarItems';
import { useSession } from '../../context/sessionProvider';
import { useNavigate } from 'react-router-dom';
import useUserSetting from '../../hooks/useUserSetting';


const Sidebar = ({collapsed, setCollapsed}) => {

    const { logout } = useSession();
    const { user } = useUserSetting();
    const navigate = useNavigate

    const handleLogout = () => {
        logout();

        toast.success("Logged out successfully");

        navigate("/login");
    };

    if(!user){
        return null;
    }

    return (
        <aside
            className={`
                fixed left-0 top-0 h-screen bg-white border-r border-slate-200
                flex flex-col justify-between shadow-sm
                transition-all duration-300
                ${collapsed ? "w-20" : "w-56"}
            `}
        >
        {/* Top */}
        <div>

            {/* Logo */}
            <div className="flex items-center justify-between px-5 py-6">

            <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-3 rounded-xl">
                    <FaWallet className="text-white text-xl" />
                </div>

                {!collapsed && (
                    <h1 className="text-xl font-bold">
                        Finance Tracker
                    </h1>
                )}
            </div>

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="text-slate-500 hover:text-black"
            >
                {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>

        </div>

            {/* Navigation */}
            <nav className="px-4 space-y-2">
                {sidebarItems.map((item) => (
                    <SidebarItem
                        key={item.title}
                        collapsed={collapsed}
                        {...item}
                    />
                ))}
            </nav>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-300 p-5">
            {/* Dark Mode */}
            <SidebarItem
                title="Dark Mode"
                icon={FaMoon}
                collapsed={collapsed}
                onClick={() => console.log("Toggle dark mode")}
            />
            <SidebarItem
                title="Logout"
                icon={FaPowerOff}
                collapsed={collapsed}
                onClick={() => handleLogout()}
            />
            {/* User */}

            <div className="flex items-center justify-start">
                {collapsed ? (
                    <SidebarItem
                        title=""
                        icon={FaUser}
                        collapsed={collapsed}
                    />
                ) : (
                    <>
                        <img
                            src="https://i.pravatar.cc/100"
                            alt="User"
                            className="w-10 h-10 rounded-full m-1"
                        />

                        <div>
                            <p className="font-semibold">
                                {user.firstName} {user.lastName}
                            </p>

                            <p className="text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>

    </aside>
    )
}

export default Sidebar;