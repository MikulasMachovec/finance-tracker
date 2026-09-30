import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
} from "./apiClient";


export const getDashboard = () => {
    return apiGet("/dashboard");
};

export const getMonthlyFinance = () => {
    return apiGet("/dashboard/monthly");
};

export const getCategoryBreakDown = () => {
    return apiGet("/dashboard/category-breakdown");
};