import {
    apiGet,
    apiPost,
    apiPut,
    apiDelete
} from "./apiClient";


export const getCategories = () => {
    return apiGet("/categories");
};


export const createCategory = (data) => {
    return apiPost("/categories", data);
};


export const updateCategory = (id, data) => {
    return apiPut(`/categories/${id}`, data);
};


export const deleteCategory = (id) => {
    return apiDelete(`/categories/${id}`);
};