import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Transaction from "../pages/Transactions";
import Categories from "../pages/Categories";
import Budgets from "../pages/Budgets";
import Insights from "../pages/Insights";
import Settings from "../pages/Settings";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "../components/layout/Layout";


const AppRoutes = () => {

    return (
        <Routes>

            {/* Public */}
            <Route 
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* Protected */}
            <Route
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/transactions"
                    element={<Transaction />}
                />

                <Route
                    path="/categories"
                    element={<Categories />}
                />

                <Route
                    path="/budgets"
                    element={<Budgets />}
                />

                <Route 
                    path="/insights"
                    element={<Insights />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;