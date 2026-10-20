import { apiGetBlob } from "./apiClient";

export const getTransactionCsv = (fromDate, toDate) => {    
    return apiGetBlob("/export/transaction_csv", {fromDate, toDate})
}