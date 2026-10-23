import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient"

export const getCurrentUser = () => {
    return apiGet("/users/me");
}

export const updateUserProfile = (data) => {
    return apiPut("/users/updateProfile", data);
}

export const updatePassword = (data) => {
    return apiPut("/users/updatePassword", data)
}

export const deleteAccount = () => {
    return apiDelete("/users/deleteAccount")
}

export const getUserPreferences = () => {
    return apiGet("/users/preferences")
}

export const updateUserPreferences = (preferences) => {
    return apiPut("/users/preferences", preferences)
}