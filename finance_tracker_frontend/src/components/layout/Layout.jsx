import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {

    const [collapsed, setCollapsed] = useState(false);


    return (
        <>

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            <main
                className={`
                    min-h-screen 
                    bg-slate-50 
                    p-8 
                    transition-all 
                    duration-300
                    ${collapsed ? "ml-20" : "ml-56"}
                `}
            >

                <Outlet />

            </main>

        </>
    );
};

export default Layout;