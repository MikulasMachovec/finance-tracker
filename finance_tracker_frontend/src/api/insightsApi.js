import {
    apiGet,
} from "./apiClient";

export const getInsights = () => {
    return apiGet("/insights")
}