import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
} from "./apiClient";


export const getBudgets = () => {
    return apiGet("/budgets");
};


export const createBudget = (data) => {
    console.log(data)
    return apiPost("/budgets", data);
};


export const updateBudget = (id, data) => {
    return apiPut(`/budgets/${id}`, data);
};


export const deleteBudget = (id) => {
    return apiDelete(`/budgets/${id}`);
};