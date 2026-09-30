import {
    FaChartPie,
    FaWallet,
    FaTags,
    FaBullseye,
    FaLightbulb,
    FaCog,
    FaMoon
} from "react-icons/fa";

const sidebarItems = [
    {
        title: "Dashboard", 
        path: "/",
        icon: FaChartPie,
    },
    {
        title: "Transactions",
        path: "/transactions",
        icon: FaWallet,
    },
    {
        title: "Categories",
        path:  "/categories",
        icon:  FaTags,
    },
    {
        title: "Budgets",
        path: "/budgets",
        icon:  FaBullseye,
    },
    {
        title: "Insights",
        path: "/insights",
        icon: FaLightbulb,
    },
    {
        title: "Settings",
        path: "/settings",
        icon: FaCog,
    },
]

export default sidebarItems;