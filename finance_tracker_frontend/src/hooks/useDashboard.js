import { useCallback, useEffect, useState } from "react";
import { getTransactions } from "../api/transactionApi";
import { getCategoryBreakDown, getDashboard, getMonthlyFinance } from "../api/apiDashboard";

export default function useDashboard( refreshKey ){
	
    const [dashboard, setDashboard] = useState({
        income: 0,
        expense: 0,
        balance: 0,
        savingsPercentage: 0,
    });

    const [ monthlyFinance, setMonthlyFinance] = useState([])
    const [ categoryBreakdown, setCategoryBreakdown] = useState([])

    const [loading, setLoading] = useState(true);

    const refreshDashboard = useCallback(async () =>{
        try {
            setLoading(true)

            // get Summary card data
			const data = await getDashboard();
            setDashboard(data);
            // Get Monthly income and expense 
            const monthly = await getMonthlyFinance();
            setMonthlyFinance(monthly)
            // Category breakdown
            const breakdown = await getCategoryBreakDown();
            setCategoryBreakdown(breakdown);

        } catch (error) {
            console.error("Failed to load dashboard data:", error);
        } finally {
            setLoading(false);
        }
    },[])

    useEffect(() => {
        refreshDashboard();
		console.log("refresh " + refreshKey)
    },[ refreshDashboard, refreshKey])


    
    return {
		...dashboard,
		monthlyFinance,
        categoryBreakdown 
    };
};