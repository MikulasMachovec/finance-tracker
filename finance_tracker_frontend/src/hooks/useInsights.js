import { useEffect, useState } from "react";
import { getInsights } from "../api/insightsApi"

export default function useInsights() {
    const [ insights, setInsights ] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        loadInsights();
    },[])

    const loadInsights = async () => {
        try {
            const data = await getInsights();

            setInsights(data);
        } finally {
            setLoading(false);
        }
    }

    return {
        insights,
        loading
    }
}