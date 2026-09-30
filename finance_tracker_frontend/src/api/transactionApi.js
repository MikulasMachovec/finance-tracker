import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
} from "./apiClient";


export const getTransactions = () => {
    return apiGet("/transactions");
};


export const createTransaction = (data) => {
    return apiPost("/transactions", data);
};


export const updateTransaction = (id, data) => {
    return apiPut(`/transactions/${id}`, data);
};


export const deleteTransaction = (id) => {
    return apiDelete(`/transactions/${id}`);
};
