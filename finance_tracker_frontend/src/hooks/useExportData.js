import { getTransactionCsv } from "../api/exportDataApi";
import { downloadFile } from "../utils/downloadFile";

export default function useExportData(){

    const exportDataCsv = async (fromDate, toDate) => {
        const blob = await getTransactionCsv(fromDate,toDate);

        downloadFile(blob, "transactions.csv")
    };

    return{
        exportDataCsv,

    }

}