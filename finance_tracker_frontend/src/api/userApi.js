import { apiGet, apiPost, apiPut } from "./apiClient"

export const getCurrentUser = () => {
    return apiGet("/users/me");
}

export const updateUserProfile = (data) => {
    return apiPut("/users/updateProfile", data);
}