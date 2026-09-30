import PageHeader from "../components/layout/PageHeader";
import InsightSummary from "../components/insights/InsightSummary";

import useInsights from "../hooks/useInsights";
import transactionData from "../data/transactionData";
import TopSpendingCategories from "../components/insights/TopSpendingCategories";
import FinancialRecommendations from "../components/insights/FinancialRecommendations";
import MonthlySpendingTrend from "../components/insights/MonhtlySpendingTrend";

const Insights = () => {

    const { insights, loading } = useInsights();  

    if (loading) {
        return <div>Loading insights...</div>;
    }

    if (!insights) {
        return <div>Failed to load insights.</div>;
    }

    return(
        <>
            <PageHeader
                title="Insights"
                subtitle="Understand your financial habits."
            />

            <div className="space-y-6">

            <InsightSummary
                summary={insights.summary}
            />

            <TopSpendingCategories
                categories={insights.topSpendingCategories}
            />

            <FinancialRecommendations
                recommendations={insights.recommendations}
            />
            <MonthlySpendingTrend 
                monthlySpending={insights.monthlySpendingTrend}/>

            </div>

        </>
    )
};
export default Insights;