import { apiGet, apiPost } from "./apiClient"

export const loginRequest = (credentials) => {
    return apiPost("/auth/login", credentials);
}

export const registerRequest = (data) => {
    console.log("calling")
    return apiPost("/auth/register", data);
}
